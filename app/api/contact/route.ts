import { NextRequest } from 'next/server'
import { sendContactEmail } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, serviceType, message } = body

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await sendContactEmail({ name, email, phone, serviceType, message })

    return Response.json({ success: true })
  } catch (err) {
    console.error('[/api/contact]', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
