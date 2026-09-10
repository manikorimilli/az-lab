import { Brain, SearchX } from 'lucide-react'

function EmptyState({ variant = 'no-ideas', onAction }) {
  if (variant === 'no-results') {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <SearchX size={28} />
        </div>
        <h3>No ideas found</h3>
        <p>Try a different search term or category.</p>
      </div>
    )
  }

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Brain size={28} />
      </div>
      <h3>Your brain is ready for its next idea.</h3>
      <p>Start capturing your thoughts and build your second brain.</p>
      <button className="btn btn-primary" onClick={onAction}>
        Create your first idea
      </button>
    </div>
  )
}

export default EmptyState
