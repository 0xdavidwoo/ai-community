import type { NextApiRequest, NextApiResponse } from 'next';

type AnalyzeBusinessResponse = {
  revenue_models: string[];
  target_users: string;
  pricing_suggestion: string;
};

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

type OpenAIResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
};

const analyzeBusiness = async (product: string): Promise<AnalyzeBusinessResponse> => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const prompt = [
    'You are a startup business model advisor.',
    `Product idea: ${product}`,
    '',
    'Return JSON only using this exact schema:',
    '{',
    '  "revenue_models": ["string"],',
    '  "target_users": "string",',
    '  "pricing_suggestion": "string"',
    '}',
    '',
    'Rules:',
    '- Return exactly 3 concise revenue_models.',
    '- target_users must be a single concise phrase.',
    '- pricing_suggestion must be a realistic short range (for example "$10-30/month").',
    '- Do not include markdown fences or additional text.'
  ].join('\n');

  const openAiResponse = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.4,
      messages: [
        {
          role: 'system',
          content: 'You help founders define business models and always return valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  });

  if (!openAiResponse.ok) {
    const errorText = await openAiResponse.text();
    throw new Error(`OpenAI API request failed: ${openAiResponse.status} ${errorText}`);
  }

  const data = (await openAiResponse.json()) as OpenAIResponse;
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('OpenAI API returned an empty response');
  }

  const parsed = JSON.parse(content) as Partial<AnalyzeBusinessResponse>;

  if (
    !Array.isArray(parsed.revenue_models) ||
    typeof parsed.target_users !== 'string' ||
    typeof parsed.pricing_suggestion !== 'string'
  ) {
    throw new Error('OpenAI API returned an invalid business analysis payload');
  }

  const revenueModels = parsed.revenue_models.filter((model): model is string => typeof model === 'string');

  return {
    revenue_models: revenueModels,
    target_users: parsed.target_users,
    pricing_suggestion: parsed.pricing_suggestion
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalyzeBusinessResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { product } = req.body as { product?: string };

  if (typeof product !== 'string' || product.trim().length === 0) {
    return res.status(400).json({ error: 'product must be a non-empty string' });
  }

  try {
    const analysis = await analyzeBusiness(product);
    return res.status(200).json(analysis);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: `Failed to analyze business model: ${message}` });
  }
}
