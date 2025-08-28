import { gql, useQuery } from "@apollo/client";
import Product from "../Components/product";
import NotHere from "../assets/NotHere.png";
import OrdersPage from "./OrderPage";
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
export type OrderItem = {
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
  const handleAddToOrder = (
    sku: string,
    name: string,
    quantity: number,
    price: number,
    imgSrc: string
  ) => {
    if (quantity <= 0) return; // ignore 0 qty

    setOrder((prev) => {
      const existing = prev.find((item) => item.sku === sku);
      if (existing) {
        return prev.map((item) =>
          item.sku === sku
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { sku, name, quantity, price, imgSrc }];
      }
    });
  };

  console.log("Current Order:", order);
  const ItemsContainer = (
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
            onOrder={(sku, name, quantity) =>
              handleAddToOrder(sku, name, quantity, price, imgUrl)
            }
          />
        );
      })}
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
      {ItemsContainer}
      <OrdersPage order={order} />
    </div>
  );
};

export default MainPage;
