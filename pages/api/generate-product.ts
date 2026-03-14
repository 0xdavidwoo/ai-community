import type { NextApiRequest, NextApiResponse } from 'next';

type GenerateProductResponse = {
  product_name: string;
  core_features: string[];
  tech_stack: string[];
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

const generateProduct = async (idea: string): Promise<GenerateProductResponse> => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const prompt = [
    'You are an AI product strategist.',
    `User idea: ${idea}`,
    '',
    'Return JSON only using this exact schema:',
    '{',
    '  "product_name": "string",',
    '  "core_features": ["string"],',
    '  "tech_stack": ["string"]',
    '}',
    '',
    'Rules:',
    '- Keep product_name concise and clear.',
    '- Include exactly 4 core_features.',
    '- Include exactly 3 tech_stack items.',
    '- Do not include markdown fences or extra text.'
  ].join('\n');

  const openAiResponse = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.5,
      messages: [
        {
          role: 'system',
          content: 'You design AI-powered products and always return valid JSON only.'
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

  const parsed = JSON.parse(content) as Partial<GenerateProductResponse>;

  if (
    typeof parsed.product_name !== 'string' ||
    !Array.isArray(parsed.core_features) ||
    !Array.isArray(parsed.tech_stack)
  ) {
    throw new Error('OpenAI API returned an invalid product payload');
  }

  const coreFeatures = parsed.core_features.filter((feature): feature is string => typeof feature === 'string');
  const techStack = parsed.tech_stack.filter((item): item is string => typeof item === 'string');

  return {
    product_name: parsed.product_name,
    core_features: coreFeatures,
    tech_stack: techStack
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateProductResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { idea } = req.body as { idea?: string };

  if (typeof idea !== 'string' || idea.trim().length === 0) {
    return res.status(400).json({ error: 'idea must be a non-empty string' });
  }

  try {
    const product = await generateProduct(idea);
    return res.status(200).json(product);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: `Failed to generate product: ${message}` });
  }
}
