import { useState } from "react";
import "./OrderContainer.css";

type OrderContainerProps = {
  imgSrc: any;
  name: string;
  price: string;
  sku: string;
  onOrder: (sku: string, name: string, quantity: number) => void;
};

const OrderContainer = ({
  imgSrc,
  name,
  price,
  sku,
  onOrder,
}: OrderContainerProps) => {
  // state for quantity
  const [quantity, setQuantity] = useState<number>(0);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  const handleOrder = () => {
    onOrder(sku, name, quantity);
    setQuantity(0); // reset after adding
  };

  return (
    <div className="OrderContainer-card">
      <img src={imgSrc} alt={name} className="OrderContainer-image" />
      <div className="OrderContainer-container">
        <div className="OrderContainer-info">
          <p className="OrderContainer-details">{name}</p>
          <p className="OrderContainer-details">{price}</p>
        </div>
        <p className="OrderContainer-sku">SKU: {sku}</p>
      </div>

      <div className="Order-Container">
        <div className="OrderContainer-quantity">
          <button className="qty-btn" onClick={handleDecrease}>
            -
          </button>
          <p className="qty-input">{quantity}</p>
          <button className="qty-btn" onClick={handleIncrease}>
            +
          </button>
        </div>

        <button className="OrderContainer-order-btn" onClick={handleOrder}>
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderContainer;
