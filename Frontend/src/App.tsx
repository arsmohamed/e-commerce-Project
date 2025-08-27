import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import MainPage from "./pages/MainPage";
import Navbar from "./Components/Navbar";
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
      <Navbar />
      <MainPage />
    </ApolloProvider>
  );
}

export default App;
