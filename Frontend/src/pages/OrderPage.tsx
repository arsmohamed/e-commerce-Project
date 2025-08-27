import "./OrderPage.css";

const OrdersPage = () => {
  return (
    <div className="orders-page">
      <h2>Your Cart</h2>
      <p>item(s)</p>
      <p>Your Cart is empty. Add items to begin.</p>
      <hr className="divider" />
      <div className="subtotal-row">
        <span>Subtotal</span>
        <span>$0.00</span>
      </div>

      <button className="place-order-btn">Place Demo Order</button>
    </div>
  );
};

export default OrdersPage;
