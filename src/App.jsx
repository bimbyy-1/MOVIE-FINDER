import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import Login from './components/Login';
import CategoryFilter, { CATEGORIES } from './components/CategoryFilter';
import ViewTabs from './components/ViewTabs';
import MovieModal from './components/MovieModal';

// Ganti dengan API key OMDB kamu sendiri di omdbapi.com/apikey.aspx
const API_KEY = 'd1b26531';
const FAV_KEY = 'movieFinderFavoritesV2';

function App() {
  // ---- Auth (login/logout) ----
  const [user, setUser] = useState(
    () => localStorage.getItem('movieFinderUser') || null
  );

  const handleLogin = (username) => {
    localStorage.setItem('movieFinderUser', username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('movieFinderUser');
    setSelectedMovie(null);
    setUser(null);
  };

  // ---- State inti sesuai LKPD ----
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ---- State untuk "Muat Lebih Banyak" ----
  const [currentQueries, setCurrentQueries] = useState(CATEGORIES[0].queries);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // ---- State tambahan ----
  const [activeCategory, setActiveCategory] = useState('Populer');
  const [activeView, setActiveView] = useState('all'); // 'all' | 'favorites'
  const [selectedMovie, setSelectedMovie] = useState(null); // film yang sedang dibuka detailnya

  // Favorit disimpan sebagai OBJEK film lengkap (bukan cuma ID),
  // supaya tetap bisa ditampilkan di tab Favorit walau hasil pencarian berubah.
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch {
      return [];
    }
  });

  // Ambil film dari beberapa kata kunci sekaligus, gabungkan tanpa duplikat,
  // lalu ambil detail (rating) tiap film. append=true -> tambahkan ke daftar yang ada.
  const fetchMovies = async (queries, pageNum = 1, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError('');

    try {
      const results = await Promise.all(
        queries.map(async (q) => {
          const res = await fetch(
            `https://www.omdbapi.com/?s=${encodeURIComponent(q)}&type=movie&page=${pageNum}&apikey=${API_KEY}`
          );
          return res.json();
        })
      );

      const found = results.filter((r) => r.Response === 'True');

      if (found.length === 0) {
        if (!append) {
          setMovies([]);
          setError(results[0]?.Error || 'Film tidak ditemukan');
        }
        setHasMore(false);
        return;
      }

      // masih ada halaman berikutnya kalau salah satu kata kunci punya hasil lebih banyak
      setHasMore(found.some((r) => Number(r.totalResults) > pageNum * 10));

      // gabungkan hasil & buang duplikat (termasuk yang sudah tampil)
      const seen = new Set(append ? movies.map((m) => m.imdbID) : []);
      const newBasic = [];
      found.forEach((r) =>
        r.Search.forEach((m) => {
          if (!seen.has(m.imdbID)) {
            seen.add(m.imdbID);
            newBasic.push(m);
          }
        })
      );

      const detailed = await Promise.all(
        newBasic.map(async (m) => {
          const detailRes = await fetch(
            `https://www.omdbapi.com/?i=${m.imdbID}&apikey=${API_KEY}`
          );
          return detailRes.json();
        })
      );

      setMovies((prev) => (append ? [...prev, ...detailed] : detailed));
    } catch (err) {
      if (!append) setMovies([]);
      setError('Terjadi kesalahan saat mengambil data. Coba lagi.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const startFetch = (queries) => {
    setCurrentQueries(queries);
    setPage(1);
    fetchMovies(queries, 1, false);
  };

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchMovies(currentQueries, next, true);
  };

  // Tampilkan daftar film default saat aplikasi dimuat (setelah login)
  useEffect(() => {
    if (user) {
      startFetch(CATEGORIES[0].queries);
    }
  }, [user]);

  // Simpan favorit ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') return;
    setActiveCategory('');
    setActiveView('all');
    startFetch([searchQuery.trim()]);
  };

  const handleSelectCategory = (cat) => {
    setActiveCategory(cat.label);
    setSearchQuery('');
    setActiveView('all');
    startFetch(cat.queries);
  };

  const isFavorite = (imdbID) => favorites.some((f) => f.imdbID === imdbID);

  // Tambah film ke favorit jika belum ada, hapus jika sudah ada
  const toggleFavorite = (movie) => {
    setFavorites((prev) =>
      prev.some((f) => f.imdbID === movie.imdbID)
        ? prev.filter((f) => f.imdbID !== movie.imdbID)
        : [...prev, movie]
    );
  };

  // Belum login -> tampilkan halaman Login saja
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderCards = (list) =>
    list.map((movie) => (
      <MovieCard
        key={movie.imdbID}
        poster={movie.Poster}
        title={movie.Title}
        year={movie.Year}
        rating={movie.imdbRating}
        isFavorite={isFavorite(movie.imdbID)}
        onToggleFavorite={() => toggleFavorite(movie)}
        onSelect={() => setSelectedMovie(movie)}
      />
    ));

  return (
    <div className="app">
      <Navbar user={user} onLogout={handleLogout} />

      <ViewTabs
        activeView={activeView}
        favoritesCount={favorites.length}
        onChange={setActiveView}
      />

      {activeView === 'all' && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />

          <CategoryFilter
            activeLabel={activeCategory}
            onSelect={handleSelectCategory}
          />

          {loading && <p className="status-text">Loading...</p>}  

          {!loading && error && <p className="status-text error">{error}</p>}

          {!loading && !error && (
            <div className="movie-grid">{renderCards(movies)}</div>
          )}

          {!loading && !error && hasMore && (
            <div className="load-more-wrap">
              <button
                className="load-more-btn"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? 'Memuat...' : 'Muat Lebih Banyak'}
              </button>
            </div>
          )}
        </>
      )}

      {activeView === 'favorites' && (
        <>
          {favorites.length === 0 ? (
            <p className="status-text">
              Belum ada film favorit. Klik ikon ☆ di kartu film untuk
              menambahkannya.
            </p>
          ) : (
            <div className="movie-grid">{renderCards(favorites)}</div>
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isFavorite={isFavorite(selectedMovie.imdbID)}
          onToggleFavorite={() => toggleFavorite(selectedMovie)}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
