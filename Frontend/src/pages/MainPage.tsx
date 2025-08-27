import { gql, useQuery } from "@apollo/client";
import Product from "../Components/product";
import NotHere from "../assets/NotHere.png";
import { useState } from "react";
import "./MainPage.css";

const Products = gql`
  query GetProducts {
    products {
      name
      sku
      price
      image {
        url
      }
      inventory {
        onHand
        reserved
      }
    }
  }
`;
type OrderItem = {
  sku: string;
  name: string;
  quantity: number;
};

const MainPage = () => {
  const { loading, error, data } = useQuery(Products);
  const [order, setOrder] = useState<OrderItem[]>([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Handle when a product is added to order
  const handleAddToOrder = (sku: string, name: string, quantity: number) => {
    if (quantity <= 0) return; // ignore 0 qty

    setOrder((prevOrder) => {
      const existing = prevOrder.find((item) => item.sku === sku);
      if (existing) {
        // update quantity if already in order
        return prevOrder.map((item) =>
          item.sku === sku
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // add new product to order
        return [...prevOrder, { sku, name, quantity }];
      }
    });
  };

  console.log("Current Order:", order);

  return (
    <div className="orders-page">
      {data.products.map((item: any, index: number) => {
        const { name, sku, price, image } = item;

        // build full URL (Strapi only gives relative URL)
        const imgUrl = image?.url
          ? `http://localhost:1337${image.url}`
          : NotHere;

        return (
          <Product
            key={index}
            imgSrc={imgUrl}
            name={name}
            price={`$${price}`}
            sku={sku}
            onOrder={handleAddToOrder}
          />
        );
      })}
      <div className="order-summary">
        <h2>Current Order</h2>
        {order.length === 0 && <p>No products yet.</p>}
        <ul>
          {order.map((item) => (
            <li key={item.sku}>
              {item.name} - {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainPage;
