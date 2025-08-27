// src/pages/Orders.tsx
import { useState } from "react";
import { mockProducts, mockOrder } from "../mocks/data";

const OrdersPage = () => {
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
    <>
      <p>testing</p>
    </>
  );
};
export default OrdersPage;
