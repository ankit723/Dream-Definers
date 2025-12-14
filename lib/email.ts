import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "dreamdefinerstrainingacademy@gmail.com";

// Contact form emails
export async function sendContactConfirmation(data: {
  name: string;
  email: string;
  subject: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: "Thank you for contacting Dream Definers",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Thank You for Reaching Out!</h2>
          <p>Dear ${data.name},</p>
          <p>We have received your message regarding "${data.subject}" and we appreciate you taking the time to contact us.</p>
          <p>Our team will review your inquiry and get back to you as soon as possible, typically within 24-48 hours.</p>
          <p>If you have any urgent questions, feel free to call us at:</p>
          <p><strong>+91 81445 53579 | +91 99370 03373</strong></p>
          <br/>
          <p>Best regards,</p>
          <p><strong>Dream Definers Training Academy</strong></p>
          <p style="color: #666; font-size: 12px;">15, Soubhagya Nagar, Baramunda, Bhubaneswar, Odisha - 751003</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending contact confirmation email:", error);
  }
}

export async function sendContactNotificationToAdmin(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold;">Name:</td>
              <td style="padding: 10px;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold;">Email:</td>
              <td style="padding: 10px;">${data.email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold;">Phone:</td>
              <td style="padding: 10px;">${data.phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold;">Subject:</td>
              <td style="padding: 10px;">${data.subject}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 10px;">${data.message}</td>
            </tr>
          </table>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending contact notification to admin:", error);
  }
}

// Consultancy form emails
export async function sendConsultancyConfirmation(data: {
  name: string;
  email: string;
  program: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: "Free Consultancy Request Received - Dream Definers",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Thank You for Your Interest!</h2>
          <p>Dear ${data.name},</p>
          <p>We have received your free consultancy request for the <strong>${data.program}</strong> program.</p>
          <p>Our team will review your request and contact you soon to schedule your free consultation session.</p>
          <p>What to expect:</p>
          <ul>
            <li>Personalized consultation with our expert trainers</li>
            <li>Detailed program information</li>
            <li>Career guidance and counseling</li>
            <li>Flexible training schedules</li>
          </ul>
          <p>If you have any immediate questions, feel free to reach out:</p>
          <p><strong>+91 81445 53579 | +91 99370 03373</strong></p>
          <br/>
          <p>Best regards,</p>
          <p><strong>Dream Definers Training Academy</strong></p>
          <p style="color: #666; font-size: 12px;">15, Soubhagya Nagar, Baramunda, Bhubaneswar, Odisha - 751003</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending consultancy confirmation email:", error);
  }
}

export async function sendConsultancyNotificationToAdmin(data: {
  name: string;
  email: string;
  phone: string;
  program: string;
  message?: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Consultancy Request: ${data.program}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New Free Consultancy Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold;">Name:</td>
              <td style="padding: 10px;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold;">Email:</td>
              <td style="padding: 10px;">${data.email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold;">Phone:</td>
              <td style="padding: 10px;">${data.phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; font-weight: bold;">Program:</td>
              <td style="padding: 10px;">${data.program}</td>
            </tr>
            ${data.message ? `
              <tr>
                <td style="padding: 10px; font-weight: bold; vertical-align: top;">Message:</td>
                <td style="padding: 10px;">${data.message}</td>
              </tr>
            ` : ''}
          </table>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending consultancy notification to admin:", error);
  }
}

// Blog notification emails
export async function sendNewBlogNotification(
  subscribers: { email: string; name?: string }[],
  blog: {
    title: string;
    excerpt: string;
    slug: string;
  }
) {
  const blogUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blogs/${blog.slug}`;

  try {
    // Send to all active subscribers
    await Promise.all(
      subscribers.map((subscriber) =>
        resend.emails.send({
          from: FROM_EMAIL,
          to: subscriber.email,
          subject: `New Blog Post: ${blog.title}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1e40af;">New Blog Post from Dream Definers</h2>
              ${subscriber.name ? `<p>Hi ${subscriber.name},</p>` : '<p>Hi there,</p>'}
              <p>We've just published a new blog post that you might find interesting:</p>
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0;">${blog.title}</h3>
                <p style="color: #666;">${blog.excerpt}</p>
              </div>
              <a href="${blogUrl}" style="display: inline-block; background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0;">Read Full Article</a>
              <br/><br/>
              <p style="color: #666; font-size: 12px;">You're receiving this email because you subscribed to updates from Dream Definers Training Academy.</p>
            </div>
          `,
        })
      )
    );
  } catch (error) {
    console.error("Error sending blog notification emails:", error);
  }
}

// Password reset email
export async function sendPasswordResetEmail(data: {
  email: string;
  name: string;
  resetToken: string;
}) {
  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/reset-password?token=${data.resetToken}`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: "Password Reset Request - Dream Definers Admin",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Password Reset Request</h2>
          <p>Hi ${data.name},</p>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <a href="${resetUrl}" style="display: inline-block; background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>Dream Definers Admin Team</strong></p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
}

