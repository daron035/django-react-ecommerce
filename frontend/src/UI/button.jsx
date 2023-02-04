import React from "react";

const TweetButton = ({ children, ...props }) => {
  return (
    <button
      className="text-white font-bold text-lg ml-auto w-56 bg-[#4A99E9]
      rounded-full py-2.5 hover:bg-[#428AD2] duration-200 shadow-md"
      {...props}
    >
      {children}
    </button>
  );
};

export default TweetButton;
