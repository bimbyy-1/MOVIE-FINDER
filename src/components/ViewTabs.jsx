function ViewTabs({ activeView, favoritesCount, onChange }) {
  return (
    <div className="view-tabs">
      <button
        className={activeView === 'all' ? 'active' : ''}
        onClick={() => onChange('all')}
      >
        Semua Film
      </button>
      <button
        className={activeView === 'favorites' ? 'active' : ''}
        onClick={() => onChange('favorites')}
      >
        ★ Favorit ({favoritesCount})
      </button>
    </div>
  );
}

export default ViewTabs;
