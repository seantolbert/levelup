import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getQuotes, updateQuote } from '@/lib/content'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  return Response.json(await getQuotes())
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id, contacted } = await req.json()
    await updateQuote(id, { contacted })
    return Response.json({ success: true })
  } catch (err) {
    console.error('[/api/admin/quotes]', err)
    return Response.json({ error: 'Failed to update quote' }, { status: 500 })
  }
}
