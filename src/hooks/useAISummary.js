// useAISummary — S: Only handles AI summary state
// Always succeeds — API or smart local fallback
import { useState } from 'react'
import { generateProductSummary } from '../services/aiService'

export const useAISummary = () => {
  const [summary, setSummary]   = useState(null)
  const [status, setStatus]     = useState('idle') // 'idle' | 'loading' | 'success'
  const [isLocal, setIsLocal]   = useState(false)  // true = used local fallback

  const generateSummary = async (product) => {
    setStatus('loading')
    setSummary(null)
    setIsLocal(false)

    try {
      const result = await generateProductSummary(product)
      setSummary(result)
      setStatus('success')
      // Detect if it's the local fallback (contains the price pattern we inject)
      const looksLocal = result?.includes('₹') && result?.includes('...')
      setIsLocal(!!looksLocal)
    } catch {
      setStatus('idle')
    }
  }

  const reset = () => {
    setSummary(null)
    setStatus('idle')
    setIsLocal(false)
  }

  return { summary, status, isLocal, generateSummary, reset }
}
