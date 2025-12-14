import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { contactConfirmationTemplate, contactAdminNotificationTemplate } from '@/lib/email-templates';

const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'dreamdefinerstrainingacademy@gmail.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, subject, message } = body;
    
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim(),
      },
    });

    // Send emails asynchronously (don't await to avoid slowing down response)
    Promise.all([
      // Send confirmation to user
      resend.emails.send({
        from: FROM_EMAIL,
        to: [email.trim().toLowerCase()],
        ...contactConfirmationTemplate(name.trim(), subject.trim()),
      }),
      // Send notification to admin
      resend.emails.send({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        ...contactAdminNotificationTemplate(
          name.trim(),
          email.trim().toLowerCase(),
          phone.trim(),
          subject.trim(),
          message.trim()
        ),
      }),
    ]).catch((err) => console.error('Error sending contact emails:', err));

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully. We\'ll get back to you soon.',
        id: contact.id
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error processing contact form:', error);
    
    // Handle Prisma unique constraint errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A contact with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

