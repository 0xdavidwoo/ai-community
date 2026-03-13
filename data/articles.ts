export type Category = 'Tools' | 'News' | 'Products';

export type Article = {
  id: string;
  title: string;
  category: Category;
  summary: string;
  editorSummary: string;
  author: string;
  publishedAt: string;
  content: string[];
};

export const articles: Article[] = [
  {
    id: 'agentic-workflows-2026',
    title: 'How Agentic Workflows Are Reshaping Team Productivity',
    category: 'Tools',
    summary: 'Teams are combining copilots, planners, and automations to reduce repetitive project ops.',
    editorSummary: 'The strongest teams treat AI like a teammate with explicit handoff points and accountability.',
    author: 'Mina Patel',
    publishedAt: '2026-03-05',
    content: [
      'Agentic workflows are moving from experiments to operational defaults. Product, design, and engineering teams now run recurring planning loops with AI support.',
      'The most successful pattern is a three-step loop: human strategy, AI draft execution, and human review for quality and risk.',
      'Organizations that adopt this loop report faster release cycles and fewer cross-team miscommunications.'
    ]
  },
  {
    id: 'open-model-policy-update',
    title: 'Policy Update: Open Model Governance Gets Stricter',
    category: 'News',
    summary: 'New governance guidance requires transparency reports for model deployment in customer-facing products.',
    editorSummary: 'Compliance is becoming a product requirement, not a legal afterthought.',
    author: 'Rafael Kim',
    publishedAt: '2026-03-03',
    content: [
      'Regulators now expect deployment disclosures that include evaluation methods and known model failure modes.',
      'Companies building AI features into everyday workflows need observability from day one.',
      'Teams should centralize policy documentation to avoid fragmented internal standards.'
    ]
  },
  {
    id: 'community-product-launchpad',
    title: 'Launchpad: New Community Product Toolkit for Indie Builders',
    category: 'Products',
    summary: 'A modular toolkit helps early-stage builders validate product ideas with AI-assisted user interviews.',
    editorSummary: 'The toolkit lowers the barrier for rapid iteration while preserving customer discovery rigor.',
    author: 'Soraya Ahmed',
    publishedAt: '2026-03-01',
    content: [
      'The launchpad bundles templates for onboarding, insight extraction, and sprint planning.',
      'Founders can run short validation cycles and compare outcomes with AI-generated hypotheses.',
      'The product includes integrations with analytics tools for lightweight post-launch tracking.'
    ]
  },
  {
    id: 'retrieval-quality-benchmarks',
    title: 'Retrieval Quality Benchmarks Improve with Hybrid Search',
    category: 'Tools',
    summary: 'Hybrid search setups are now outperforming pure embedding pipelines across enterprise support datasets.',
    editorSummary: 'A blended retrieval strategy is quickly becoming table stakes for trustworthy AI responses.',
    author: 'Lena Ortiz',
    publishedAt: '2026-02-27',
    content: [
      'Benchmarks show consistent gains when lexical ranking is layered with semantic similarity.',
      'Teams are adding feedback loops to identify stale content and retrain ranking heuristics.',
      'Hybrid retrieval lowers hallucination risk by raising source precision.'
    ]
  },
  {
    id: 'ai-native-mobile-ui-patterns',
    title: 'AI-Native Mobile UI Patterns Enter Mainstream Apps',
    category: 'Products',
    summary: 'Conversational command bars and adaptive cards are becoming common in mobile productivity products.',
    editorSummary: 'Mobile-first design must now account for prompt ergonomics and instant feedback.',
    author: 'Jamie Chu',
    publishedAt: '2026-02-24',
    content: [
      'Design systems are evolving to include prompt fields, generated previews, and editable AI actions.',
      'The best experiences avoid forcing chat for everything by combining direct controls with AI suggestions.',
      'Performance remains critical: users expect AI features to respond within familiar app speed constraints.'
    ]
  }
];

export const getArticleById = (id: string) => articles.find((article) => article.id === id);
