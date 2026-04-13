import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeContent, getContent, type SiteContent } from '@/lib/content'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  return Response.json(await getContent())
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const existing = await getContent()
    const updated: SiteContent = { ...existing, ...body }
    await writeContent(updated)
    return Response.json({ success: true })
  } catch (err) {
    console.error('[/api/admin/content]', err)
    return Response.json({ error: 'Failed to save content' }, { status: 500 })
  }
}
