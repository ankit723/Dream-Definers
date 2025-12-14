import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { newBlogNotificationTemplate } from '@/lib/email-templates';

const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { blogId } = body;

    if (!blogId) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    // Get blog details
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Get active subscribers
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { active: true },
    });

    if (subscribers.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No active subscribers to notify',
      });
    }

    // Send emails in batches to avoid rate limiting
    const batchSize = 50;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      const emailPromises = batch.map(subscriber =>
        resend.emails.send({
          from: FROM_EMAIL,
          to: [subscriber.email],
          ...newBlogNotificationTemplate(
            subscriber.name || 'Subscriber',
            blog.title,
            blog.excerpt,
            blog.slug,
            blog.coverImage || undefined
          ),
        }).catch(err => {
          console.error(`Failed to send email to ${subscriber.email}:`, err);
          return null;
        })
      );

      await Promise.all(emailPromises);
    }

    return NextResponse.json({
      success: true,
      message: `Notification sent to ${subscribers.length} subscribers`,
    });
  } catch (error) {
    console.error('Error sending blog notifications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

