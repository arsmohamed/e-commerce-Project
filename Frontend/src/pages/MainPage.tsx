// src/pages/Orders.tsx
import Product from "../Components/product";
import "./MainPage.css";
import NotHere from "../assets/NotHere.png";
import { gql, useQuery } from "@apollo/client";

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

const MainPage = () => {
  const { loading, error, data } = useQuery(Products);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
          />
        );
      })}
    </div>
  );
};

export default MainPage;
