import "./SearchBar.css";
import React, { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";


const SearchBar = ({ onChange, onClick, label }) => {
  const [searchedText, setSerchedText] = useState("");

  const onTextChanged = (e) => {
    setSerchedText(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="searchBarContainer">
      <Input
        placeholder={"Enter domain name (e.g msn.com)"}
        onChange={onTextChanged}
        classAsProp={"big"}
      />
      <Button label={label} onClick={onClick} disabled={!searchedText} />
    </div>
  );
};

export default SearchBar;
