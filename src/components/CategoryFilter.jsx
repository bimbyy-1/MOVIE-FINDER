// Tiap kategori punya beberapa kata kunci (queries) supaya hasilnya lebih banyak & beragam.
// OMDB hanya mengembalikan 10 film per pencarian, jadi kita gabungkan beberapa pencarian.
const CATEGORIES = [
  { label: 'Populer', queries: ['batman', 'avengers', 'star wars'] },
  { label: 'Aksi', queries: ['mission impossible', 'john wick', 'fast furious'] },
  { label: 'Komedi', queries: ['home alone', 'hangover', 'jumanji'] },
  { label: 'Horor', queries: ['conjuring', 'insidious', 'scream'] },
  { label: 'Drama', queries: ['titanic', 'forrest gump', 'godfather'] },
  { label: 'Animasi', queries: ['toy story', 'frozen', 'kung fu panda'] },
  { label: 'Sci-Fi', queries: ['matrix', 'interstellar', 'terminator'] },
  { label: 'Indonesia', queries: ['pengabdi setan', 'warkop', 'laskar pelangi'] },
];

function CategoryFilter({ activeLabel, onSelect }) {
  return (
    <div className="category-filter">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.label}
          className={activeLabel === cat.label ? 'active' : ''}
          onClick={() => onSelect(cat)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
export { CATEGORIES };
