import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, validateEmail, getUserByEmail } from '@/lib/auth';

// GET - Get single admin
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    
    const admin = await prisma.user.findUnique({
      where: { id: resolvedParams.id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        _count: {
          select: {
            blogs: true,
          },
        },
      },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error('Error fetching admin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update an admin
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const body = await request.json();
    const { name, email, password, userId } = body;

    // Verify that the requester is an authenticated admin
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized. User ID is required.' },
        { status: 401 }
      );
    }

    const adminUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!adminUser) {
      return NextResponse.json(
        { error: 'Unauthorized. Only existing admins can update admins.' },
        { status: 403 }
      );
    }

    // Check if admin exists
    const admin = await prisma.user.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      );
    }

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // If email is being changed, check if new email already exists
    if (email.toLowerCase() !== admin.email.toLowerCase()) {
      const existingUser = await getUserByEmail(email);
      
      if (existingUser && existingUser.id !== resolvedParams.id) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        );
      }
    }

    // Validate password if provided
    if (password) {
      if (password.length < 8) {
        return NextResponse.json(
          { error: 'Password must be at least 8 characters long' },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
    };

    // Hash password if provided
    if (password) {
      updateData.password = await hashPassword(password);
    }

    // Update admin
    const updatedAdmin = await prisma.user.update({
      where: { id: resolvedParams.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Admin updated successfully',
      admin: updatedAdmin,
    });
  } catch (error: any) {
    console.error('Error updating admin:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete an admin
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const adminId = resolvedParams.id;

    // Check if admin exists
    const admin = await prisma.user.findUnique({
      where: { id: adminId },
      include: {
        _count: {
          select: {
            blogs: true,
          },
        },
      },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      );
    }

    // Check if admin has blogs
    if (admin._count.blogs > 0) {
      return NextResponse.json(
        { 
          error: `Cannot delete admin. This admin has created ${admin._count.blogs} blog(s). Please reassign or delete the blogs first.` 
        },
        { status: 400 }
      );
    }

    // Delete admin
    await prisma.user.delete({
      where: { id: adminId },
    });

    return NextResponse.json({
      success: true,
      message: 'Admin deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting admin:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
