import { NextRequest } from 'next/server'
import { saveQuote, type QuoteSubmission } from '@/lib/content'
import { sendQuoteEmail } from '@/lib/mailer'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { serviceType, details, contact } = body

    if (!serviceType || !contact?.name || !contact?.email) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const quote: QuoteSubmission = {
      id: crypto.randomUUID(),
      serviceType,
      details: details || {},
      contact,
      submittedAt: new Date().toISOString(),
      contacted: false,
    }

    await saveQuote(quote)
    await sendQuoteEmail({ ...quote })

    return Response.json({ success: true, id: quote.id })
  } catch (err) {
    console.error('[/api/quote]', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
