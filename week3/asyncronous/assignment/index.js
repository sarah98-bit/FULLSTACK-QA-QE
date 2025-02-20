let books = [];
let cart = [];

async function fetchData() {
    try {
        const response = await fetch("http://localhost:3000/books"); // Replace with actual API URL
        books = await response.json();
        books = books.map((book, index) => ({
            ...book,
            id: index, // Ensure unique ID
            price: (Math.random() * 30 + 5).toFixed(2), // Assign random price between $5-$35
        }));
        populateGenreDropdown();
        displayBooks(books);
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

// 📚 Display books
function displayBooks(bookList) {
    const bookContainer = document.getElementById("bookList");
    bookContainer.innerHTML = "";

    if (bookList.length === 0) {
        bookContainer.innerHTML = "<p>No books found.</p>";
        return;
    }

    bookList.forEach(book => {
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
            <button class="add-to-cart" onclick="addToCart(${book.id})">🛒 Add to Cart</button>
        `;

        bookContainer.appendChild(bookElement);

        if (book.year < 1900) {
            showModal(`${book.title} is a classic!`);
        }
    });
}

// 🔽 Populate genre dropdown
function populateGenreDropdown() {
    const genreDropdown = document.getElementById("searchGenre");
    const uniqueGenres = [...new Set(books.map(book => book.genre))];

    genreDropdown.innerHTML = `<option value="">All Genres</option>`;
    uniqueGenres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreDropdown.appendChild(option);
    });
}

// 🎯 Apply filters
function applyFilters() {
    const genre = document.getElementById("searchGenre").value;
    const minYear = document.getElementById("searchYear").value;
    const minPages = document.getElementById("searchPages").value;

    let filteredBooks = books;

    if (genre) filteredBooks = filteredBooks.filter(book => book.genre === genre);
    if (minYear) filteredBooks = filteredBooks.filter(book => book.year >= minYear);
    if (minPages) filteredBooks = filteredBooks.filter(book => book.pages >= minPages);

    displayBooks(filteredBooks);
}

// ↕ Sort books
function sortBooks() {
    const sortBy = document.getElementById("sortBy").value;
    const order = document.getElementById("order").value;

    let sortedBooks = [...books];

    sortedBooks.sort((a, b) => {
        if (order === "asc") return a[sortBy] - b[sortBy];
        return b[sortBy] - a[sortBy];
    });

    displayBooks(sortedBooks);
}

// 🛒 Add to cart
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (!cart.some(item => item.id === bookId)) {
        cart.push(book);
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
}


// 🛍️ Update cart button (count)
function updateCartButton() {
    const cartButton = document.getElementById("cartButton");
    cartButton.textContent = `🛒 Cart (${cart.length})`;
}

// 📦 Toggle cart display
function toggleCart() {
    const cartContainer = document.getElementById("cartList");
    cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
    updateCartDisplay();
}

// 🎯 Update cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById("cartList");
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Cart is empty.</p>";
        return;
    }

    let total = 0;
    cart.forEach((book, index) => {
        total += parseFloat(book.price);

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <p>${book.title} - $${book.price}</p>
            <button class="remove-from-cart" onclick="removeFromCart(${index})">❌ Remove</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    const totalElement = document.createElement("p");
    totalElement.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartContainer.appendChild(totalElement);

    const buyButton = document.createElement("button");
    buyButton.classList.add("buy-button");
    buyButton.textContent = "💳 Buy Books";
    buyButton.onclick = buyBooks;
    cartContainer.appendChild(buyButton);
}

// ❌ Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartButton();
    updateCartDisplay();
}

// 💳 Buy books
function buyBooks() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = cart.reduce((sum, book) => sum + parseFloat(book.price), 0);
    alert(`Thank you for your purchase! You have spent $${total.toFixed(2)}.`);

    cart = []; // Clear cart after purchase
    updateCartButton();
    updateCartDisplay();
}

// 📜 Show modal
function showModal(message) {
    const modal = document.getElementById("modal");
    document.getElementById("modalMessage").textContent = message;
    modal.style.display = "block";
}

// ❌ Close modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// 🚀 Load books on page load
fetchData();
