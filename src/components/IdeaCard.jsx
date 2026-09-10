import { useEffect, useRef, useState } from 'react'
import { Archive, MoreVertical, Star, Trash2 } from 'lucide-react'
import { CATEGORIES, formatDate } from '../lib/ideas.js'

function IdeaCard({ idea, onOpen, onToggleFavorite, onDelete, onToggleArchive }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const category = CATEGORIES.find((c) => c.id === idea.category)

  useEffect(() => {
    if (!menuOpen) return
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  return (
    <div className="idea-card" onClick={() => onOpen(idea)}>
      <div className="idea-card-top">
        <span className="idea-category-badge">
          {category ? `${category.emoji} ${category.label}` : idea.category}
        </span>
        <div className="idea-card-actions">
          <button
            className={`icon-btn ${idea.favorite ? 'icon-btn--active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(idea.id)
            }}
            aria-label="Toggle favorite"
          >
            <Star size={15} fill={idea.favorite ? 'currentColor' : 'none'} />
          </button>
          <div className="idea-menu-wrap" ref={menuRef}>
            <button
              className="icon-btn"
              onClick={(e) => {
                e.stopPropagation()
                setMenuOpen((v) => !v)
              }}
              aria-label="More options"
            >
              <MoreVertical size={15} />
            </button>
            {menuOpen && (
              <div className="idea-menu" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => {
                    onToggleArchive(idea.id)
                    setMenuOpen(false)
                  }}
                >
                  <Archive size={14} />
                  {idea.archived ? 'Unarchive' : 'Archive'}
                </button>
                <button
                  className="idea-menu-danger"
                  onClick={() => {
                    onDelete(idea.id)
                    setMenuOpen(false)
                  }}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 className="idea-title">{idea.title}</h3>
      <p className="idea-description">{idea.description}</p>
      <span className="idea-date">{formatDate(idea.createdAt)}</span>
    </div>
  )
}

export default IdeaCard
