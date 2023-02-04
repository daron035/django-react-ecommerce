import React from "react";
import { Button, Navbar } from "react-bulma-components";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

const Header = () => {
  return (
    <div>
      <Navbar color={"dark"}>
        <Navbar.Brand>
          <Navbar.Item>
            <Link to={"/"}>
              <strong className="text-white">HOME</strong>
            </Link>
          </Navbar.Item>
        </Navbar.Brand>

        <Navbar.Menu>
          <Navbar.Item>search</Navbar.Item>
        </Navbar.Menu>

        <Navbar.Container align="right" className="m-2">
          <Navbar.Item>CONTACT</Navbar.Item>
          <Navbar.Item>CART</Navbar.Item>
        </Navbar.Container>
      </Navbar>
    </div>
  );
};

export default Header;
