import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./ResultsBar.css";

const ResultsBar = ({ setSearchVal, results, domain, parseTime }) => {
  const handleDownload = () => {
    const resultsJson = JSON.stringify({ results });
    const file = new Blob([resultsJson], { type: "application/json" });
    if (window.navigator.msSaveOrOpenBlob)
      window.navigator.msSaveOrOpenBlob(file, `adsTxt_${domain}.json`);
    else {
      let a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = `adsTxt_${domain}.json`;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  };

  return (
    <div className="ResultsBarContainer">
      <div className="ResultsBarCol">
        <Input className="searchBar"
          placeholder={"Search domain"}
          onChange={(val) => {
            setSearchVal(val.target.value);
          }}
        />
      </div>
      <div className="ResultsBarCol">
        <b>Domain:</b> {domain}{" "}
      </div>
      <div className="ResultsBarCol">
        <b>Total advertisers:</b> {results.length}
      </div>
      <div className="ResultsBarCol">
        <b>Parse time:</b> {parseTime}
      </div>
      <div className="ResultsBarCol">
        <Button results={results} onClick={handleDownload} label="Download" />
      </div>
    </div>
    //   {/* <Card> */}

    //     <Card.Body style={{ padding: "8px" }}>
    //       <Row>
    //         <Col style={{ margin: "auto" }}>
    //           <Textfield
    //             placeholder={"search domain"}
    //             onChange={(val) => {
    //               setSearchVal(val.target.value);
    //             }}
    //             size="sm"
    //           />
    //         </Col>
    //         <Col style={{ margin: "auto" }}> Domain: {domain} </Col>
    //         <Col style={{ margin: "auto" }}>Total advertisers: {results.length}</Col>
    //         <Col style={{ margin: "auto" }}>Parse time: {parseTime}</Col>
    //         <Col style={{ margin: "auto" }}>
    //           <Button
    //             results={results}
    //             onClick={handleDownload}
    //             label="Download"
    //           />
    //         </Col>
    //       </Row>
    //     </Card.Body>
    //   {/* </Card>{" "} */}
    // </div>
  );
};

export default ResultsBar;
