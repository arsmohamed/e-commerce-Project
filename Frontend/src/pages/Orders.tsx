// src/pages/Orders.tsx
import Product from "../Components/product";
import "./orders.css";
import NotHere from "../assets/NotHere.png";
import { gql, useQuery } from "@apollo/client";

const Products = gql`
  query GetProducts {
    products {
      name
      sku
      price
      image {
        formats
      }
      inventory {
        onHand
        reserved
      }
    }
  }
`;

const OrdersPage = () => {
  const { loading, error, data } = useQuery(Products);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data.products[0].image.url);

  return (
    <div className="orders-page">
      {data.products.map((item: any, index: number) => {
        const { name, sku, price, image } = item; // no `.attributes`
        // pick one format (e.g. thumbnail or medium)
        const imgUrl = image?.formats?.thumbnail?.url
          ? `http://localhost:1337${image.formats.thumbnail.url}`
          : NotHere; // fallback if no image

        return (
          <Product
            key={index}
            imgSrc={imgUrl} // you can swap this with item.image.formats?.thumbnail?.url if available
            name={name}
            price={`$${price}`}
            sku={sku}
          />
        );
      })}
    </div>
  );
};

export default OrdersPage;
