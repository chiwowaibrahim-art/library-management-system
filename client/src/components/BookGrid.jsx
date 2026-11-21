
import { useEffect, useState } from "react";
import { getBooks } from "../services/api";
import BookCard from "./BookCard";
import SkeletonCard from "./SkeletonCard";

function BookGrid({ genreId, search, sortBy, genres }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBooks() {
      try {
        setLoading(true);
        setError("");

        const result = await getBooks({
          genreId,
          search,
          page: 1,
          limit: 100,
          signal: controller.signal,
        });

        const receivedBooks = Array.isArray(result)
          ? result
          : result.data || [];

        setBooks(receivedBooks);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load books.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchBooks();

    return () => controller.abort();
  }, [genreId, search]);

  const sortedBooks = [...books].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "author") {
      return a.author.localeCompare(b.author);
    }

    return 0;
  });

  const getGenreName = (id) =>
    genres.find((genre) => genre.id === id)?.name;

  if (loading) {
    return (
      <div className="book-grid" aria-label="Loading books">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-message error-message" role="alert">
        <h3>Unable to load books</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try again
        </button>
      </div>
    );
  }

  if (sortedBooks.length === 0) {
    return (
      <div className="state-message">
        <span className="empty-icon">📚</span>
        <h3>No books found</h3>
        <p>Try another search or select a different genre.</p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {sortedBooks.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          genreName={getGenreName(book.genreId)}
        />
      ))}
    </div>
  );
}

export default BookGrid;
