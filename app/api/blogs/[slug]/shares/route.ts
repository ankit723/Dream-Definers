import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Get shares count
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);

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

    // Get total shares
    const totalShares = await prisma.blogShare.count({
      where: { blogId: blog.id },
    });

    return NextResponse.json({ totalShares });
  } catch (error) {
    console.error('Error fetching shares:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Record a share
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const { email, platform } = await request.json();

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

    await prisma.blogShare.create({
      data: {
        blogId: blog.id,
        email: email ? email.toLowerCase() : null,
        platform: platform || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error recording share:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

