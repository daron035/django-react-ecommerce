import React from "react";
import ProductList from "../components/ProductList";
import MyHeader from "../components/snippets/Header";

function Home() {
  return (
    <div>
      <MyHeader />
      <ProductList />
    </div>
  );
}

export default Home;
