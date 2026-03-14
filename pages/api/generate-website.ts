import type { NextApiRequest, NextApiResponse } from 'next';

type GenerateWebsiteResponse = {
  pages: string[];
  sections: string[];
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

const generateWebsite = async (product: string): Promise<GenerateWebsiteResponse> => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const prompt = [
    'You are a senior web strategist and information architect.',
    `Product: ${product}`,
    '',
    'Return JSON only using this exact schema:',
    '{',
    '  "pages": ["string"],',
    '  "sections": ["string"]',
    '}',
    '',
    'Rules:',
    '- Include exactly 5 pages suitable for a marketing website.',
    '- Include exactly 5 homepage sections suitable for this product.',
    '- Keep names concise and title-cased.',
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
          content: 'You design website structures and always return valid JSON only.'
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

  const parsed = JSON.parse(content) as Partial<GenerateWebsiteResponse>;

  if (!Array.isArray(parsed.pages) || !Array.isArray(parsed.sections)) {
    throw new Error('OpenAI API returned an invalid website payload');
  }

  return {
    pages: parsed.pages.filter((page): page is string => typeof page === 'string'),
    sections: parsed.sections.filter((section): section is string => typeof section === 'string')
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateWebsiteResponse | { error: string }>
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
    const website = await generateWebsite(product);
    return res.status(200).json(website);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: `Failed to generate website structure: ${message}` });
  }
}
