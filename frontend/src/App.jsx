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
import 'bootstrap/dist/css/bootstrap.min.css';


// другая реализация в index router tutorial.jsx (без App.jsx)
function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>

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
