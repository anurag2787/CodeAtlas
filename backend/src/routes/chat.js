import { Router } from 'express'
import { callGemini } from '../lib/gemini.js'

const router = Router()

router.post('/', async (req, res) => {
  const { message, context, history } = req.body

  if (!message) {
    return res.status(400).json({ error: 'message required' })
  }

  let prompt = `
You are CodeAtlas, an AI assistant that helps developers understand GitHub repositories.
Be clear, concise, and educational.

${context ? `Context:\n${context}\n\n` : ''}
`

  if (history?.length) {
    prompt += 'Conversation history:\n'
    history.slice(-10).forEach(h => {
      prompt += `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}\n`
    })
    prompt += '\n'
  }

  prompt += `User: ${message}\nRespond helpfully.`

  try {
    const response = await callGemini(prompt)
    res.json({ response })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
