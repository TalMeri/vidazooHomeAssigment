import "./Input.css";
import React from "react";

const Input = ({ placeholder, onChange, width }) => {
  return (
    <input
      className="textField"
      style={{ width }}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
};

export default Input;
