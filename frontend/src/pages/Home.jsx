import { Link } from "@mui/material";
import React from "react";
import { Button, Footer, Navbar } from "react-bulma-components";
import { NavLink } from "react-router-dom";
import ProductList from "../components/ProductList";
import Header from "../components/snippets/Header";
// import Footer from "../components/snippets/Footer";

function Home() {
  return (
    <div>
      <ProductList />
    </div>
  );
}

export default Home;
