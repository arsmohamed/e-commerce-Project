import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import OrderPage from "./pages/OrderPage";
import Navbar from "./Components/Navbar";
import MainPage from "./pages/MainPage";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "/graphql",
  }),
  cache: new InMemoryCache(),
});

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      easing: "ease-in-out", // easing function
      once: true, // whether animation should happen only once while scrolling down
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar /> {/* ✅ Inside Router */}
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<MainPage />} />
          {/* <Route path="/orders" element={<OrderPage />} /> */}
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
