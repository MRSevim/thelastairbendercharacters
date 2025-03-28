import React from "react";
import spinner from "/spinner.gif";

const Spinner = () => {
  return (
    <img
      src={spinner}
      style={{ width: "100px", margin: "auto", display: "block" }}
      alt="Loading Spinner"
    />
  );
};

export default Spinner;
