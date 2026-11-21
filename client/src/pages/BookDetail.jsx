
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBookById, getGenres } from "../services/api";

function BookDetail() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBookDetails() {
      try {
        setLoading(true);
        setError("");

        const [bookResult, genreResult] = await Promise.all([
          getBookById(id, controller.signal),
          getGenres(controller.signal),
        ]);

        setBook(bookResult.data || bookResult);

        setGenres(
          Array.isArray(genreResult)
            ? genreResult
            : genreResult.data || []
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load book details.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchBookDetails();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <main className="detail-state">
        <p>Loading book details...</p>
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="detail-state">
        <h2>Book unavailable</h2>
        <p>{error || "The requested book could not be found."}</p>
        <Link to="/" className="details-link">
          Return to catalog
        </Link>
      </main>
    );
  }

  const genre = genres.find((item) => item.id === book.genreId);

  return (
    <main className="detail-section">
      <Link to="/" className="back-link">
        ← Back to catalog
      </Link>

      <div className="detail-card">
        <div className="detail-cover">
          <span>📖</span>
          <h2>{book.title}</h2>
        </div>

        <div className="detail-information">
          <span className="genre-label">
            {genre?.name || "Uncategorized"}
          </span>

          <h1>{book.title}</h1>

          <p className="detail-author">By {book.author}</p>

          <div className="detail-divider"></div>

          <h3>About this book</h3>
          <p>{book.description || "No description is available."}</p>

          <div className="book-metadata">
            <p>
              <strong>ISBN:</strong> {book.isbn}
            </p>

            <p>
              <strong>Publication year:</strong>{" "}
              {book.publishedYear || "Not specified"}
            </p>

            <p>
              <strong>Genre:</strong> {genre?.name || "Not specified"}
            </p>

            <p>
              <strong>Available copies:</strong> {book.availableCopies}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookDetail;
