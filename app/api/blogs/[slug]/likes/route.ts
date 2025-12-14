import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Get likes count and check if user liked
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

    // Get total likes
    const totalLikes = await prisma.blogLike.count({
      where: { blogId: blog.id },
    });

    // Check if user liked (if email provided)
    let userLiked = false;
    if (email) {
      const like = await prisma.blogLike.findUnique({
        where: {
          blogId_email: {
            blogId: blog.id,
            email: email.toLowerCase(),
          },
        },
      });
      userLiked = !!like;
    }

    return NextResponse.json({
      totalLikes,
      userLiked,
    });
  } catch (error) {
    console.error('Error fetching likes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Toggle like
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
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

    const normalizedEmail = email.toLowerCase();

    // Check if already liked
    const existingLike = await prisma.blogLike.findUnique({
      where: {
        blogId_email: {
          blogId: blog.id,
          email: normalizedEmail,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.blogLike.delete({
        where: { id: existingLike.id },
      });
      return NextResponse.json({ liked: false });
    } else {
      // Like
      await prisma.blogLike.create({
        data: {
          blogId: blog.id,
          email: normalizedEmail,
        },
      });
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

