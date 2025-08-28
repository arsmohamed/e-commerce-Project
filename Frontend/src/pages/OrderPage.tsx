import "./OrderPage.css";
import type { OrderItem as ImportedOrderItem } from "./MainPage";

type OrderItem = ImportedOrderItem & {
  imgSrc: string;
  price: number;
};

type OrdersPageProps = {
  order: OrderItem[];
};

const OrdersPage = ({ order }: OrdersPageProps) => {
  const subtotal = order.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = order.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="orders-page-style">
      <h2>Your Cart</h2>

      {order.length === 0 ? (
        <>
          <p>item(s)</p>
          <p>Your Cart is empty. Add items to begin.</p>
        </>
      ) : (
        order.map((item) => (
          <div data-aos="fade-left" key={item.sku} className="order-item-row">
            <img
              src={item.imgSrc}
              alt={item.name}
              className="Order-item-img-container"
            />
            <div className="order-item-details">
              <p className="order-item-name">Name: {item.name}</p>
              <p className="order-item-quantity">Qty: {item.quantity}</p>
              <p className="order-item-price">
                Price: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))
      )}

      <hr className="divider" />

      {/* Total items row */}
      {order.length > 0 && (
        <div className="subtotal-row">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>
      )}

      {/* Subtotal row */}
      {order.length > 0 && (
        <div className="subtotal-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      )}

      <button className="place-order-btn">Place Demo Order</button>
    </div>
  );
};

export default OrdersPage;
