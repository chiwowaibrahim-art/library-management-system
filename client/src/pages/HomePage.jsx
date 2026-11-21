
import { useCallback, useEffect, useState } from "react";
import { getGenres } from "../services/api";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import BookGrid from "../components/BookGrid";

function HomePage() {
  const [search, setSearch] = useState("");
  const [genreId, setGenreId] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [genres, setGenres] = useState([]);
  const [genreError, setGenreError] = useState("");

  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGenres() {
      try {
        const result = await getGenres(controller.signal);

        const receivedGenres = Array.isArray(result)
          ? result
          : result.data || [];

        setGenres(receivedGenres);
      } catch (err) {
        if (err.name !== "AbortError") {
          setGenreError(err.message || "Unable to load genres.");
        }
      }
    }

    fetchGenres();

    return () => controller.abort();
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">YOUR DIGITAL LIBRARY</span>

          <h1>Discover your next great read.</h1>

          <p>
            Explore our collection of books, discover new subjects
            and find stories worth reading.
          </p>

          <div className="hero-search">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      <section className="catalog-section">
        <div className="catalog-heading">
          <div>
            <span className="eyebrow">EXPLORE THE COLLECTION</span>
            <h2>Our Books</h2>
            <p>Find something interesting to read today.</p>
          </div>
        </div>

        <div className="catalog-controls">
          <GenreFilter
            genres={genres}
            selectedGenre={genreId}
            onGenreChange={setGenreId}
          />

          <div className="sort-wrapper">
            <label htmlFor="sort-books">Sort by</label>

            <select
              id="sort-books"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="">Default order</option>
              <option value="title">Book title</option>
              <option value="author">Author</option>
            </select>
          </div>
        </div>

        {genreError && (
          <p className="inline-error" role="alert">
            Genre filters could not be loaded: {genreError}
          </p>
        )}

        <BookGrid
          genreId={genreId}
          search={search}
          sortBy={sortBy}
          genres={genres}
        />
      </section>
    </main>
  );
}

export default HomePage;
