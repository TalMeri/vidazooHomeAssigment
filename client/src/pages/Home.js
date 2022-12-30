import React from "react";
import SearchBar from "../components/SearchBar";
import {useParams} from "react-router-dom";
import Results from "../components/Results";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";


const Home = () => {
    // const {domain} = useParams();
    const [domainValue, setDomainValue] = useState("")
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // const [domain, setDomain] = useState("")
    // const [totalAdvertisers, setTotalAdvertisers] = useState("")


    const handleSearch = async (searchVal) => {
      setLoading(true);
      setData([]);
      try {
      const res = await axios.get(`/parser/getCount`, { params: { adsTxtUrl: searchVal } })
      console.log(res.data);
      setData(res.data.Results);
      const res2 = await axios.get(`/parser/getDomain`, { params: { adsTxtUrl: searchVal } })
      console.log(res2);
      const res3 = await axios.get(`/parser/getTotalAdvertisers`, { params: { adsTxtUrl: searchVal } })
      console.log(res3);
      setLoading(false);
      }
      catch (error) {
        console.log(error.response);
      }
        // navigate(`/${searchVal}`);
    }

    const handleSorting = (sortField, sortOrder) => {
      if (sortField) {
        const sortedData = [...data].sort((a, b) => {
         return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
           numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
         );
        });
  
        console.log(sortedData);
        setData(sortedData);
       }
     }


    return (
    <>
    <div style={{margin:"60px"}}>
    <h1 style={{textAlign:"center"}}>Ads.txt Crawler</h1>
    <SearchBar label={loading? "loading" : "Parse ads.txt"} onClick={() => { handleSearch(domainValue) }} onChange={(val) => {setDomainValue(val.target.value)}}/>
    {loading? <h1>loading</h1> : <Results data={data} handleSorting={handleSorting}/>}
    {/* <Results domain={domain}/> */}
    </div>
    </>
  );
};

export default Home;
