import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const RECIPIENTS = [
  'infonefuen@grupohijuelas.com',
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, company, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' })
  }

  try {
    await resend.emails.send({
      from: 'Nefuen Trading Web <onboarding@resend.dev>',
      to: RECIPIENTS,
      replyTo: email,
      subject: `New contact from ${name}${company ? ` — ${company}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d3a2d; border-bottom: 2px solid #d4812a; padding-bottom: 12px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666; width: 100px;">Name</td>
              <td style="padding: 8px 12px; color: #333;">${escapeHtml(name)}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Email</td>
              <td style="padding: 8px 12px; color: #333;">
                <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
              </td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Company</td>
              <td style="padding: 8px 12px; color: #333;">${escapeHtml(company)}</td>
            </tr>` : ''}
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #666; vertical-align: top;">Message</td>
              <td style="padding: 8px 12px; color: #333; white-space: pre-wrap;">${escapeHtml(message)}</td>
            </tr>
          </table>
          <p style="color: #999; font-size: 12px; margin-top: 24px;">
            Sent from nefuentrading.cl contact form
          </p>
        </div>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
