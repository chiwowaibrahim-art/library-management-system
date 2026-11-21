
function GenreFilter({ genres, selectedGenre, onGenreChange }) {
  return (
    <div className="filter-wrapper">
      <label htmlFor="genre-filter">Browse by genre</label>

      <select
        id="genre-filter"
        value={selectedGenre}
        onChange={(event) => onGenreChange(event.target.value)}
      >
        <option value="">All genres</option>

        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter;
