import React from "react";
import { Loader } from "semantic-ui-react";

const MyLoader = () => {
  return (
    <div className="flex justify-center mt-7">
      <Loader active inline content="Loading" />
    </div>
  );
};

export default MyLoader;
