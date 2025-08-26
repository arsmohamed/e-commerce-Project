// src/pages/Orders.tsx
import { useState } from "react";
import { mockProducts, mockOrder } from "../mocks/data";

export default function OrdersPage() {
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [order, setOrder] = useState<typeof mockOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQtyChange = (id: string, qty: number) => {
    setCart((prev) => ({ ...prev, [id]: qty }));
  };

  const createOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      // optimistic UI: show mock order
      setOrder(mockOrder);

      // simulate API delay
      await new Promise((res) => setTimeout(res, 1200));

      // rollback example: simulate random error
      if (Math.random() < 0.2) throw new Error("Network Error");

      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setOrder(null);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockProducts.map((p) => {
          const available = p.inventory.onHand - p.inventory.reserved;
          return (
            <div
              key={p.id}
              className="border rounded-2xl p-4 shadow-sm space-y-2 bg-white"
            >
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-gray-500">${p.price.toFixed(2)}</p>
              <p className="text-sm text-gray-400">Available: {available}</p>
              <input
                type="number"
                min={0}
                max={available}
                value={cart[p.id] || ""}
                onChange={(e) =>
                  handleQtyChange(p.id, parseInt(e.target.value) || 0)
                }
                className="w-full border rounded-lg p-2"
                disabled={loading}
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={createOrder}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Placing order..." : "Create Order"}
      </button>

      {error && (
        <p className="text-red-500 font-medium">❌ {error} (rolled back)</p>
      )}

      {/* Order Details */}
      {order && (
        <div className="border p-4 rounded-xl bg-gray-50 space-y-3">
          <h2 className="font-semibold text-lg">Order Details</h2>
          <p>
            Status: <span className="font-bold">{order.status}</span>
          </p>
          <p>Total: ${order.total.toFixed(2)}</p>
          <p>
            Customer: {order.customer.name} ({order.customer.email})
          </p>
          <ul className="list-disc ml-6">
            {order.items.map((it, i) => (
              <li key={i}>
                {it.qty} × {it.product.name} (${it.priceAtPurchase})
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            {["CONFIRMED", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED"].map(
              (s) => (
                <button
                  key={s}
                  onClick={() => setOrder({ ...order, status: s })}
                  className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-200"
                >
                  {s}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
