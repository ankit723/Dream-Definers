import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Toggle comment like
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; commentId: string }> | { slug: string; commentId: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Verify comment exists and belongs to the blog
    const comment = await prisma.blogComment.findFirst({
      where: {
        id: resolvedParams.commentId,
        blog: {
          slug: resolvedParams.slug,
        },
      },
    });

    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    // Check if already liked
    const existingLike = await prisma.commentLike.findUnique({
      where: {
        commentId_email: {
          commentId: resolvedParams.commentId,
          email: normalizedEmail,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.commentLike.delete({
        where: { id: existingLike.id },
      });
      return NextResponse.json({ liked: false });
    } else {
      // Like
      await prisma.commentLike.create({
        data: {
          commentId: resolvedParams.commentId,
          email: normalizedEmail,
        },
      });
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Error toggling comment like:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

