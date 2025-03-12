const user = {
  id: "USER-123456",
  name: {
    first: "Alice",
    last: "Liddell",
  },
  email: "alice@example.com",
  address: {
    shipping: {
      street: "123 Rabbit Hole",
      city: "Wonderland",
      state: "Fantasy",
      postalCode: "12345",
      country: "WL",
    },
    billing: {
      street: "456 Mad Hatter Lane",
      city: "Tea Party",
      state: "Fantasy",
      postalCode: "67890",
      country: "WL",
    },
  },
  payment: {
    total: "100.00",
    currency: "USD",
    details: {
      subtotal: "75.00",
      tax: "15.00",
      shipping: "10.00",
    },
    transactions: [
      {
        id: "TXN-123",
        amount: "50.00",
        description: "Magic Potion",
      },
      { id: "TXN-456", amount: "50.00", description: "Enchanted Sword" },
    ],
  },
};

const {
  name: { first, last },
  email,
  address: {
    shipping: {
      street: shippingStreet,
      city: shippingCity,
      state: shippingState,
      postalCode: shippingPostalCode,
      country: shippingCountry,
    },
    billing: {
      street: billingStreet,
      city: billingCity,
      state: billingState,
      postalCode: billingPostalCode,
      country: billingCountry,
    },
  },
  payment: {
    total,
    currency,
    details: { subtotal, tax, shipping },
    transactions,
  },
} = user;

const userInfoContainer = document.getElementById("personal-info");
//Using template literals
const userInfoHTML = `
  <h2>${user.name.first} ${user.name.last}</h2>
  <p>Email: ${user.email}</p>
  <h3>Shipping Address</h3>
  <p>${user.address.shipping.street}</p>
  <p>${user.address.shipping.city}, ${user.address.shipping.state} ${
  user.address.shipping.postalCode
}</p>
  <p>${user.address.shipping.country}</p>
  <h3>Billing Address</h3>
  <p>${user.address.billing.street}</p>
  <p>${user.address.billing.city}, ${user.address.billing.state} ${
  user.address.billing.postalCode
}</p>
  <p>${user.address.billing.country}</p>
  <h3>Payment Details</h3>
  <p>Total: ${user.payment.total} ${user.payment.currency}</p>
  <p>Subtotal: ${user.payment.details.subtotal}</p>
  <p>Tax: ${user.payment.details.tax}</p>
  <p>Shipping: ${user.payment.details.shipping}</p>
  <h3>Transactions</h3>
  <ul>
    ${user.payment.transactions
      .map(
        (transaction) => `
      <li><p>ID: ${transaction.id}</p>
        <p>Amount: ${transaction.amount}</p>
        <p>Description: ${transaction.description}</p>
      </li>
    `
      )
      .join("")}
  </ul>
`;

userInfoContainer.innerHTML = userInfoHTML;
