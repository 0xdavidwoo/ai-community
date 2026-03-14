import type { NextApiRequest, NextApiResponse } from 'next';

type ViralScore = {
  impact: number;
  emotion: number;
  quote_density: number;
  structure: number;
  resonance: number;
  total: number;
};

export type ContentAnalysisResponse = {
  core_viewpoint: string;
  sub_points: string[];
  persuasion_strategy: string[];
  emotional_triggers: string[];
  key_quotes: string[];
  emotion_curve: string;
  emotion_progression: string;
  argument_types: string[];
  perspective_shift: string;
  language_style: string[];
  emotional_sentence_patterns: string[];
  cognitive_shock_patterns: string[];
  viral_score: ViralScore;
  viral_structure_template: string;
  rewrite_article: string;
  titles: string[];
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

const defaultAnalysis = (): ContentAnalysisResponse => ({
  core_viewpoint: '',
  sub_points: [],
  persuasion_strategy: [],
  emotional_triggers: [],
  key_quotes: [],
  emotion_curve: '',
  emotion_progression: '',
  argument_types: [],
  perspective_shift: '',
  language_style: [],
  emotional_sentence_patterns: [],
  cognitive_shock_patterns: [],
  viral_score: {
    impact: 0,
    emotion: 0,
    quote_density: 0,
    structure: 0,
    resonance: 0,
    total: 0
  },
  viral_structure_template: '',
  rewrite_article: '',
  titles: []
});

const normalizeScore = (value: unknown): number => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 0;
  }

  const rounded = Math.round(value);
  return Math.max(0, Math.min(100, rounded));
};

const ensureStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
};

const cleanJsonText = (text: string): string => {
  const trimmed = text.trim();

  if (trimmed.startsWith('```')) {
    return trimmed.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  }

  return trimmed;
};

const parseAnalysisPayload = (content: string): ContentAnalysisResponse => {
  const parsed = JSON.parse(cleanJsonText(content)) as Partial<ContentAnalysisResponse>;
  const fallback = defaultAnalysis();

  return {
    core_viewpoint: typeof parsed.core_viewpoint === 'string' ? parsed.core_viewpoint : fallback.core_viewpoint,
    sub_points: ensureStringArray(parsed.sub_points),
    persuasion_strategy: ensureStringArray(parsed.persuasion_strategy),
    emotional_triggers: ensureStringArray(parsed.emotional_triggers),
    key_quotes: ensureStringArray(parsed.key_quotes),
    emotion_curve: typeof parsed.emotion_curve === 'string' ? parsed.emotion_curve : fallback.emotion_curve,
    emotion_progression:
      typeof parsed.emotion_progression === 'string' ? parsed.emotion_progression : fallback.emotion_progression,
    argument_types: ensureStringArray(parsed.argument_types),
    perspective_shift: typeof parsed.perspective_shift === 'string' ? parsed.perspective_shift : fallback.perspective_shift,
    language_style: ensureStringArray(parsed.language_style),
    emotional_sentence_patterns: ensureStringArray(parsed.emotional_sentence_patterns),
    cognitive_shock_patterns: ensureStringArray(parsed.cognitive_shock_patterns),
    viral_score: {
      impact: normalizeScore(parsed.viral_score?.impact),
      emotion: normalizeScore(parsed.viral_score?.emotion),
      quote_density: normalizeScore(parsed.viral_score?.quote_density),
      structure: normalizeScore(parsed.viral_score?.structure),
      resonance: normalizeScore(parsed.viral_score?.resonance),
      total: normalizeScore(parsed.viral_score?.total)
    },
    viral_structure_template:
      typeof parsed.viral_structure_template === 'string'
        ? parsed.viral_structure_template
        : fallback.viral_structure_template,
    rewrite_article: typeof parsed.rewrite_article === 'string' ? parsed.rewrite_article : fallback.rewrite_article,
    titles: ensureStringArray(parsed.titles)
  };
};

const analyzeContent = async (article: string): Promise<ContentAnalysisResponse> => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const prompt = [
    'Analyze the article and return JSON only using this exact schema:',
    '{',
    ' "core_viewpoint":"",',
    ' "sub_points":[],',
    ' "persuasion_strategy":[],',
    ' "emotional_triggers":[],',
    ' "key_quotes":[],',
    ' "emotion_curve":"",',
    ' "emotion_progression":"",',
    ' "argument_types":[],',
    ' "perspective_shift":"",',
    ' "language_style":[],',
    ' "emotional_sentence_patterns":[],',
    ' "cognitive_shock_patterns":[],',
    ' "viral_score":{',
    '   "impact":0,',
    '   "emotion":0,',
    '   "quote_density":0,',
    '   "structure":0,',
    '   "resonance":0,',
    '   "total":0',
    ' },',
    ' "viral_structure_template":"",',
    ' "rewrite_article":"",',
    ' "titles":[]',
    '}',
    '',
    'Rules:',
    '- Return valid JSON only. No markdown fences, no extra text.',
    '- Arrays should include concise, useful entries.',
    '- viral_score fields should be integers from 0 to 100.',
    '- rewrite_article should be a revised version of the source article in a stronger viral structure.',
    '- titles should include at least 5 options.',
    '',
    `Article:\n${article}`
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
          content: 'You are an expert content strategist and copy analyst. Always return valid JSON only.'
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

  return parseAnalysisPayload(content);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContentAnalysisResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { article } = req.body as { article?: string };

  if (typeof article !== 'string' || article.trim().length === 0) {
    return res.status(400).json({ error: 'article must be a non-empty string' });
  }

  try {
    const analysis = await analyzeContent(article);
    return res.status(200).json(analysis);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: `Failed to analyze content: ${message}` });
  }
}
