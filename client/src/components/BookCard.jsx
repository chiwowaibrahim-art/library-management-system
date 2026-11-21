
import { Link } from "react-router-dom";

function BookCard({ book, genreName }) {
  return (
    <article className="book-card">
      <div className="book-cover">
        <span className="book-cover-icon">📖</span>
        <span className="book-cover-title">{book.title}</span>
      </div>

      <div className="book-card-content">
        <span className="genre-label">
          {genreName || "Uncategorized"}
        </span>

        <h3>{book.title}</h3>

        <p className="book-author">By {book.author}</p>

        <p className="book-copies">
          {book.availableCopies} copies available
        </p>

        <Link to={`/books/${book.id}`} className="details-link">
          View details →
        </Link>
      </div>
    </article>
  );
}

export default BookCard;
