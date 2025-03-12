var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Global variables
var books = [];
var cart = [];
// Fetch books data from API
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3000/books")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    books = _a.sent();
                    books = books.map(function (book, index) { return (__assign(__assign({}, book), { id: index, price: (Math.random() * 30 + 5).toFixed(2) })); });
                    populateGenreDropdown();
                    displayBooks(books);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching data:", error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Display books dynamically
function displayBooks(bookList) {
    var bookContainer = document.getElementById("bookList");
    bookContainer.innerHTML = "";
    if (bookList.length === 0) {
        bookContainer.innerHTML = "<p>No books found.</p>";
        return;
    }
    bookList.forEach(function (book) {
        var bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.innerHTML = "\n      <img src=\"".concat(book.image, "\" alt=\"").concat(book.title, "\" class=\"book-image\">\n      <h3>").concat(book.title, "</h3>\n      <p>By ").concat(book.author, "</p>\n      <p>Genre: ").concat(book.genre, "</p>\n      <p>Pages: ").concat(book.pages, "</p>\n      <p>Year: ").concat(book.year, "</p>\n      <p><strong>Price: $").concat(book.price, "</strong></p>\n      <button class=\"add-to-cart\" data-id=\"").concat(book.id, "\">\uD83D\uDED2 Add to Cart</button>\n    ");
        bookContainer.appendChild(bookElement);
        if (book.year < 1900) {
            showModal("".concat(book.title, " is a classic!"));
        }
    });
    attachEventListeners();
}
// Attach event listeners to buttons
function attachEventListeners() {
    document.querySelectorAll(".add-to-cart").forEach(function (button) {
        button.addEventListener("click", function (event) {
            var bookId = Number(event.target.getAttribute("data-id"));
            addToCart(bookId);
        });
    });
}
// Populate genre dropdown
function populateGenreDropdown() {
    var genreDropdown = document.getElementById("searchGenre");
    var uniqueGenres = __spreadArray([], new Set(books.map(function (book) { return book.genre; })), true);
    genreDropdown.innerHTML = "<option value=\"\">All Genres</option>";
    uniqueGenres.forEach(function (genre) {
        var option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreDropdown.appendChild(option);
    });
    genreDropdown.addEventListener("change", applyFilters);
}
// Apply filters
function applyFilters() {
    var genre = document.getElementById("searchGenre").value;
    var minYear = document.getElementById("searchYear").value;
    var minPages = document.getElementById("searchPages").value;
    var filteredBooks = books;
    if (genre)
        filteredBooks = filteredBooks.filter(function (book) { return book.genre === genre; });
    if (minYear)
        filteredBooks = filteredBooks.filter(function (book) { return book.year >= parseInt(minYear); });
    if (minPages)
        filteredBooks = filteredBooks.filter(function (book) { return book.pages >= parseInt(minPages); });
    displayBooks(filteredBooks);
}
// Sort books
function sortBooks() {
    var sortBy = document.getElementById("sortBy").value;
    var order = document.getElementById("order").value;
    var sortedBooks = __spreadArray([], books, true);
    sortedBooks.sort(function (a, b) {
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
    var book = books.find(function (b) { return b.id === bookId; });
    if (!book)
        return;
    var cart = JSON.parse(localStorage.getItem("cart") || "[]");
    var existingItem = cart.find(function (item) { return item.id === bookId; });
    if (existingItem) {
        existingItem.quantity += 1;
    }
    else {
        cart.push(__assign(__assign({}, book), { quantity: 1 }));
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartButton();
}
// Update cart button count
function updateCartButton() {
    var cartButton = document.getElementById("cartButton");
    var cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cartButton.textContent = "\uD83D\uDED2 Cart (".concat(cart.length, ")");
}
// Toggle cart display
function toggleCart() {
    var cartContainer = document.getElementById("cartList");
    cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
    updateCartDisplay();
}
// Update cart display
function updateCartDisplay() {
    var cartContainer = document.getElementById("cartList");
    cartContainer.innerHTML = "";
    var cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Cart is empty.</p>";
        return;
    }
    var total = 0;
    cart.forEach(function (book, index) {
        total += parseFloat(book.price) * book.quantity;
        var cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = "\n      <p>".concat(book.title, " - $").concat(book.price, " (x").concat(book.quantity, ")</p>\n      <button class=\"remove-from-cart\" data-index=\"").concat(index, "\">\u274C Remove</button>\n    ");
        cartContainer.appendChild(cartItem);
    });
    var totalElement = document.createElement("p");
    totalElement.innerHTML = "<strong>Total: $".concat(total.toFixed(2), "</strong>");
    cartContainer.appendChild(totalElement);
    document.querySelectorAll(".remove-from-cart").forEach(function (button) {
        button.addEventListener("click", function (event) {
            var index = Number(event.target.getAttribute("data-index"));
            removeFromCart(index);
        });
    });
}
// Show modal
function showModal(message) {
    var modal = document.getElementById("modal");
    document.getElementById("modalMessage").textContent = message;
    modal.style.display = "block";
}
// Close modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}
// Load books on page load
document.addEventListener("DOMContentLoaded", function () {
    fetchData();
    updateCartButton();
});
