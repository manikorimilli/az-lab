import {
  Archive,
  LayoutGrid,
  Lightbulb,
  ListChecks,
  Settings,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import { CATEGORIES } from '../lib/ideas.js'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'all', label: 'All Ideas', icon: ListChecks },
  { id: 'favorites', label: 'Favorites', icon: Star },
  { id: 'archived', label: 'Archived', icon: Archive },
]

function Sidebar({
  view,
  onSelectView,
  activeCategory,
  onSelectCategory,
  counts,
  isOpen,
  onClose,
}) {
  const handleNav = (id) => {
    onSelectView(id)
    onClose()
  }

  const handleCategory = (id) => {
    onSelectCategory(id === activeCategory ? null : id)
    onClose()
  }

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar-top">
          <div className="logo">
            <Sparkles size={20} className="logo-icon" />
            <span>IdeaVault</span>
          </div>
          <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${view === id ? 'nav-item--active' : ''}`}
              onClick={() => handleNav(id)}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-section">
          <p className="sidebar-heading">Categories</p>
          <div className="sidebar-nav">
            {CATEGORIES.map(({ id, label, emoji }) => (
              <button
                key={id}
                className={`nav-item ${activeCategory === id ? 'nav-item--active' : ''}`}
                onClick={() => handleCategory(id)}
              >
                <span className="nav-emoji">{emoji}</span>
                <span>{label}</span>
                <span className="nav-count">{counts[id] ?? 0}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-bottom">
          <button className="nav-item">
            <Settings size={17} />
            <span>Settings</span>
          </button>
          <div className="user-chip">
            <div className="user-avatar">M</div>
            <div className="user-info">
              <span className="user-name">Manikanta</span>
              <span className="user-role">Builder</span>
            </div>
            <Lightbulb size={15} className="user-lightbulb" />
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
