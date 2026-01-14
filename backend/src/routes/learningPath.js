import { Router } from 'express'
import { callGemini } from '../lib/gemini.js'

const router = Router()

router.post('/', async (req, res) => {
  const { repoName, repoDescription, fileStructure, languages } = req.body

  if (!repoName || !fileStructure) {
    return res.status(400).json({
      error: 'repoName and fileStructure required'
    })
  }

  const prompt = `
You are an expert programming mentor.

Repository: ${repoName}
${repoDescription ? `Description: ${repoDescription}` : ''}
${languages?.length ? `Languages: ${languages.join(', ')}` : ''}

File Structure:
${fileStructure.slice(0, 10000)}

Create a learning path with:
- Overview
- Prerequisites
- 4–6 learning modules (title, description, files, objectives, time)
- 2–3 practice project ideas

Return valid JSON only.
`

  try {
    const response = await callGemini(prompt, 'gemini-1.5-flash')

    // Attempt JSON extraction
    const jsonMatch =
      response.match(/```json([\s\S]*?)```/) ||
      response.match(/\{[\s\S]*\}/)

    if (!jsonMatch) {
      return res.json({ learningPath: response })
    }

    const learningPath = JSON.parse(jsonMatch[1] || jsonMatch[0])
    res.json({ learningPath })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
