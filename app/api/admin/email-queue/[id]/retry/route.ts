import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { processEmailQueue } from '@/lib/email-processor';

// POST - Manually retry a specific email
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    
    // Get the email
    const email = await prisma.emailQueue.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!email) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      );
    }

    // Reset status to pending and retry immediately
    await prisma.emailQueue.update({
      where: { id: resolvedParams.id },
      data: {
        status: 'pending',
        nextRetryAt: new Date(),
        errorMessage: null,
      },
    });

    // Process the queue (this will pick up the email)
    await processEmailQueue();

    return NextResponse.json({
      success: true,
      message: 'Email queued for retry',
    });
  } catch (error) {
    console.error('Error retrying email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

