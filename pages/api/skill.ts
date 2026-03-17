import type { NextApiRequest, NextApiResponse } from 'next'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const PROMPTS: Record<string, string> = {
  'ai-start': '你是一个 AI 工具顾问。用户描述了他们想做的事情，请帮他们推荐最合适的 AI 工具组合，并说明每个工具的用途和使用顺序。用中文回答，格式清晰。\n\n用户需求：',
  'ai-builder': '你是一个产品经理和技术架构师。根据用户的想法，生成完整的产品方案，包括：核心功能、技术栈建议、开发里程碑、MVP 范围。用中文回答，格式清晰。\n\n用户想法：',
  'evaluate': '你是一个创业顾问。评估用户的项目，包括：市场潜力评分、竞争分析、核心风险、改进建议。用中文回答，格式清晰。\n\n项目描述：',
  'business': '你是一个商业模式专家。分析用户产品的商业模式，包括：收入来源、目标用户画像、核心竞争优势、潜在合作方向。用中文回答，格式清晰。\n\n产品描述：',
  'website': '你是一个网站策划师。根据品牌信息，生成完整的网站方案，包括：页面结构、每页核心内容、文案风格建议、设计方向。用中文回答，格式清晰。\n\n品牌信息：',
  'content': '你是一个内容策略师。根据用户的产品和目标受众，生成内容策略，包括：内容方向、发布平台建议、一周内容日历示例、爆款选题方向。用中文回答，格式清晰。\n\n产品和受众：',
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { skill, input } = req.body
  if (!input || !skill) return res.status(400).json({ error: '请输入内容' })
  const prompt = PROMPTS[skill]
  if (!prompt) return res.status(400).json({ error: '未知的 skill' })
  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt + input }],
    })
    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    res.status(200).json({ result: text })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'AI 调用失败，请稍后重试' })
  }
}
