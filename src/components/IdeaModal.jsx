import { useEffect, useState } from 'react'
import { Check, Pencil, Star, Trash2, X } from 'lucide-react'
import { CATEGORIES, formatDate } from '../lib/ideas.js'

function IdeaModal({ idea, onClose, onToggleFavorite, onDelete, onSave }) {
  const [closing, setClosing] = useState(false)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(idea.title)
  const [description, setDescription] = useState(idea.description)
  const [category, setCategory] = useState(idea.category)

  const category_ = CATEGORIES.find((c) => c.id === idea.category)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    setClosing(true)
    setTimeout(onClose, 180)
  }

  const handleSave = () => {
    onSave(idea.id, { title, description, category })
    setEditing(false)
  }

  const handleDelete = () => {
    onDelete(idea.id)
    handleClose()
  }

  return (
    <div
      className={`modal-backdrop ${closing ? 'modal-backdrop--closing' : ''}`}
      onClick={handleClose}
    >
      <div
        className={`modal-panel ${closing ? 'modal-panel--closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={handleClose} aria-label="Close">
          <X size={18} />
        </button>

        {editing ? (
          <div className="modal-edit-form">
            <label className="modal-label">Title</label>
            <input
              className="modal-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="modal-label">Category</label>
            <select
              className="modal-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.emoji} {c.label}
                </option>
              ))}
            </select>
            <label className="modal-label">Description</label>
            <textarea
              className="modal-input modal-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        ) : (
          <>
            <span className="idea-category-badge">
              {category_ ? `${category_.emoji} ${category_.label}` : idea.category}
            </span>
            <h2 className="modal-title">{idea.title}</h2>
            <p className="modal-description">{idea.description}</p>
            <p className="modal-date">Created {formatDate(idea.createdAt)}</p>
          </>
        )}

        <div className="modal-actions">
          <button
            className={`btn btn-secondary ${idea.favorite ? 'btn-secondary--active' : ''}`}
            onClick={() => onToggleFavorite(idea.id)}
          >
            <Star size={16} fill={idea.favorite ? 'currentColor' : 'none'} />
            {idea.favorite ? 'Favorited' : 'Favorite'}
          </button>

          {editing ? (
            <button className="btn btn-primary" onClick={handleSave}>
              <Check size={16} />
              Save
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={() => setEditing(true)}>
              <Pencil size={16} />
              Edit
            </button>
          )}

          <button className="btn btn-danger" onClick={handleDelete}>
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default IdeaModal
