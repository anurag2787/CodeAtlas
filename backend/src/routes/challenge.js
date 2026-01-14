import { Router } from 'express'
import { callGemini } from '../lib/gemini.js'

const router = Router()

router.post('/', async (req, res) => {
  const {
    moduleTitle,
    moduleDescription,
    objectives,
    files,
    repoName
  } = req.body

  if (!moduleTitle) {
    return res.status(400).json({
      error: 'moduleTitle required'
    })
  }

  const prompt = `
Generate 4 quiz questions for a learning module.

Module: ${moduleTitle}
Description: ${moduleDescription || 'N/A'}
Repository: ${repoName || 'Unknown'}

Objectives:
${objectives?.map(o => `- ${o}`).join('\n') || '- Understand the module'}

Files:
${files?.map(f => `- ${f}`).join('\n') || '- Various files'}

Rules:
- 2 multiple-choice (4 options each)
- 1 true/false
- 1 conceptual question
- No code blocks
- Focus on understanding, not memorization

Return strict JSON in this format:
{
  "challenges": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A",
      "explanation": "...",
      "points": 25
    }
  ]
}
`

  try {
    const response = await callGemini(prompt)
    const jsonMatch =
      response.match(/```json([\s\S]*?)```/) ||
      response.match(/\{[\s\S]*\}/)

    if (!jsonMatch) {
      throw new Error('Invalid quiz JSON from Gemini')
    }

    const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0])
    res.json(parsed)
  } catch (err) {
    res.status(500).json({
      challenges: [],
      error: err.message
    })
  }
})

export default router
