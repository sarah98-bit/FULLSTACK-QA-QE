const user = {
    id: "USER-123456",
    name: {
    first: "Alice",
    last: "Liddell"
    },
    email: "alice@example.com",
    address: {
    shipping: {
    street: "123 Rabbit Hole",
    city: "Wonderland",
    state: "Fantasy",
    postalCode: "12345",
    country: "WL"
    },
    billing: {
    street: "456 Mad Hatter Lane",
    city: "Tea Party",
    state: "Fantasy",
    postalCode: "67890",
    country: "WL"
    }
    },
    payment: {
    total: "100.00",
    currency: "USD",
    details: {
    subtotal: "75.00",
    tax: "15.00",
    shipping: "10.00"
    },
    transactions: [
    { id: "TXN-123", amount: "50.00", description: "Magic Potion"
    },
    { id: "TXN-456", amount: "50.00", description: "Enchanted Sword" }
    ]
    }
    };
    