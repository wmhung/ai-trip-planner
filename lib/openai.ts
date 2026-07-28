import OpenAI from 'openai';

// Shared OpenAI (via OpenRouter) client.
// Lives outside the route files because a Next.js `route` module may only
// export HTTP handlers and route config — not arbitrary values.
export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});
