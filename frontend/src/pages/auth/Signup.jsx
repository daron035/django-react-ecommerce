import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import TweetButton from "../../UI/button";
import { connect } from "react-redux";
import { signup } from "../../store/actions/auth";

const Signup = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    re_password: "",
  });

  const { email, username, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      signup(email, username, password, re_password);
      setAccountCreated(true);
    }
  };

  // Is the user authenticated?
  // Redirect the, to the home page
  if (isAuthenticated) {
    // Redirect - это теперь Navigate
    return <Navigate to="/home" />;
  }
  if (accountCreated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-black">
      <div className="m-auto text-white mx-auto placeholder-opacity-100 w-1/3">
        <h1 className="text-center text-2xl mb-4">Sign Up</h1>
        {/* <p className="text-center">Sign into your Account</p> */}
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="grid grid-cols-1 gap-2">
            <label className="block">
              <span className="text-white ml-1">Username</span>
              <input
                type="text"
                className="mt-1 block w-full h-[34px] items-center px-3 text-black rounded-md"
                placeholder=""
                name="username"
                onChange={(e) => onChange(e)}
                required
              />
            </label>
            <label className="block">
              <span className="text-white ml-1">Email</span>
              <input
                type="email"
                className="mt-1 block w-full h-[34px] items-center px-3 text-black rounded-md"
                placeholder=""
                name="email"
                onChange={(e) => onChange(e)}
                required
              />
            </label>
            <label className="block">
              <span className="text-white ml-1">Password</span>
              <input
                type="password"
                className="mt-1 block w-full h-[34px] items-center px-3 text-black rounded-md"
                placeholder=""
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                minLength="6"
                required
              />
            </label>
            <label className="block">
              <span className="text-white ml-1">Confirm Password</span>
              <input
                type="password"
                className="mt-1 block w-full h-[34px] items-center px-3 text-black rounded-md"
                placeholder=""
                name="re_password"
                value={re_password}
                onChange={(e) => onChange(e)}
                minLength="6"
                required
              />
            </label>
            <div className="pt-4 flex justify-center">
              <div className="bg-[#4A99E9] rounded-full">
                <TweetButton type="submit">Register</TweetButton>
              </div>
            </div>
          </div>
        </form>
        <p className="mt-3">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-sky-600">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
