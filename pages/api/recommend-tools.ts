import type { NextApiRequest, NextApiResponse } from 'next';

type RecommendToolsResponse = {
  task: string;
  tools: Array<{
    name: string;
    description: string;
  }>;
};

const getRecommendedTools = (task: string): RecommendToolsResponse['tools'] => {
  const normalizedTask = task.toLowerCase();

  if (normalizedTask.includes('writing')) {
    return [
      { name: 'ChatGPT', description: 'Versatile AI assistant for drafting and editing copy' },
      { name: 'Claude', description: 'Strong long-form writing and document summarization assistant' },
      { name: 'Notion AI', description: 'Writing support directly inside your notes and docs workspace' }
    ];
  }

  if (normalizedTask.includes('image')) {
    return [
      { name: 'Midjourney', description: 'Text-to-image tool for stylized visual generation' },
      { name: 'DALL-E', description: 'Image generation model for creating visuals from prompts' },
      { name: 'Stable Diffusion', description: 'Open-source image model with high customization flexibility' }
    ];
  }

  if (normalizedTask.includes('video')) {
    return [
      { name: 'Runway', description: 'AI video editing and generation platform for creators' },
      { name: 'Pika', description: 'Prompt-based tool for generating short AI videos' },
      { name: 'CapCut AI', description: 'Consumer-friendly video editor with built-in AI effects' }
    ];
  }

  if (normalizedTask.includes('website')) {
    return [
      { name: 'Next.js', description: 'React framework for building websites' },
      { name: 'Vercel', description: 'Platform to deploy frontend apps' },
      { name: 'Supabase', description: 'Open-source backend and database' }
    ];
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
