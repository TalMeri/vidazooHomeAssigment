import React from "react";
import Button from "./Button";
import Textfield from "./Textfield";

const SearchBar = ({onChange, onClick, label}) => {
    return (
    <div style={{display:"flex", textAlign:"center", justifyContent:"center", alignItems:"center"}}>
        <Textfield placeholder={"Enter domain name (e.g msn.com)"} className={"w-50"} onChange={onChange}/>
        <Button label={label} onClick={onClick} /> 
    </div> );
};

export default SearchBar;
