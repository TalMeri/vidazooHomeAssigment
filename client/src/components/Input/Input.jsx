import "./Input.css";
import React from "react";

const Input = ({ placeholder, onChange, classAsProp }) => {
  return (
    <input
      className={`textField ${classAsProp}`}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
};

export default Input;
