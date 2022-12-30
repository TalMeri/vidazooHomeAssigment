import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import Table from "./Table";
import Textfield from "./Textfield";
import Download from "./Download";

const Results = ({data, handleSorting}) => {
    const [searchVal, setSearchVal] = useState("");

    const handleSearch = (row) => {
          if (row !== 'undifended') {
            if (searchVal === "")
              return true;
            else {
              const searchValUpper = searchVal.toUpperCase();
              const domainRowUpper = row.Domain.toUpperCase();
              if (domainRowUpper.startsWith(searchValUpper))
                return true;
            }
          }
          return false;
    }

    

  return (<>
  {data.length>0 ?<>
  <div style={{marginLeft:"50px", marginRight:"50px"}}>
  <div style={{display:"flex", marginTop:"20px", marginBottom:"20px"}}><Textfield placeholder={"search domain"} onChange={(val) => setSearchVal(val.target.value)} size="sm"/> 
  <Download data={data}/></div>
  <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
     <Table columns={['Domain','Count']} tableData={data.filter(handleSearch)} handleSorting={handleSorting}/></div></div></> : <></>}
  </>
  );
};

export default Results;
