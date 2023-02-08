import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import TweetButton from "../../UI/button";
import { connect } from "react-redux";
import { reset_password } from "../../store/actions/auth";

const ResetPassword = ({ reset_password }) => {
  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    reset_password(email);
    setRequestSent(true);
  };

  if (requestSent) {
    // Redirect - это теперь Navigate
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex h-screen bg-black">
      <div className="m-auto text-white mx-auto placeholder-opacity-100 w-1/3">
        <h1 className="text-center text-2xl mb-4">Reset Password</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="grid grid-cols-1 gap-2">
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
            <div className="pt-4 flex justify-center">
              <div className="bg-[#4A99E9] rounded-full">
                <TweetButton type="submit">Reset</TweetButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);
