import React, { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./SearchBar.css";

const SearchBar = ({ onChange, onClick, label }) => {
  const [searchedText, setSerchedText] = useState("");

  const onTextChanged = (e) => {
    setSerchedText(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="searchBarContianer">
      <Input
        placeholder={"Enter domain name (e.g msn.com)"}
        className={"shadow-sm w-50"}
        onChange={onTextChanged}
        width="350px"
      />
      <Button label={label} onClick={onClick} disabled={!searchedText} />
    </div>
  );
};

export default SearchBar;
