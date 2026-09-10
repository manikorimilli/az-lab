import { useState } from 'react'
import { X } from 'lucide-react'
import { CATEGORIES } from '../lib/ideas.js'

function NewIdeaModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Ideas')

  const handleCreate = () => {
    if (!title.trim()) return
    onCreate({ title: title.trim(), description: description.trim(), category })
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div className="modal-edit-form">
          <h2 className="modal-title">New Idea</h2>

          <label className="modal-label">Title</label>
          <input
            className="modal-input"
            placeholder="Give your idea a name..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
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
            placeholder="What's the idea about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={handleCreate} disabled={!title.trim()}>
            Create Idea
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewIdeaModal
