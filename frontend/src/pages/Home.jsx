import React from "react";
import { Outlet } from "react-router-dom";
import ProductList from "../components/ProductList";
import MyHeader from "../components/snippets/Header";

function Home() {
  return (
    <div>
      <MyHeader />

      <Outlet />
    </div>
  );
}

export default Home;
