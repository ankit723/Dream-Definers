// Email templates for Dream Definers

export const contactConfirmationTemplate = (name: string, subject: string) => ({
  subject: 'Thank you for contacting Dream Definers',
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting Us</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #1e3a8a; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #ffffff; margin: 0;">Dream Definers</h1>
          <p style="color: #e0e7ff; margin: 10px 0 0 0;">Training Academy</p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1e3a8a; margin-top: 0;">Thank You for Contacting Us!</h2>
          
          <p>Dear ${name},</p>
          
          <p>We have received your inquiry regarding: <strong>${subject}</strong></p>
          
          <p>Our team will review your message and get back to you within 24-48 hours.</p>
          
          <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1e3a8a;"><strong>What happens next?</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Our team will review your inquiry</li>
              <li>We'll reach out to discuss your training needs</li>
              <li>We'll provide you with detailed information about our programs</li>
            </ul>
          </div>
          
          <p>If you have any urgent questions, feel free to contact us at:</p>
          <p>
            📧 Email: dreamdefinerstrainingacademy@gmail.com<br>
            📱 Phone: +91 81445 53579 | +91 99370 03373
          </p>
          
          <p>Thank you for choosing Dream Definers!</p>
          
          <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>Dream Definers Team</strong><br>
            Transforming Learners Into Leaders
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
          <p>15, Soubhagya Nagar, Baramunda, Bhubaneswar, Odisha - 751003, India</p>
          <p>&copy; ${new Date().getFullYear()} Dream Definers Training Academy. All rights reserved.</p>
        </div>
      </body>
    </html>
  `,
});

export const contactAdminNotificationTemplate = (
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string
) => ({
  subject: `New Contact Form Submission: ${subject}`,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1e3a8a;">New Contact Form Submission</h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #1e3a8a; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <p style="color: #6b7280; font-size: 12px;">
          Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        </p>
      </body>
    </html>
  `,
});

export const consultancyConfirmationTemplate = (name: string, program: string) => ({
  subject: 'Your Free Consultancy Request - Dream Definers',
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Free Consultancy Request Received</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #1e3a8a; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #ffffff; margin: 0;">Dream Definers</h1>
          <p style="color: #e0e7ff; margin: 10px 0 0 0;">Training Academy</p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1e3a8a; margin-top: 0;">Thank You for Your Interest!</h2>
          
          <p>Dear ${name},</p>
          
          <p>We have received your request for a free consultation regarding our <strong>${program}</strong> program.</p>
          
          <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1e3a8a;"><strong>Next Steps:</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Our expert team will review your request</li>
              <li>We'll contact you within 24 hours</li>
              <li>You'll receive personalized guidance about the program</li>
              <li>We'll answer all your questions about training and career opportunities</li>
            </ul>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;"><strong>🎓 Why Choose Dream Definers?</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px; color: #92400e;">
              <li>20+ years of training experience</li>
              <li>Expert CBSE-certified trainers</li>
              <li>Personalized skill development</li>
              <li>Industry-relevant training programs</li>
            </ul>
          </div>
          
          <p>For immediate assistance, feel free to reach out:</p>
          <p>
            📧 Email: dreamdefinerstrainingacademy@gmail.com<br>
            📱 Phone: +91 81445 53579 | +91 99370 03373
          </p>
          
          <p>We look forward to helping you transform your career!</p>
          
          <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>Dream Definers Team</strong><br>
            Transforming Learners Into Leaders
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
          <p>15, Soubhagya Nagar, Baramunda, Bhubaneswar, Odisha - 751003, India</p>
          <p>&copy; ${new Date().getFullYear()} Dream Definers Training Academy. All rights reserved.</p>
        </div>
      </body>
    </html>
  `,
});

export const consultancyAdminNotificationTemplate = (
  name: string,
  email: string,
  phone: string,
  program: string,
  message?: string
) => ({
  subject: `New Consultancy Request: ${program}`,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Consultancy Request</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1e3a8a;">New Consultancy Request</h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Program:</strong> <span style="color: #1e3a8a; font-weight: bold;">${program}</span></p>
          ${message ? `
            <p><strong>Additional Message:</strong></p>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #1e3a8a; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          ` : ''}
        </div>
        
        <p style="color: #6b7280; font-size: 12px;">
          Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        </p>
      </body>
    </html>
  `,
});

export const newBlogNotificationTemplate = (
  subscriberName: string,
  blogTitle: string,
  blogExcerpt: string,
  blogSlug: string,
  coverImage?: string
) => {
  const blogUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dreamdefiners.com'}/blogs/${blogSlug}`;
  
  return {
    subject: `New Blog Post: ${blogTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Blog Post</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1e3a8a; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #ffffff; margin: 0;">Dream Definers</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0;">Training Academy</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1e3a8a; margin-top: 0;">📝 New Blog Post Published!</h2>
            
            <p>Hi ${subscriberName},</p>
            
            <p>We just published a new blog post that you might find interesting:</p>
            
            ${coverImage ? `
              <div style="margin: 20px 0;">
                <img src="${coverImage}" alt="${blogTitle}" style="max-width: 100%; height: auto; border-radius: 8px;">
              </div>
            ` : ''}
            
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 2px solid #dbeafe; margin: 20px 0;">
              <h3 style="color: #1e3a8a; margin-top: 0;">${blogTitle}</h3>
              <p style="color: #4b5563; line-height: 1.8;">${blogExcerpt}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${blogUrl}" style="display: inline-block; background-color: #1e3a8a; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold;">
                Read Full Article →
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              Don't want to receive these emails? <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${subscriberName}" style="color: #1e3a8a;">Unsubscribe here</a>
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
            <p>15, Soubhagya Nagar, Baramunda, Bhubaneswar, Odisha - 751003, India</p>
            <p>&copy; ${new Date().getFullYear()} Dream Definers Training Academy. All rights reserved.</p>
          </div>
        </body>
      </html>
    `,
  };
};

export const passwordResetTemplate = (name: string, resetLink: string) => ({
  subject: 'Password Reset Request - Dream Definers Admin',
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #1e3a8a; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #ffffff; margin: 0;">Dream Definers</h1>
          <p style="color: #e0e7ff; margin: 10px 0 0 0;">Admin Portal</p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1e3a8a; margin-top: 0;">🔒 Password Reset Request</h2>
          
          <p>Hi ${name},</p>
          
          <p>We received a request to reset your admin password. Click the button below to create a new password:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="display: inline-block; background-color: #1e3a8a; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold;">
              Reset Password
            </a>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>⚠️ Security Notice:</strong><br>
              This link will expire in 1 hour. If you didn't request this reset, please ignore this email or contact support.
            </p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetLink}" style="color: #1e3a8a; word-break: break-all;">${resetLink}</a>
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
          <p>&copy; ${new Date().getFullYear()} Dream Definers Training Academy. All rights reserved.</p>
        </div>
      </body>
    </html>
  `,
});

