import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import OrderPage from "./pages/OrderPage";
import Navbar from "./Components/Navbar";
import MainPage from "./pages/MainPage";
import "aos/dist/aos.css";
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
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar /> {/* ✅ Inside Router */}
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<MainPage />} />
          <Route path="/orders" element={<OrderPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
