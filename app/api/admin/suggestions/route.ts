import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getContent } from '@/lib/content'
import Anthropic from '@anthropic-ai/sdk'

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 })
  }

  try {
    const content = await getContent()
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const prompt = `You are a conversion optimization and SEO expert for a premium window film business. Analyze the following site content JSON and return exactly 5 specific, actionable suggestions to improve conversions, SEO, or content clarity.

Site content:
${JSON.stringify(content, null, 2)}

Return a JSON array with exactly 5 objects, each with these fields:
- "id": number 1-5
- "title": short title (max 8 words)
- "suggestion": specific actionable recommendation (2-3 sentences)
- "severity": exactly one of "Quick Win", "High Impact", or "Optional Polish"

Return only the JSON array, no other text.`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''

    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) throw new Error('No JSON array in response')
    const suggestions = JSON.parse(jsonMatch[0])

    return Response.json({ suggestions })
  } catch (err) {
    console.error('[/api/admin/suggestions]', err)
    return Response.json({ error: 'Failed to generate suggestions' }, { status: 500 })
  }
}
