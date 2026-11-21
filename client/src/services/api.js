
const API_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}) {
  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, options);
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }

    throw new Error(
      "Unable to connect to the library server. Please check your connection and try again."
    );
  }

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const message = Array.isArray(result?.message)
      ? result.message.join(", ")
      : result?.message || "Something went wrong.";

    throw new Error(message);
  }

  return result;
}

export function getBooks({
  genreId = "",
  search = "",
  page = 1,
  limit = 100,
  signal,
} = {}) {
  const params = new URLSearchParams();

  if (genreId) params.append("genreId", genreId);
  if (search) params.append("search", search);

  params.append("page", page);
  params.append("limit", limit);

  return request(`/books?${params.toString()}`, { signal });
}

export function getBookById(id, signal) {
  return request(`/books/${encodeURIComponent(id)}`, { signal });
}

export function getGenres(signal) {
  return request("/genres", { signal });
}
