import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { CATEGORIES } from '../lib/ideas.js'

function QuickCapture({ onSave }) {
  const [text, setText] = useState('')
  const [category, setCategory] = useState('Ideas')

  const handleSave = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSave(trimmed, category)
    setText('')
  }

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSave()
    }
  }

  return (
    <div className="quick-capture">
      <div className="quick-capture-heading">
        <Sparkles size={18} className="quick-capture-icon" />
        <div>
          <h3>Quick Capture</h3>
          <p>Have an idea? Don&apos;t let it disappear.</p>
        </div>
      </div>

      <textarea
        className="quick-capture-textarea"
        placeholder="Write your thought here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
      />

      <div className="quick-capture-footer">
        <select
          className="quick-capture-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.emoji} {c.label}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={handleSave} disabled={!text.trim()}>
          Save Idea
        </button>
      </div>
    </div>
  )
}

export default QuickCapture
