import React from "react";
import {Table as BootstrapTable} from 'react-bootstrap';
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = ({columns, tableData, handleSorting}) => {

return (
  <BootstrapTable bordered hover> 
    <TableHead columns={columns} handleSorting={handleSorting} />
    <TableBody tableData={tableData} columns={columns} />
  </BootstrapTable>
)};

export default Table;