import React, { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from "../store/actions/auth";
import { fetchCart } from "../store/actions/cart";

const Layout = ({ checkAuthenticated, load_user, children, fetchCart }) => {
  useEffect(() => {
    checkAuthenticated();
    load_user();
    fetchCart();
  }, []);
  return <div>{children}</div>;
};

export default connect(null, { checkAuthenticated, load_user, fetchCart })(
  Layout
);
