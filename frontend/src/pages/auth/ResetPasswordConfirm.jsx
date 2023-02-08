import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import TweetButton from "../../UI/button";
import { connect } from "react-redux";
import { reset_password_confirm } from "../../store/actions/auth";

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const uid = match.params.uid;
    const token = match.params.token;

    reset_password_confirm(uid, token, new_password, re_new_password);
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
              <span className="text-white ml-1">New Password</span>
              <input
                type="password"
                className="mt-1 block w-full h-[34px] items-center px-3 text-black rounded-md"
                placeholder=""
                name="new_password"
                value={new_password}
                onChange={(e) => onChange(e)}
                minLength="6"
                required
              />
            </label>
            <label className="block">
              <span className="text-white ml-1">Confirm New Password</span>
              <input
                type="password"
                className="mt-1 block w-full h-[34px] items-center px-3 text-black rounded-md"
                placeholder=""
                name="re_new_password"
                value={re_new_password}
                onChange={(e) => onChange(e)}
                minLength="6"
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

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
