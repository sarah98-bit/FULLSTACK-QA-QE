import { fetchEvents } from "./events";

const displayBooks = (books: any[]) => {
  const bookList = document.getElementById("bookList");
  if (!bookList) return;

  bookList.innerHTML = books
    .map(
      (book) => `
      <div class="book">
      <img src="${book.image}" alt="${book.title}" class="book-image">
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Genre: ${book.genre}</p>
        <p>Year: ${book.year}</p>
        <p>Pages: ${book.pages}</p>
      </div>
    `
    )
    .join("");
};

const loadBooks = async (query: string = "") => {
  try {
    const books = await fetchEvents(query);
    displayBooks(books);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

// Load all books initially (without filters)
loadBooks();

document.getElementById("applyFilters")?.addEventListener("click", () => {
  const genre = (document.getElementById("searchGenre") as HTMLSelectElement)
    .value;
  const year = (document.getElementById("searchYear") as HTMLInputElement)
    .value;
  const pages = (document.getElementById("searchPages") as HTMLInputElement)
    .value;

  let query = "";
  if (genre) query += `?genre=${genre}`;
  if (year) query += `${query ? "&" : "?"}year=${year}`;
  if (pages) query += `${query ? "&" : "?"}pages=${pages}`;

  // Fetch filtered books using the constructed query
  loadBooks(query);
});
document.getElementById("sortbooks")?.addEventListener("click", () => {
  const sortBy = (document.getElementById("sortBy") as HTMLSelectElement)?.value || "";
  const order = (document.getElementById("order") as HTMLSelectElement)?.value || "";

  let queryParams = "";
  if (sortBy) queryParams += `?sort=${encodeURIComponent(sortBy)}`;
  if (order) queryParams += `${queryParams ? "&" : "?"}order=${encodeURIComponent(order)}`;

  loadBooks(queryParams);
});

