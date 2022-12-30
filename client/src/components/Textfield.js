import React from "react";
import {InputGroup, Form} from 'react-bootstrap';

const Textfield = ({placeholder, onChange, className, size}) => {
  return (
    <InputGroup className={className} size={size} style={{marginRight:"20px"}}>
    <Form.Control placeholder={placeholder}  className={className} onChange={onChange} />  
</InputGroup>
  );
};

export default Textfield;
