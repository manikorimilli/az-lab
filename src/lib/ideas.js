export const CATEGORIES = [
  { id: 'Ideas', label: 'Ideas', emoji: '💡' },
  { id: 'Learning', label: 'Learning', emoji: '🧠' },
  { id: 'Projects', label: 'Projects', emoji: '🚀' },
  { id: 'AI', label: 'AI', emoji: '🤖' },
  { id: 'Resources', label: 'Resources', emoji: '📚' },
]

export const STORAGE_KEY = 'ideavault.ideas'

const daysAgo = (n) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

export const SEED_IDEAS = [
  {
    id: 'seed-1',
    title: 'Build a Personal AI Assistant',
    description:
      'Create an assistant that remembers my notes and helps me find useful information.',
    category: 'AI',
    favorite: true,
    archived: false,
    createdAt: daysAgo(1),
  },
  {
    id: 'seed-2',
    title: 'Learn System Design',
    description:
      'Study scalable architectures, caching, queues, databases and distributed systems.',
    category: 'Learning',
    favorite: false,
    archived: false,
    createdAt: daysAgo(2),
  },
  {
    id: 'seed-3',
    title: 'Build a Developer Portfolio',
    description:
      'Create a modern portfolio showcasing my projects and technical journey.',
    category: 'Projects',
    favorite: true,
    archived: false,
    createdAt: daysAgo(3),
  },
  {
    id: 'seed-4',
    title: 'Learn RAG',
    description:
      'Understand embeddings, vector databases and retrieval augmented generation.',
    category: 'AI',
    favorite: false,
    archived: false,
    createdAt: daysAgo(4),
  },
  {
    id: 'seed-5',
    title: 'Build a SaaS Side Project',
    description: 'Build a small SaaS product that solves a real developer problem.',
    category: 'Ideas',
    favorite: false,
    archived: false,
    createdAt: daysAgo(5),
  },
  {
    id: 'seed-6',
    title: 'Improve DSA Skills',
    description: 'Practice algorithms and data structures consistently.',
    category: 'Learning',
    favorite: false,
    archived: false,
    createdAt: daysAgo(6),
  },
]

export function loadIdeas() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return SEED_IDEAS
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) return SEED_IDEAS
    return parsed
  } catch {
    return SEED_IDEAS
  }
}

export function saveIdeas(ideas) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas))
  } catch {
    // localStorage unavailable — ignore, in-memory state still works
  }
}

export function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
