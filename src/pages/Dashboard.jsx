import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, Layers, Lightbulb, Star } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'
import StatsCard from '../components/StatsCard.jsx'
import IdeaCard from '../components/IdeaCard.jsx'
import IdeaModal from '../components/IdeaModal.jsx'
import NewIdeaModal from '../components/NewIdeaModal.jsx'
import QuickCapture from '../components/QuickCapture.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { CATEGORIES, loadIdeas, saveIdeas } from '../lib/ideas.js'

function Dashboard() {
  const [ideas, setIdeas] = useState(() => loadIdeas())
  const [view, setView] = useState('dashboard')
  const [activeCategory, setActiveCategory] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [showNewIdea, setShowNewIdea] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    saveIdeas(ideas)
  }, [ideas])

  const categoryCounts = useMemo(() => {
    const counts = {}
    for (const c of CATEGORIES) counts[c.id] = 0
    for (const idea of ideas) {
      if (!idea.archived) counts[idea.category] = (counts[idea.category] ?? 0) + 1
    }
    return counts
  }, [ideas])

  const stats = useMemo(() => {
    const active = ideas.filter((i) => !i.archived)
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    return {
      total: active.length,
      favorites: active.filter((i) => i.favorite).length,
      thisWeek: active.filter((i) => new Date(i.createdAt).getTime() >= weekAgo).length,
      categories: CATEGORIES.filter((c) => categoryCounts[c.id] > 0).length,
    }
  }, [ideas, categoryCounts])

  const filteredIdeas = useMemo(() => {
    let result = ideas

    if (view === 'favorites') {
      result = result.filter((i) => i.favorite && !i.archived)
    } else if (view === 'archived') {
      result = result.filter((i) => i.archived)
    } else {
      result = result.filter((i) => !i.archived)
    }

    if (activeCategory) {
      result = result.filter((i) => i.category === activeCategory)
    }

    const q = search.trim().toLowerCase()
    if (q) {
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q),
      )
    }

    return [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [ideas, view, activeCategory, search])

  const isDashboard = view === 'dashboard' && !activeCategory && !search.trim()
  const visibleIdeas = isDashboard ? filteredIdeas.slice(0, 6) : filteredIdeas

  const handleCreateIdea = ({ title, description, category }) => {
    const newIdea = {
      id: `idea-${Date.now()}`,
      title,
      description: description || 'No description yet.',
      category,
      favorite: false,
      archived: false,
      createdAt: new Date().toISOString(),
    }
    setIdeas((prev) => [newIdea, ...prev])
  }

  const handleQuickCapture = (text, category) => {
    handleCreateIdea({ title: text.slice(0, 60), description: text, category })
  }

  const handleToggleFavorite = (id) => {
    setIdeas((prev) => prev.map((i) => (i.id === id ? { ...i, favorite: !i.favorite } : i)))
    setSelectedIdea((prev) => (prev && prev.id === id ? { ...prev, favorite: !prev.favorite } : prev))
  }

  const handleToggleArchive = (id) => {
    setIdeas((prev) => prev.map((i) => (i.id === id ? { ...i, archived: !i.archived } : i)))
  }

  const handleDelete = (id) => {
    setIdeas((prev) => prev.filter((i) => i.id !== id))
    setSelectedIdea((prev) => (prev && prev.id === id ? null : prev))
  }

  const handleSaveEdit = (id, updates) => {
    setIdeas((prev) => prev.map((i) => (i.id === id ? { ...i, ...updates } : i)))
    setSelectedIdea((prev) => (prev && prev.id === id ? { ...prev, ...updates } : prev))
  }

  const hasAnyActiveIdeas = ideas.some((i) => !i.archived)

  const sectionTitle =
    view === 'favorites'
      ? 'Favorite Ideas'
      : view === 'archived'
        ? 'Archived Ideas'
        : view === 'all'
          ? 'All Ideas'
          : 'Recent Ideas'

  return (
    <div className="app-shell">
      <Sidebar
        view={view}
        onSelectView={setView}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        counts={categoryCounts}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-area">
        <Header
          search={search}
          onSearchChange={setSearch}
          onNewIdea={() => setShowNewIdea(true)}
          onOpenMenu={() => setSidebarOpen(true)}
        />

        <main className="main-content">
          {isDashboard && (
            <>
              <section className="stats-grid">
                <StatsCard icon={Lightbulb} label="Total Ideas" value={stats.total} accent="violet" />
                <StatsCard icon={Star} label="Favorites" value={stats.favorites} accent="amber" />
                <StatsCard icon={CalendarDays} label="This Week" value={stats.thisWeek} accent="emerald" />
                <StatsCard icon={Layers} label="Categories" value={stats.categories} accent="blue" />
              </section>

              <section className="categories-section">
                <h2 className="section-title">Categories</h2>
                <div className="categories-grid">
                  {CATEGORIES.map((c) => (
                    <CategoryCard
                      key={c.id}
                      emoji={c.emoji}
                      label={c.label}
                      count={categoryCounts[c.id] ?? 0}
                      active={activeCategory === c.id}
                      onClick={() =>
                        setActiveCategory((prev) => (prev === c.id ? null : c.id))
                      }
                    />
                  ))}
                </div>
              </section>

              <QuickCapture onSave={handleQuickCapture} />
            </>
          )}

          <section className="ideas-section">
            <div className="ideas-section-header">
              <h2 className="section-title">{sectionTitle}</h2>
              {activeCategory && (
                <button className="chip-clear" onClick={() => setActiveCategory(null)}>
                  Clear filter: {activeCategory} ✕
                </button>
              )}
            </div>

            {visibleIdeas.length === 0 ? (
              search.trim() || activeCategory ? (
                <EmptyState variant="no-results" />
              ) : !hasAnyActiveIdeas ? (
                <EmptyState variant="no-ideas" onAction={() => setShowNewIdea(true)} />
              ) : (
                <EmptyState variant="no-results" />
              )
            ) : (
              <div className="ideas-grid">
                {visibleIdeas.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    onOpen={setSelectedIdea}
                    onToggleFavorite={handleToggleFavorite}
                    onDelete={handleDelete}
                    onToggleArchive={handleToggleArchive}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {selectedIdea && (
        <IdeaModal
          idea={selectedIdea}
          onClose={() => setSelectedIdea(null)}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDelete}
          onSave={handleSaveEdit}
        />
      )}

      {showNewIdea && (
        <NewIdeaModal onClose={() => setShowNewIdea(false)} onCreate={handleCreateIdea} />
      )}
    </div>
  )
}

export default Dashboard
