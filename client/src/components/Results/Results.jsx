import "./Results.css";
import React from "react";
import { useState } from "react";
import ResultsBar from "../ResultsBar/ResultsBar";
import { ArrowUpCircleFill, ArrowDownCircleFill } from "react-bootstrap-icons";
import Error from "../Error/Error";

const Results = ({ results, handleSorting, isError, domain, parsedTime }) => {
  const [searchVal, setSearchVal] = useState("");
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (label) => {
    let sortOrder = "";
    if (label === sortField && order === "asc") {
      sortOrder = "desc";
    } else {
      sortOrder = "asc";
    }
    setSortField(label);
    setOrder(sortOrder);
    handleSorting(label, sortOrder);
  };

  const handleSearch = (row) => {
    if (row !== "undifended") {
      if (searchVal === "") return true;
      else {
        const searchValUpper = searchVal.toUpperCase();
        const domainRowUpper = row.Domain.toUpperCase();
        if (domainRowUpper.startsWith(searchValUpper)) return true;
      }
    }
    return false;
  };

  const getArrow = (field) => {
    return sortField === field && order === "asc" ? (
      <ArrowUpCircleFill className="arrowSort"/>
    ) : sortField === field && order === "desc" ? (
      <ArrowDownCircleFill className="arrowSort" />
    ) : (
      <></>
    );
  };

  return (
    <>
      {isError ? (
        <div className="errorContainer"><Error label={"Failed to parse Ads.txt"}/></div>
      ) : results ? (
        <div className="resultsBarContainer">
          <ResultsBar setSearchVal={setSearchVal} results={results} domain={domain} parseTime={parsedTime}/>
          <div className="resultsContainer">
            <div className="resultsHeaderContainer">
              <div
                className="header"
                onClick={() => handleSortingChange("Domain")}
              >
                <b>Domain</b>
                {getArrow("Domain")}
              </div>
              <div
                className="header"
                onClick={() => handleSortingChange("Count")}
              >
                <b>Count</b>
                {getArrow("Count")}
              </div>
            </div>
            <div className="resultsBody">
              {results.filter(handleSearch).map((row) => (
                <div className="resultsRow" key={row.Domain}>
                  <div className="resultsCol" key="domain">
                    {row.Domain}
                  </div>
                  <div className="resultsCol" key="count">
                    {row.Count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Results;
