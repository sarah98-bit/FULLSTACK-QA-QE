"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Global variables
let books = [];
let cart = [];
// Fetch books data from API
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/books"); // Replace with actual API URL
            books = yield response.json();
            books = books.map((book, index) => (Object.assign(Object.assign({}, book), { id: index, price: (Math.random() * 30 + 5).toFixed(2) })));
            populateGenreDropdown();
            displayBooks(books);
        }
        catch (error) {
            console.error("Error fetching data:", error.message);
        }
    });
}
// Display books dynamically
function displayBooks(bookList) {
    const bookContainer = document.getElementById("bookList");
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
function attachEventListeners() {
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", (event) => {
            const bookId = Number(event.target.getAttribute("data-id"));
            addToCart(bookId);
        });
    });
}
// Populate genre dropdown
function populateGenreDropdown() {
    const genreDropdown = document.getElementById("searchGenre");
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
function applyFilters() {
    const genre = document.getElementById("searchGenre").value;
    const minYear = document.getElementById("searchYear").value;
    const minPages = document.getElementById("searchPages").value;
    let filteredBooks = books;
    if (genre)
        filteredBooks = filteredBooks.filter((book) => book.genre === genre);
    if (minYear)
        filteredBooks = filteredBooks.filter((book) => book.year >= parseInt(minYear));
    if (minPages)
        filteredBooks = filteredBooks.filter((book) => book.pages >= parseInt(minPages));
    displayBooks(filteredBooks);
}
// Sort books
function sortBooks() {
    const sortBy = document.getElementById("sortBy").value;
    const order = document.getElementById("order").value;
    let sortedBooks = [...books];
    sortedBooks.sort((a, b) => {
        if (typeof a[sortBy] === "number") {
            return order === "asc" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
        }
        else {
            return order === "asc" ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
        }
    });
    displayBooks(sortedBooks);
}
// Add to cart
function addToCart(bookId) {
    const book = books.find((b) => b.id === bookId);
    if (!book)
        return;
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    let existingItem = cart.find((item) => item.id === bookId);
    if (existingItem) {
        existingItem.quantity += 1;
    }
    else {
        cart.push(Object.assign(Object.assign({}, book), { quantity: 1 }));
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartButton();
}
// Update cart button count
function updateCartButton() {
    const cartButton = document.getElementById("cartButton");
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cartButton.textContent = `🛒 Cart (${cart.length})`;
}
// Toggle cart display
function toggleCart() {
    const cartContainer = document.getElementById("cartList");
    cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
    updateCartDisplay();
}
// Update cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById("cartList");
    cartContainer.innerHTML = "";
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
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
            const index = Number(event.target.getAttribute("data-index"));
            removeFromCart(index);
        });
    });
}
// Show modal
function showModal(message) {
    const modal = document.getElementById("modal");
    document.getElementById("modalMessage").textContent = message;
    modal.style.display = "block";
}
// Close modal function
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}
// Load books on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    updateCartButton();
});
//# sourceMappingURL=index.js.map