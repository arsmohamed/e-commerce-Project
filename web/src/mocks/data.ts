// src/mocks/data.ts

export const mockProducts = [
  {
    id: "p1",
    name: "Wireless Mouse",
    sku: "WM-001",
    price: 25.5,
    inventory: { onHand: 20, reserved: 5 },
    active: true,
  },
  {
    id: "p2",
    name: "Mechanical Keyboard",
    sku: "KB-002",
    price: 70,
    inventory: { onHand: 15, reserved: 2 },
    active: true,
  },
  {
    id: "p3",
    name: "Noise Cancelling Headphones",
    sku: "HP-003",
    price: 120,
    inventory: { onHand: 10, reserved: 0 },
    active: true,
  },
];

export const mockOrder = {
  id: "o1",
  status: "PENDING",
  total: 145.5,
  customer: {
    name: "John Doe",
    email: "john@example.com",
  },
  items: [
    {
      qty: 1,
      priceAtPurchase: 70,
      product: { name: "Mechanical Keyboard", sku: "KB-002" },
    },
    {
      qty: 3,
      priceAtPurchase: 25.5,
      product: { name: "Wireless Mouse", sku: "WM-001" },
    },
  ],
};
