import type { NextApiRequest, NextApiResponse } from 'next';

type ProjectEvaluationResponse = {
  market_potential: number;
  difficulty: number;
  competition: number;
  virality: number;
  overall_score: number;
  recommendation: string;
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

const isValidScore = (value: unknown) => typeof value === 'number' && Number.isFinite(value) && value >= 1 && value <= 10;

const evaluateProject = async (idea: string): Promise<ProjectEvaluationResponse> => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const prompt = [
    'You are a strict startup project evaluator.',
    `Startup idea: ${idea}`,
    '',
    'Return JSON only using this exact schema:',
    '{',
    '  "market_potential": 8,',
    '  "difficulty": 5,',
    '  "competition": 6,',
    '  "virality": 7,',
    '  "overall_score": 7,',
    '  "recommendation": "worth building"',
    '}',
    '',
    'Rules:',
    '- All numeric fields must be whole numbers from 1 to 10.',
    '- overall_score should represent the overall assessment of the idea.',
    '- recommendation must be a short phrase (2-5 words).',
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
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content: 'You evaluate startup ideas and always return valid JSON only.'
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

  const parsed = JSON.parse(content) as Partial<ProjectEvaluationResponse>;

  if (
    !isValidScore(parsed.market_potential) ||
    !isValidScore(parsed.difficulty) ||
    !isValidScore(parsed.competition) ||
    !isValidScore(parsed.virality) ||
    !isValidScore(parsed.overall_score) ||
    typeof parsed.recommendation !== 'string'
  ) {
    throw new Error('OpenAI API returned an invalid project evaluation payload');
  }

  const marketPotential = Math.round(parsed.market_potential as number);
  const difficulty = Math.round(parsed.difficulty as number);
  const competition = Math.round(parsed.competition as number);
  const virality = Math.round(parsed.virality as number);
  const overallScore = Math.round(parsed.overall_score as number);

  return {
    market_potential: marketPotential,
    difficulty,
    competition,
    virality,
    overall_score: overallScore,
    recommendation: parsed.recommendation as string
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProjectEvaluationResponse | { error: string }>
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
    const evaluation = await evaluateProject(idea);
    return res.status(200).json(evaluation);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: `Failed to evaluate project: ${message}` });
  }
}
