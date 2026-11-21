
import { useEffect, useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(input.trim());
    }, 400);

    // Cleanup prevents outdated timers from running.
    return () => clearTimeout(timer);
  }, [input, onSearch]);

  return (
    <div className="search-wrapper">
      <span className="search-icon">⌕</span>

      <input
        type="search"
        placeholder="Search by book title or author..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
        aria-label="Search books by title or author"
      />

      {input && (
        <button
          className="clear-search"
          onClick={() => setInput("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;
