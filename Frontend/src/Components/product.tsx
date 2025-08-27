import { useState } from "react";
import "./product.css";

type ProductProps = {
  imgSrc: any;
  name: string;
  price: string;
  sku: string;
};

const Product = ({ imgSrc, name, price, sku }: ProductProps) => {
  // state for quantity
  const [quantity, setQuantity] = useState<number>(0);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="product-card">
      <img src={imgSrc} alt={name} className="product-image" />
      <div className="product-container">
        <div className="product-info">
          <p className="product-details">{name}</p>
          <p className="product-details">{price}</p>
        </div>
        <p className="product-sku">SKU: {sku}</p>
      </div>

      <div className="Order-Container">
        <div className="product-quantity">
          <button className="qty-btn" onClick={handleDecrease}>
            -
          </button>
          <p className="qty-input">{quantity}</p>
          <button className="qty-btn" onClick={handleIncrease}>
            +
          </button>
        </div>

        <button className="product-order-btn">Order</button>
      </div>
    </div>
  );
};

export default Product;
