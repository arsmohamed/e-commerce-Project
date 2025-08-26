import { useState } from "react";
import "./App.css";
import product from "./Components/products";
import OrdersPage from "./pages/Orders";
function App() {
  return <>{OrdersPage()}</>;
}

export default App;
