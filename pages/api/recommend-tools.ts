import type { NextApiRequest, NextApiResponse } from 'next';

type RecommendToolsResponse = {
  task: string;
  tools: Array<{
    name: string;
    description: string;
  }>;
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

const getRecommendedTools = async (task: string): Promise<RecommendToolsResponse['tools']> => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const prompt = [
    'You are an AI tool advisor.',
    `User task: ${task}`,
    '',
    'Return JSON only using this exact schema:',
    '{',
    '  "tools": [',
    '    {',
    '      "name": "string",',
    '      "description": "string"',
    '    }',
    '  ]',
    '}',
    '',
    'Rules:',
    '- Return 3 relevant tools when possible.',
    '- Keep each description concise (one sentence).',
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
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content: 'You recommend software tools and must always return valid JSON only.'
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

  const parsed = JSON.parse(content) as { tools?: RecommendToolsResponse['tools'] };

  if (!Array.isArray(parsed.tools)) {
    throw new Error('OpenAI API returned an invalid tools payload');
  }

  return parsed.tools.filter(
    (tool): tool is { name: string; description: string } =>
      Boolean(tool) && typeof tool.name === 'string' && typeof tool.description === 'string'
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecommendToolsResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { task } = req.body as { task?: string };

  if (typeof task !== 'string' || task.trim().length === 0) {
    return res.status(400).json({ error: 'task must be a non-empty string' });
  }

  try {
    const tools = await getRecommendedTools(task);

    return res.status(200).json({
      task,
      tools
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: `Failed to recommend tools: ${message}` });
  }
}
