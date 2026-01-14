import { Router } from 'express'
import { callGemini } from '../lib/gemini.js'

const router = Router()

router.post('/', async (req, res) => {
  const { fileName, filePath, fileContent, repoContext, eli5 } = req.body

  if (!fileName || !fileContent) {
    return res.status(400).json({
      error: 'fileName and fileContent required'
    })
  }

  const eli5Instructions = eli5
    ? 'Explain like I am 5 using simple analogies.'
    : 'Keep explanations beginner-friendly but accurate.'

  const prompt = `
You are an expert code educator.

File: ${fileName}
Path: ${filePath}
${repoContext ? `Repository Context: ${repoContext}` : ''}

Code:
${fileContent.slice(0, 15000)}

Explain:
1. Purpose
2. Key concepts
3. How it works
4. Dependencies
5. Learning points

${eli5Instructions}
`

  try {
    const explanation = await callGemini(prompt)
    res.json({ explanation })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
