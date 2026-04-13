import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeFile } from 'fs/promises'
import path from 'path'

const USE_BLOB = Boolean(process.env.BLOB_READ_WRITE_TOKEN)

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 })
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const filename = `${Date.now()}-${safeName}`

    if (USE_BLOB) {
      const { put } = await import('@vercel/blob')
      const blob = await put(filename, file, { access: 'public' })
      return Response.json({ url: blob.url, filename })
    }

    // Local dev fallback: write to public/uploads/
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', filename)
    await writeFile(uploadPath, buffer)
    return Response.json({ url: `/uploads/${filename}`, filename })
  } catch (err) {
    console.error('[/api/admin/upload]', err)
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}
