// import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./hocs/Layout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ResetPassword from "./pages/auth/ResetPassword";
import ResetPasswordConfirm from "./pages/auth/ResetPasswordConfirm";
import Activate from "./pages/auth/Activate";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import OrderSummary from "./components/OrderSummary";
import ProductList from "./components/ProductList";
// import Checkout from "./components/Checkout";
import ProductDetail from "./components/ProductDetail";
import CheckoutForm from "./components/Checkout";
// import Checkout from "./components/Checkout";
// import MyCheckout from "./components/Checkout";

// другая реализация в index router tutorial.jsx (без App.jsx)
function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<ProductList />}></Route>
            <Route
              path="/products/:productID"
              element={<ProductDetail />}
            ></Route>
            <Route path="/order-summary" element={<OrderSummary />}></Route>
            <Route path="/checkout" element={<CheckoutForm />}></Route>
          </Route>
          {/* <Route path="/order-summary" element={<OrderSummary />}></Route> */}

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/activate" element={<Activate />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/password/reset/confirm/uid/token"
            element={<ResetPasswordConfirm />}
          />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
