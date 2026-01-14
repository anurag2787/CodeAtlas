// Gemini AI Service
// Communicates with Node.js backend for Gemini-based AI services

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

// --------------------
// Explain file
// --------------------

export interface ExplainRequest {
  fileName: string
  filePath: string
  fileContent: string
  repoContext?: string
  eli5?: boolean
}

export interface ExplainResponse {
  explanation: string
}

export async function explainFile(
  request: ExplainRequest
): Promise<string> {
  const response = await fetch(`${API_BASE}/api/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: 'Unknown error',
    }))
    throw new Error(error.error || `API error: ${response.status}`)
  }

  const data = (await response.json()) as ExplainResponse
  return data.explanation
}

// --------------------
// Learning path
// --------------------

export interface LearningPathRequest {
  repoName: string
  repoDescription?: string
  fileStructure: string
  languages?: string[]
}

export interface LearningModule {
  title: string
  description: string
  files: string[]
  objectives: string[]
  estimatedMinutes: number
}

export interface LearningProject {
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface LearningPath {
  overview: string
  prerequisites: string[]
  modules: LearningModule[]
  projects: LearningProject[]
}

export async function generateLearningPath(
  request: LearningPathRequest
): Promise<LearningPath> {
  const response = await fetch(`${API_BASE}/api/learning-path`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: 'Unknown error',
    }))
    throw new Error(error.error || `API error: ${response.status}`)
  }

  const data = (await response.json()) as { learningPath: LearningPath }
  return data.learningPath
}

// --------------------
// Chat
// --------------------

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatRequest {
  message: string
  context?: string
  history?: ChatMessage[]
}

export interface ChatResponse {
  response: string
}

export async function chat(
  request: ChatRequest
): Promise<string> {
  const response = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: 'Unknown error',
    }))
    throw new Error(error.error || `API error: ${response.status}`)
  }

  const data = (await response.json()) as ChatResponse
  return data.response
}

// --------------------
// Challenges / Quiz
// --------------------

export interface ChallengeRequest {
  moduleTitle: string
  moduleDescription: string
  objectives: string[]
  files: string[]
  repoName: string
}

export interface Challenge {
  id: string
  type: 'multiple_choice' | 'true_false' | 'code_output'
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  points: number
}

export async function generateChallenges(
  request: ChallengeRequest
): Promise<Challenge[]> {
  const response = await fetch(`${API_BASE}/api/challenge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: 'Unknown error',
    }))
    throw new Error(error.error || `API error: ${response.status}`)
  }

  const data = (await response.json()) as { challenges: Challenge[] }
  return data.challenges || []
}

// --------------------
// Health check (optional but correct)
// --------------------

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/health`)
    return response.ok
  } catch {
    return false
  }
}

// --------------------
// Utility
// --------------------

export function getApiBase(): string {
  return API_BASE
}
