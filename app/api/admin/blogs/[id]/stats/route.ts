import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Get blog stats
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);

    const blog = await prisma.blog.findUnique({
      where: { id: resolvedParams.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
        _count: {
          select: {
            likes: true,
            comments: true,
            shares: true,
          },
        },
      },
    });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Get top-level comments count
    const topLevelComments = await prisma.blogComment.count({
      where: {
        blogId: blog.id,
        parentId: null,
      },
    });

    // Get total comments (including replies)
    const totalComments = blog._count.comments;

    return NextResponse.json({
      blog: {
        ...blog,
        content: blog.content,
      },
      stats: {
        views: blog.views,
        likes: blog._count.likes,
        comments: totalComments,
        topLevelComments,
        shares: blog._count.shares,
      },
    });
  } catch (error) {
    console.error('Error fetching blog stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

