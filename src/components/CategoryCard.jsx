function CategoryCard({ emoji, label, count, active, onClick }) {
  return (
    <button
      className={`category-card ${active ? 'category-card--active' : ''}`}
      onClick={onClick}
    >
      <span className="category-emoji">{emoji}</span>
      <span className="category-label">{label}</span>
      <span className="category-count">{count}</span>
    </button>
  )
}

export default CategoryCard
