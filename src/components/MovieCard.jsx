function MovieCard({
  poster,
  title,
  year,
  rating,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) {
  const posterSrc =
    poster && poster !== 'N/A'
      ? poster
      : 'https://placehold.co/300x445/1c1e29/8d90a3?text=No+Poster';

  return (
    <div className="movie-card" onClick={onSelect}>
      <div className="poster-wrap">
        <img src={posterSrc} alt={title} loading="lazy" />
        <span className="rating-badge">
          ★ {rating && rating !== 'N/A' ? rating : '-'}
        </span>
        <button
          className={`fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation(); // jangan ikut membuka modal detail
            onToggleFavorite();
          }}
          title={isFavorite ? 'Hapus dari pilihan' : 'Tambah ke pilihan'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      <h3>{title}</h3>
      <p>{year}</p>
    </div>
  );
}

export default MovieCard;
