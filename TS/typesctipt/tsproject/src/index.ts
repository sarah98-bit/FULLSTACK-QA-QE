import { products } from "./products";
import { addToCart } from "./cart";

// Define the product type to ensure type safety
interface Product {
    id: number;
    name: string;
    price: number;
}

// Ensure `products` is correctly typed
const productList = document.getElementById("product-list");

if (productList) {
    products.forEach((product: Product) => {
        const item = document.createElement("div");
        item.className = "product";
        item.innerHTML = `
        <h2>${product.name}</h2>
        <p>Price: $${product.price.toFixed(2)}</p>
        <button data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(item);
    });
} else {
    console.error("Product list element not found!");
}

// Event listener for add to cart button
document.addEventListener("click", (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.matches("button[data-id]")) {
        const productId = Number(target.dataset.id);
        if (!isNaN(productId)) {
            addToCart(productId);
        } else {
            console.error("Invalid product ID:", target.dataset.id);
        }
    }
});
