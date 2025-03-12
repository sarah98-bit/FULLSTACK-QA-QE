"use strict";
// Load cart on page load
document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});
// Load cart items and update total price
function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartContainer = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");
    const buyButton = document.getElementById("buyButton");
    cartContainer.innerHTML = "";
    let total = 0;
    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceElement.innerHTML = "<strong>Total: $0.00</strong>";
        buyButton.disabled = true; // Disable buy button when cart is empty
        return;
    }
    buyButton.disabled = false; // Enable buy button when cart has items
    cartItems.forEach((book) => {
        total += parseFloat(book.price);
        const bookElement = document.createElement("div");
        bookElement.classList.add("cart-item");
        bookElement.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="cart-image">
            <div class="cart-details">
                <h3>${book.title}</h3>
                <p>By ${book.author}</p>
                <p>Genre: ${book.genre}</p>
                <p>Pages: ${book.pages}</p>
                <p>Year: ${book.year}</p>
                <p><strong>Price: $${book.price}</strong></p>
                <button class="remove-from-cart" onclick="removeFromCart(${book.id})">❌ Remove</button>
            </div>
        `;
        cartContainer.appendChild(bookElement);
    });
    totalPriceElement.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}
// Remove an item from the cart
function removeFromCart(bookId) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = cart.filter(book => book.id !== bookId); // Remove book by ID
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
// Buy all books in the cart
function buyBooks() {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    let total = cart.reduce((sum, book) => sum + parseFloat(book.price), 0);
    alert(`🎉 Thank you for your purchase! You have spent $${total.toFixed(2)}.`);
    localStorage.removeItem("cart"); // Clear the cart after purchase
    loadCart();
}
//# sourceMappingURL=cart.js.map