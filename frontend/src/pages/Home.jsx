import { Link } from "@mui/material";
import React from "react";
import { Button, Footer, Navbar } from "react-bulma-components";
import { NavLink } from "react-router-dom";
import Header from "../components/snippets/Header";
// import Footer from "../components/snippets/Footer";

function Home() {
  return (
    // <div className="bg-white">
    <div class="container hero is-fullheight">
      <header class="has-text-centered">
        <h1>My Store</h1>
      </header>

      <div>
        <h2>Dashboard Title</h2>
      </div>

      <footer class="has-text-centered is-flex-align-items-flex-end mt-auto">
        <small>
          <span>Copyright @2023</span>
          <br />
        </small>
        <a href="/">About</a>
      </footer>
    </div>
  );
}

export default Home;
