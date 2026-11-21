import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookDetail from "./pages/BookDetail";

function App() {
  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand">
          <span className="brand-icon">📚</span>
          <span>Library<span className="brand-highlight">Hub</span></span>
        </Link>

        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route
          path="*"
          element={
            <main className="detail-state">
              <h1>404 - Page not found</h1>
              <Link to="/">Return home</Link>
            </main>
          }
        />
      </Routes>

      <footer className="site-footer">
        <p>LibraryHub — Discover. Read. Learn.</p>
      </footer>
    </>
  );
}

export default App;
