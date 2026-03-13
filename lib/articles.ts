export type Category = 'tool' | 'news' | 'product';

export type Article = {
  id: string;
  title: string;
  category: Category;
  summary: string;
  publishedAt: string;
  content: string;
};

export const articles: Article[] = [
  {
    id: 'a1',
    title: 'Open-source vector DB trends community teams are actually adopting',
    category: 'news',
    summary: 'Editors digest what infra choices small AI teams made this week and why cost visibility became a top concern.',
    publishedAt: '2026-03-10',
    content: 'Community maintainers shared migration notes for faster retrieval and lower hosting overhead. The strongest pattern: keep architecture simple, instrument usage first, then optimize indexing once query workloads are stable.'
  },
  {
    id: 'a2',
    title: 'Shipping your first AI co-pilot: practical launch checklist',
    category: 'product',
    summary: 'A production-minded checklist covering onboarding, quality loops, and communication habits for beta releases.',
    publishedAt: '2026-03-09',
    content: 'From prompt telemetry to human fallback flows, teams highlighted that launch quality depends on observing user confusion quickly and fixing workflows in days, not quarters.'
  },
  {
    id: 'a3',
    title: 'Benchmarking prompt eval tools: what worked in real projects',
    category: 'tool',
    summary: 'Editors compare common prompt evaluation tools by setup time, visibility, and fit for fast-moving feature squads.',
    publishedAt: '2026-03-08',
    content: 'The standout tools were not always the most complex. Teams favored systems that made failures obvious, supported collaboration, and kept evaluation data close to product metrics.'
  },
  {
    id: 'a4',
    title: 'Why AI communities are prioritizing curation over volume',
    category: 'news',
    summary: 'Signal-to-noise strategies from editors who run growing AI content channels and weekly member roundups.',
    publishedAt: '2026-03-07',
    content: 'Curators reported that strict relevance filters and concise commentary consistently improved return visits. Members prefer fewer, high-context posts over endless link streams.'
  },
  {
    id: 'a5',
    title: 'Designing internal AI product updates members will read',
    category: 'product',
    summary: 'Templates and communication patterns for transparent product updates across community, growth, and engineering.',
    publishedAt: '2026-03-06',
    content: 'Teams that explain trade-offs and pending risks build more trust than teams that only announce wins. Clear release notes and known issues reduce support load significantly.'
  },
  {
    id: 'a6',
    title: 'Tooling stack for daily AI content operations',
    category: 'tool',
    summary: 'A practical stack for collecting, ranking, and publishing AI stories with lightweight automation.',
    publishedAt: '2026-03-05',
    content: 'Editors shared an operations stack built on scheduled ingestion, manual curation checkpoints, and simple analytics dashboards to protect quality while scaling output.'
  }
];
