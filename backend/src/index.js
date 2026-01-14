import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import explainRoute from './routes/explain.js'
import learningPathRoute from './routes/learningPath.js'
import challengeRoute from './routes/challenge.js'
import chatRoute from './routes/chat.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({ limit: '2mb' }))

app.use('/api/explain', explainRoute)
app.use('/api/learning-path', learningPathRoute)
app.use('/api/challenge', challengeRoute)
app.use('/api/chat', chatRoute)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`CodeAtlas backend running on http://localhost:${PORT}`)
})
