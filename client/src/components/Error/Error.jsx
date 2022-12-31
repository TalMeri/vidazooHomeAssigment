import React from "react";
import "./Error.css";

const Error = ({ label }) => {
  return (
    <div className="errorContianer">
      <span className="errorText">{label}</span>
    </div>
  );
};

export default Error;
