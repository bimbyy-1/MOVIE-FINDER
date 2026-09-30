import { useEffect } from 'react';

// tampilkan '-' kalau data dari OMDB kosong / "N/A"
const val = (v) => (v && v !== 'N/A' ? v : '-');

function MovieModal({ movie, isFavorite, onToggleFavorite, onClose }) {
  // Tutup modal dengan tombol Esc
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const posterSrc =
    movie.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : 'https://placehold.co/300x445/1c1e29/8d90a3?text=No+Poster';

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation: klik di dalam kotak tidak ikut menutup modal */}
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} title="Tutup">
          <i className="bi bi-x-lg"></i>
        </button>

        <img className="modal-poster" src={posterSrc} alt={movie.Title} />

        <div className="modal-info">
          <h2>{movie.Title}</h2>

          <div className="modal-meta">
            <span className="modal-rating">
              <i className="bi bi-star-fill"></i> {val(movie.imdbRating)}
            </span>
            <span>{val(movie.Year)}</span>
            <span>{val(movie.Runtime)}</span>
            <span className="modal-rated">{val(movie.Rated)}</span>
          </div>

          <p className="modal-genre">{val(movie.Genre)}</p>

          <p className="modal-plot">{val(movie.Plot)}</p>

          <dl className="modal-details">
            <dt>Sutradara</dt>
            <dd>{val(movie.Director)}</dd>
            <dt>Pemeran</dt>
            <dd>{val(movie.Actors)}</dd>
            <dt>Rilis</dt>
            <dd>{val(movie.Released)}</dd>
            <dt>Bahasa</dt>
            <dd>{val(movie.Language)}</dd>
            <dt>Negara</dt>
            <dd>{val(movie.Country)}</dd>
            <dt>Penghargaan</dt>
            <dd>{val(movie.Awards)}</dd>
          </dl>

          <button
            className={`modal-fav ${isFavorite ? 'active' : ''}`}
            onClick={onToggleFavorite}
          >
            <i className={`bi ${isFavorite ? 'bi-star-fill' : 'bi-star'}`}></i>{' '}
            {isFavorite ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
