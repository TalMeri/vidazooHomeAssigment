import React from "react";
import "./Error.css";

const Error = ({ label }) => {
  return (
    <div className="errorContainer">
      <span className="errorText">{label}</span>
    </div>
  );
};

export default Error;
