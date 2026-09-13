// aiService.js — OpenRouter API for AI product summaries
// Uses only verified FREE models (no credits needed)
// Key: https://openrouter.ai/keys

const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_KEY || ''
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

// ✅ Verified free model IDs on OpenRouter (2025)
// Gemma first — it's a direct answer model, not a reasoning chain model
const FREE_MODELS = [
  'google/gemma-4-31b-it:free',
  'google/gemma-4-26b-a4b-it:free',
  'mistralai/mistral-small-3.1-24b-instruct:free',
  'nvidia/nemotron-3.5-lightning:free',
]

/**
 * Smart local fallback — 100% offline, always works
 */
const localSummary = (product) => {
  const price    = `₹${Math.round(product.price * 83).toLocaleString('en-IN')}`
  const discount = product.discountPercentage > 0
    ? ` Currently ${Math.round(product.discountPercentage)}% off.`
    : ''
  const stock    = product.stock <= 5
    ? ` ⚠️ Only ${product.stock} left in stock!`
    : product.stock <= 20 ? ` Limited stock available.` : ''
  const rating   = product.rating ? ` Rated ${product.rating}/5 by customers.` : ''
  const desc     = product.description?.length > 100
    ? product.description.slice(0, 100) + '…'
    : (product.description ?? '')

  return `${product.title} — a premium ${product.category} priced at ${price}.${discount} ${desc}${rating}${stock}`
}

/**
 * Call a single OpenRouter model
 */
const tryModel = async (modelId, product) => {
  const prompt =
    `You are a product copywriter. Write EXACTLY 2 sentences of marketing copy for this product. ` +
    `Output ONLY the 2 sentences — no reasoning, no explanation, no headings.\n\n` +
    `Product: ${product.title}\n` +
    `Category: ${product.category}\n` +
    `Price: ₹${Math.round(product.price * 83).toLocaleString('en-IN')}\n` +
    `Details: ${product.description?.slice(0, 120) ?? ''}`

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:5173',
      'X-Title': 'ShopAI',
    },
    body: JSON.stringify({
      model: modelId,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,      // increased — reasoning models need extra tokens
      temperature: 0.7,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    console.warn(`[AI] ${modelId} →`, err?.error?.message ?? `HTTP ${res.status}`)
    return null
  }

  const data  = await res.json()
  const msg   = data?.choices?.[0]?.message

  // Some models put the answer in content, reasoning models may put it in reasoning
  // Try content first (clean answer), then reasoning as fallback
  let text = msg?.content?.trim()

  // If content is empty or just reasoning chain, try to extract clean answer
  if (!text || text.length < 10) {
    // nothing usable
    return null
  }

  // Strip any reasoning preamble the model accidentally included
  // e.g. "Here's a thinking process: ..." → find the actual description
  const thinkingPatterns = [
    /here'?s?\s+(a\s+)?(thinking|my)\s+process[\s\S]*$/i,
    /^\s*\d+\.\s+\*\*analyze[\s\S]*/i,
    /\*\*analyze the request[\s\S]*/i,
    /^\s*here[\s\S]*?description[:\s]*/i,
  ]
  for (const pattern of thinkingPatterns) {
    if (pattern.test(text)) return null  // model leaked reasoning — skip this model
  }

  return text.length > 15 ? text : null
}

/**
 * Generate AI product summary
 * Tries free models → falls back to smart local summary
 */
export const generateProductSummary = async (product) => {
  const hasKey = OPENROUTER_KEY &&
    OPENROUTER_KEY !== 'paste_your_openrouter_key_here' &&
    OPENROUTER_KEY.startsWith('sk-or')

  if (hasKey) {
    for (const model of FREE_MODELS) {
      try {
        const result = await tryModel(model, product)
        if (result) return result
      } catch {
        // network error — try next model
      }
    }
  }

  // Always succeed
  return localSummary(product)
}
