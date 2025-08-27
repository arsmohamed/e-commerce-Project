// src/pages/Orders.tsx
import Product from "../Components/product";
import "./orders.css"; // new CSS file
import Dell from "../assets/Dell.png";

const OrdersPage = () => {
  return (
    <div className="orders-page">
      <Product
        imgSrc={Dell}
        title="Cool Sneakers"
        price="$89.99"
        sku="SNKR-001"
      />
    </div>
  );
};

export default OrdersPage;
