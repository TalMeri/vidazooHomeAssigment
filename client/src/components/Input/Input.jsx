import React from "react";
import "./Input.css";
import { InputGroup, Form } from 'react-bootstrap';

const Input = ({ placeholder, onChange, width }) => {
  return (
    <input className="textField" style={{ width }} placeholder={placeholder} onChange={onChange}></input>
    // <InputGroup className={className} size={size} style={{ marginRight: "20px" }}>
    //   <Form.Control placeholder={placeholder} className={className} onChange={onChange} />
    // </InputGroup>
  );
};

export default Input;
