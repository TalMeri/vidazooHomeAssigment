import React from "react";
import "./Button.css";
// import { Button as BootstrapButton } from 'react-bootstrap';

const Button = ({ label, color, disabled, size, variant, onClick }) => {
  // return (
  //   <BootstrapButton
  //     color={color}
  //     disabled={disabled}
  //     size={size}
  //     variant={variant}
  //     onClick={onClick}>
  //     {label}</BootstrapButton>
  // );
  return (
    <button className="button"
      // color={color}
      disabled={disabled}
      // size={size}
      // variant={variant}
      onClick={onClick}>
      {label}</button>
  );
};

export default Button;
