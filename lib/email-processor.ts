import { resend } from './resend';
import { getPendingEmails, updateEmailQueueStatus } from './email-queue';
import {
  contactConfirmationTemplate,
  contactAdminNotificationTemplate,
  consultancyConfirmationTemplate,
  consultancyAdminNotificationTemplate,
  newBlogNotificationTemplate,
} from './email-templates';

const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'dreamdefinerstrainingacademy@gmail.com';

/**
 * Process email queue - send pending emails
 */
export async function processEmailQueue() {
  try {
    const pendingEmails = await getPendingEmails(20); // Process 20 at a time

    if (pendingEmails.length === 0) {
      return { processed: 0, success: 0, failed: 0 };
    }

    let success = 0;
    let failed = 0;

    for (const email of pendingEmails) {
      try {
        // Mark as processing
        await updateEmailQueueStatus(email.id, 'processing');

        // Parse metadata if exists
        const metadata = email.metadata ? JSON.parse(email.metadata) : {};

        // Send email based on type
        let emailData: any = {
          from: FROM_EMAIL,
          to: [email.recipient],
          subject: email.subject,
        };

        // For different email types, we might need to use templates
        // For now, we'll use the body directly
        if (email.type === 'contact') {
          // Contact confirmation email
          emailData = {
            ...emailData,
            ...contactConfirmationTemplate(metadata.name || 'User', metadata.subject || ''),
          };
        } else if (email.type === 'consultancy') {
          // Consultancy confirmation email
          emailData = {
            ...emailData,
            ...consultancyConfirmationTemplate(metadata.name || 'User', metadata.program || ''),
          };
        } else if (email.type === 'blog_notification') {
          // Blog notification email
          emailData = {
            ...emailData,
            ...newBlogNotificationTemplate(
              metadata.subscriberName || 'Subscriber',
              metadata.blogTitle || '',
              metadata.blogExcerpt || '',
              metadata.blogSlug || '',
              metadata.blogCoverImage || undefined
            ),
          };
        } else {
          // Generic email with body
          emailData.html = email.body;
        }

        // Send email
        await resend.emails.send(emailData);

        // Mark as sent
        await updateEmailQueueStatus(email.id, 'sent');
        success++;
      } catch (error: any) {
        console.error(`Error sending email ${email.id}:`, error);
        await updateEmailQueueStatus(
          email.id,
          'failed',
          error.message || 'Unknown error'
        );
        failed++;
      }
    }

    return { processed: pendingEmails.length, success, failed };
  } catch (error) {
    console.error('Error processing email queue:', error);
    return { processed: 0, success: 0, failed: 0 };
  }
}

/**
 * Send admin notification emails (these are separate from user emails)
 */
export async function sendAdminNotification(
  type: 'contact' | 'consultancy',
  data: any
) {
  try {
    if (type === 'contact') {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        ...contactAdminNotificationTemplate(
          data.name,
          data.email,
          data.phone,
          data.subject,
          data.message
        ),
      });
    } else if (type === 'consultancy') {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        ...consultancyAdminNotificationTemplate(
          data.name,
          data.email,
          data.phone,
          data.program,
          data.message
        ),
      });
    }
  } catch (error) {
    console.error('Error sending admin notification (non-critical):', error);
    // Don't throw - admin notifications are not critical
  }
}

