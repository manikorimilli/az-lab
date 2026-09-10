function StatsCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon stat-icon--${accent}`}>
        <Icon size={18} />
      </div>
      <div className="stat-body">
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  )
}

export default StatsCard
