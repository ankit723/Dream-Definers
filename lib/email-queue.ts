import { prisma } from './prisma';

export type EmailType = 'contact' | 'consultancy' | 'blog_notification';

export interface EmailQueueData {
  type: EmailType;
  recipient: string;
  subject: string;
  body: string;
  metadata?: Record<string, any>;
}

/**
 * Add email to queue
 */
export async function queueEmail(data: EmailQueueData) {
  try {
    const emailQueue = await prisma.emailQueue.create({
      data: {
        type: data.type,
        recipient: data.recipient,
        subject: data.subject,
        body: data.body,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
        status: 'pending',
        nextRetryAt: new Date(), // Try immediately
      },
    });
    return emailQueue;
  } catch (error) {
    console.error('Error queueing email:', error);
    throw error;
  }
}

/**
 * Get pending emails that are ready to be sent
 */
export async function getPendingEmails(limit: number = 10) {
  const now = new Date();
  return prisma.emailQueue.findMany({
    where: {
      status: {
        in: ['pending', 'failed'],
      },
      OR: [
        { nextRetryAt: null },
        { nextRetryAt: { lte: now } },
      ],
      retryCount: {
        lt: prisma.emailQueue.fields.maxRetries,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
    take: limit,
  });
}

/**
 * Update email queue status
 */
export async function updateEmailQueueStatus(
  id: string,
  status: 'processing' | 'sent' | 'failed',
  errorMessage?: string
) {
  const updateData: any = {
    status,
    lastAttempt: new Date(),
  };

  if (status === 'sent') {
    updateData.sentAt = new Date();
    updateData.nextRetryAt = null;
  } else if (status === 'failed') {
    updateData.errorMessage = errorMessage || null;
    // Calculate next retry time with exponential backoff
    const email = await prisma.emailQueue.findUnique({ where: { id } });
    if (email) {
      const retryCount = email.retryCount + 1;
      const delayMinutes = Math.min(5 * Math.pow(2, retryCount - 1), 360); // 5min, 10min, 20min, 40min, 80min, max 6hr
      updateData.nextRetryAt = new Date(Date.now() + delayMinutes * 60 * 1000);
      updateData.retryCount = retryCount;
    }
  }

  return prisma.emailQueue.update({
    where: { id },
    data: updateData,
  });
}

/**
 * Get email queue stats
 */
export async function getEmailQueueStats() {
  const [pending, processing, sent, failed, total] = await Promise.all([
    prisma.emailQueue.count({ where: { status: 'pending' } }),
    prisma.emailQueue.count({ where: { status: 'processing' } }),
    prisma.emailQueue.count({ where: { status: 'sent' } }),
    prisma.emailQueue.count({ where: { status: 'failed', retryCount: { gte: 5 } } }),
    prisma.emailQueue.count(),
  ]);

  return { pending, processing, sent, failed, total };
}

