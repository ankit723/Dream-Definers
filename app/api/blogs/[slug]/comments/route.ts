import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Get comments for a blog
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    // Find blog by slug
    const blog = await prisma.blog.findUnique({
      where: { slug: resolvedParams.slug },
      select: { id: true },
    });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Get all top-level comments (no parent)
    const comments = await prisma.blogComment.findMany({
      where: {
        blogId: blog.id,
        parentId: null,
      },
      include: {
        replies: {
          include: {
            replies: {
              include: {
                replies: true, // Support 3 levels of nesting
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
        _count: {
          select: { likes: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Check which comments user liked (if email provided)
    const userLikedComments: string[] = [];
    if (email) {
      const likedComments = await prisma.commentLike.findMany({
        where: {
          commentId: { in: comments.flatMap(c => [c.id, ...c.replies.flatMap(r => [r.id, ...r.replies.map(rr => rr.id)])]) },
          email: email.toLowerCase(),
        },
        select: { commentId: true },
      });
      userLikedComments.push(...likedComments.map(l => l.commentId));
    }

    // Helper function to recursively add like info
    const addLikeInfo = (comment: any): any => {
      return {
        ...comment,
        likesCount: comment._count.likes,
        userLiked: userLikedComments.includes(comment.id),
        replies: comment.replies.map(addLikeInfo),
      };
    };

    const commentsWithLikes = comments.map(addLikeInfo);

    return NextResponse.json({ comments: commentsWithLikes });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a comment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const { email, name, content, parentId } = await request.json();

    if (!email || !content) {
      return NextResponse.json(
        { error: 'Email and content are required' },
        { status: 400 }
      );
    }

    // Find blog by slug
    const blog = await prisma.blog.findUnique({
      where: { slug: resolvedParams.slug },
      select: { id: true },
    });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // If parentId is provided, verify it exists and belongs to this blog
    if (parentId) {
      const parent = await prisma.blogComment.findFirst({
        where: {
          id: parentId,
          blogId: blog.id,
        },
      });

      if (!parent) {
        return NextResponse.json(
          { error: 'Parent comment not found' },
          { status: 404 }
        );
      }
    }

    const comment = await prisma.blogComment.create({
      data: {
        blogId: blog.id,
        email: email.toLowerCase(),
        name: name || null,
        content,
        parentId: parentId || null,
      },
      include: {
        _count: {
          select: { likes: true },
        },
      },
    });

    return NextResponse.json({
      ...comment,
      likesCount: comment._count.likes,
      userLiked: false,
      replies: [],
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

