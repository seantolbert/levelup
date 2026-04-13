import nodemailer from 'nodemailer'

function getTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) return null
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function sendQuoteEmail(data: Record<string, unknown>) {
  const transporter = getTransporter()
  if (!transporter) {
    console.log('[Mailer] SMTP not configured — quote logged to console:', data)
    return
  }
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Quote Request — LuminaFilm',
    html: `
      <h2>New Quote Request</h2>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `,
  })
}

export async function sendContactEmail(data: Record<string, unknown>) {
  const transporter = getTransporter()
  if (!transporter) {
    console.log('[Mailer] SMTP not configured — contact logged to console:', data)
    return
  }
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Contact Form Message — LuminaFilm',
    html: `
      <h2>New Contact Message</h2>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `,
  })
}
