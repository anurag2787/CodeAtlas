export async function callGemini(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set')
  }

  try {
    // First, list available models
    const listResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (listResponse.ok) {
      const models = await listResponse.json()
      console.log('Available models:', JSON.stringify(models, null, 2))
      
      // Find a model that supports generateContent
      const availableModel = models.models?.find(m => 
        m.supportedGenerationMethods?.includes('generateContent')
      )
      
      if (availableModel) {
        console.log('Using model:', availableModel.name)
        
        // Use the found model
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/${availableModel.name}:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: prompt }],
                },
              ],
            }),
          }
        )

        if (!response.ok) {
          const errorText = await response.text()
          console.error('Gemini API error:', errorText)
          throw new Error(`Gemini API failed: ${errorText}`)
        }

        const data = await response.json()
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

        if (!text) {
          throw new Error('Empty response from Gemini')
        }

        return text
      } else {
        throw new Error('No models supporting generateContent found')
      }
    } else {
      throw new Error('Failed to list models')
    }
  } catch (error) {
    console.error('Gemini API error:', error)
    throw error
  }
}