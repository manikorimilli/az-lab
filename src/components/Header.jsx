import { Menu, Plus, Search } from 'lucide-react'

function Header({ search, onSearchChange, onNewIdea, onOpenMenu }) {
  return (
    <header className="header">
      <div className="header-row">
        <button className="menu-btn" onClick={onOpenMenu} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <div className="header-greeting">
          <h1>Good morning, Manikanta 👋</h1>
          <p>What&apos;s on your mind today?</p>
        </div>
        <button className="btn btn-primary header-new-btn" onClick={onNewIdea}>
          <Plus size={17} />
          <span>New Idea</span>
        </button>
      </div>

      <div className="search-bar">
        <Search size={17} className="search-icon" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search your ideas..."
        />
      </div>
    </header>
  )
}

export default Header
