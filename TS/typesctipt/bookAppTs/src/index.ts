// Define Book interface
interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  pages: number;
  year: number;
  price: string;
  image: string;
}

// Define Cart Item interface
interface CartItem extends Book {
  quantity: number;
}

// Global variables
let books: Book[] = [];
let cart: CartItem[] = [];

// Fetch books data from API
async function fetchData(): Promise<void> {
  try {
    const response = await fetch("http://localhost:3000/api/v1/books"); // Replace with actual API URL
    books = await response.json();
    books = books.map((book, index) => ({
      ...book,
      id: index,
      price: (Math.random() * 30 + 5).toFixed(2),
    }));

    populateGenreDropdown();
    displayBooks(books);
  } catch (error) {
    console.error("Error fetching data:", (error as Error).message);
  }
}

// Display books dynamically
function displayBooks(bookList: Book[]): void {
  const bookContainer = document.getElementById("bookList") as HTMLElement;
  bookContainer.innerHTML = "";

  if (bookList.length === 0) {
    bookContainer.innerHTML = "<p>No books found.</p>";
    return;
  }

  bookList.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");

    bookElement.innerHTML = `
      <img src="${book.image}" alt="${book.title}" class="book-image">
      <h3>${book.title}</h3>
      <p>By ${book.author}</p>
      <p>Genre: ${book.genre}</p>
      <p>Pages: ${book.pages}</p>
      <p>Year: ${book.year}</p>
      <p><strong>Price: $${book.price}</strong></p>
      <button class="add-to-cart" data-id="${book.id}">🛒 Add to Cart</button>
    `;

    bookContainer.appendChild(bookElement);

    if (book.year < 1900) {
      showModal(`${book.title} is a classic!`);
    }
  });

  attachEventListeners();
}

// Attach event listeners to buttons
function attachEventListeners(): void {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const bookId = Number((event.target as HTMLElement).getAttribute("data-id"));
      addToCart(bookId);
    });
  });
}

// Populate genre dropdown
function populateGenreDropdown(): void {
  const genreDropdown = document.getElementById("searchGenre") as HTMLSelectElement;
  const uniqueGenres = [...new Set(books.map((book) => book.genre))];

  genreDropdown.innerHTML = `<option value="">All Genres</option>`;
  uniqueGenres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreDropdown.appendChild(option);
  });

  genreDropdown.addEventListener("change", applyFilters);
}

// Apply filters
function applyFilters(): void {
  const genre = (document.getElementById("searchGenre") as HTMLSelectElement).value;
  const minYear = (document.getElementById("searchYear") as HTMLInputElement).value;
  const minPages = (document.getElementById("searchPages") as HTMLInputElement).value;

  let filteredBooks = books;

  if (genre) filteredBooks = filteredBooks.filter((book) => book.genre === genre);
  if (minYear) filteredBooks = filteredBooks.filter((book) => book.year >= parseInt(minYear));
  if (minPages) filteredBooks = filteredBooks.filter((book) => book.pages >= parseInt(minPages));

  displayBooks(filteredBooks);
}

// Sort books
function sortBooks(): void {
  const sortBy = (document.getElementById("sortBy") as HTMLSelectElement).value as keyof Book;
  const order = (document.getElementById("order") as HTMLSelectElement).value;

  let sortedBooks = [...books];

  sortedBooks.sort((a, b) => {
    if (typeof a[sortBy] === "number") {
      return order === "asc" ? (a[sortBy] as number) - (b[sortBy] as number) : (b[sortBy] as number) - (a[sortBy] as number);
    } else {
      return order === "asc" ? (a[sortBy] as string).localeCompare(b[sortBy] as string) : (b[sortBy] as string).localeCompare(a[sortBy] as string);
    }
  });

  displayBooks(sortedBooks);
}

// Add to cart
function addToCart(bookId: number): void {
  const book = books.find((b) => b.id === bookId);
  if (!book) return;

  let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

  let existingItem = cart.find((item) => item.id === bookId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartButton();
}

// Update cart button count
function updateCartButton(): void {
  const cartButton = document.getElementById("cartButton") as HTMLButtonElement;
  let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
  cartButton.textContent = `🛒 Cart (${cart.length})`;
}

// Toggle cart display
function toggleCart(): void {
  const cartContainer = document.getElementById("cartList") as HTMLElement;
  cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
  updateCartDisplay();
}

// Update cart display
function updateCartDisplay(): void {
  const cartContainer = document.getElementById("cartList") as HTMLElement;
  cartContainer.innerHTML = "";

  let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Cart is empty.</p>";
    return;
  }

  let total = 0;
  cart.forEach((book, index) => {
    total += parseFloat(book.price) * book.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <p>${book.title} - $${book.price} (x${book.quantity})</p>
      <button class="remove-from-cart" data-index="${index}">❌ Remove</button>
    `;

    cartContainer.appendChild(cartItem);
  });

  const totalElement = document.createElement("p");
  totalElement.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  cartContainer.appendChild(totalElement);

  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = Number((event.target as HTMLElement).getAttribute("data-index"));
      removeFromCart(index);
    });
  });
}

// Show modal
function showModal(message: string): void {
  const modal = document.getElementById("modal") as HTMLElement;
  (document.getElementById("modalMessage") as HTMLElement).textContent = message;
  modal.style.display = "block";
}

// Close modal function
function closeModal(): void {
  const modal = document.getElementById("modal") as HTMLElement;
  modal.style.display = "none";
}

// Load books on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  updateCartButton();
});
