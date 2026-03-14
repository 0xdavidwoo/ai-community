import type { NextApiRequest, NextApiResponse } from 'next';

type RecommendToolsResponse = {
  task: string;
  tools: string[];
};

const getRecommendedTools = (task: string): string[] => {
  const normalizedTask = task.toLowerCase();

  if (normalizedTask.includes('writing')) {
    return ['ChatGPT', 'Claude', 'Notion AI'];
  }

  if (normalizedTask.includes('image')) {
    return ['Midjourney', 'DALL-E', 'Stable Diffusion'];
  }

  if (normalizedTask.includes('video')) {
    return ['Runway', 'Pika', 'CapCut AI'];
  }

  if (normalizedTask.includes('website')) {
    return ['Next.js', 'Vercel', 'Supabase'];
  }

  return [];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<RecommendToolsResponse | { error: string }>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { task } = req.body as { task?: string };

  if (typeof task !== 'string' || task.trim().length === 0) {
    return res.status(400).json({ error: 'task must be a non-empty string' });
  }

  return res.status(200).json({
    task,
    tools: getRecommendedTools(task)
  });
}
