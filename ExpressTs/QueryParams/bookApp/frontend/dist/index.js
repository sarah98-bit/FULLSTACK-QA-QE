var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
import { fetchEvents } from "./events";
const displayBooks = (books) => {
    const bookList = document.getElementById("bookList");
    if (!bookList)
        return;
    bookList.innerHTML = books
        .map((book) => `
      <div class="book">
      <img src="${book.image}" alt="${book.title}" class="book-image">
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Genre: ${book.genre}</p>
        <p>Year: ${book.year}</p>
        <p>Pages: ${book.pages}</p>
      </div>
    `)
        .join("");
};
const loadBooks = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (query = "") {
    try {
        const books = yield fetchEvents(query);
        displayBooks(books);
    }
    catch (error) {
        console.error("Error fetching books:", error);
    }
});
// Load all books initially (without filters)
loadBooks();
(_a = document.getElementById("applyFilters")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const genre = document.getElementById("searchGenre")
        .value;
    const year = document.getElementById("searchYear")
        .value;
    const pages = document.getElementById("searchPages")
        .value;
    let query = "";
    if (genre)
        query += `?genre=${genre}`;
    if (year)
        query += `${query ? "&" : "?"}year=${year}`;
    if (pages)
        query += `${query ? "&" : "?"}pages=${pages}`;
    // Fetch filtered books using the constructed query
    loadBooks(query);
});
(_b = document.getElementById("sortbooks")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    var _a, _b;
    const sortBy = ((_a = document.getElementById("sortBy")) === null || _a === void 0 ? void 0 : _a.value) || "";
    const order = ((_b = document.getElementById("order")) === null || _b === void 0 ? void 0 : _b.value) || "";
    let queryParams = "";
    if (sortBy)
        queryParams += `?sort=${encodeURIComponent(sortBy)}`;
    if (order)
        queryParams += `${queryParams ? "&" : "?"}order=${encodeURIComponent(order)}`;
    loadBooks(queryParams);
});
//# sourceMappingURL=index.js.map