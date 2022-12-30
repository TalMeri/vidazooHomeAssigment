import React from "react";

const TableBody = ({ tableData, columns }) => {
    return (
     <tbody>
      {tableData.map((data) => (
          <tr key={data.Domain}>
              {columns.map((key) => {
                  const tData = data[key];
                  return <td key={key}>{tData}</td>;
              })}
          </tr>
      ))}
     </tbody>
    );
   };
   
   export default TableBody;