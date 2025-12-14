import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { consultancyConfirmationTemplate, consultancyAdminNotificationTemplate } from '@/lib/email-templates';

const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'dreamdefinerstrainingacademy@gmail.com';

const VALID_PROGRAMS = [
  'Aviation',
  'Effective Communication',
  'Pre-Placement Training',
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, program } = body;
    
    if (!name || !email || !phone || !program) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate program
    if (!VALID_PROGRAMS.includes(program)) {
      return NextResponse.json(
        { error: 'Invalid program selected' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Save to database
    const consultancy = await prisma.consultancy.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        program: program.trim(),
        message: body.message ? body.message.trim() : null,
      },
    });

    // Send emails asynchronously (don't await to avoid slowing down response)
    Promise.all([
      // Send confirmation to user
      resend.emails.send({
        from: FROM_EMAIL,
        to: [email.trim().toLowerCase()],
        ...consultancyConfirmationTemplate(name.trim(), program.trim()),
      }),
      // Send notification to admin
      resend.emails.send({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        ...consultancyAdminNotificationTemplate(
          name.trim(),
          email.trim().toLowerCase(),
          phone.trim(),
          program.trim(),
          body.message ? body.message.trim() : undefined
        ),
      }),
    ]).catch((err) => console.error('Error sending consultancy emails:', err));

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully. Our team will contact you soon.',
        id: consultancy.id
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error processing consultancy form:', error);
    
    // Handle Prisma unique constraint errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A consultancy request with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

