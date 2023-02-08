import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../../store/actions/auth";

const Activate = ({ verify, match }) => {
  const [verified, setVerified] = useState(false);

  const verify_account = (e) => {
    const uid = match.params.uid;
    const token = match.params.token;

    verify(uid, token);
    setVerified(true);
  };

  // Is the user authenticated?
  // Redirect the, to the home page
  if (verified) {
    // Redirect - это теперь Navigate
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex h-screen bg-black">
      <div className="m-auto text-white mx-auto placeholder-opacity-100 w-1/3">
        <h1 className="text-center text-2xl mb-4">Verify your Account:</h1>
        <button onclick={verify_account}>Verify</button>
      </div>
    </div>
  );
};

export default connect(null, { verify })(Activate);
