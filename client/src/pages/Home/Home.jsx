import "./Home.css"
import React from "react";
import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Results from "../../components/Results/Results";
import axios from "axios";
import { Spinner } from "react-bootstrap";


const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [domain, setDomain] = useState(null);
  const [parsedTime, setParsedTime] = useState(null);
  const [results, setResults] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const handleSearch = async (searchVal) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setResults([]);

      const res = await axios.get(`/parser/getCount`, {
        params: { adsTxtUrl: searchVal },
      });

      setResults(res.data.Results);
      setDomain(res.data.Domain);
      setParsedTime(res.data.ParseTime);
      setIsLoading(false);

    } catch (error) {
      console.log(error.response);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sortedData = [...results].sort((a, b) => {
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setResults(sortedData);
    }
  };

  return (
    <div className="homeContainer">
      <h1 className="homeTitle">ADS.TXT CRAWLER</h1>
      <SearchBar
        label={isloading ? "LOADING.." : "PARSE ADS.TXT"}
        onClick={() => {
          handleSearch(searchValue);
        }}
        onChange={(val) => {
          setSearchValue(val);
        }}
      />
      {isloading ? (
        <div className="loadingContainer">
          <Spinner 
            animation="border"
            variant="success"
            style = {{ width:"4rem", height:"4rem"}}
          />
        </div>
      ) : (
        <Results
          results={results}
          isError={isError}
          handleSorting={handleSorting}
          domain={domain}
          parsedTime={parsedTime}
        />
      )}
    </div>
  );
};

export default Home;
