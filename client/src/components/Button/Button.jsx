import "./Button.css";
import React from "react";

const Button = ({ label, disabled, onClick }) => {
  return (
    <button className="button" disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
