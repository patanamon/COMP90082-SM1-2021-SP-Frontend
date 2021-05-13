import React from "react";
import DataTable from "react-data-table-component";

const customStyles = {
  header: {
    style: {
      fontWeight: "bold",
      fontSize: "22px", 
      paddingLeft: "0px",
    },
  },
  headCells: {
    style: {
      fontSize: "16px", 
      background: "#EEEEEE",
    },
  },
};

export default function Table(props) {
  let tableData = getUserList(props.data, 'user_list');

  return (
    <div style={{ position: "relative", margin: "auto"}}>
      <DataTable
        title={props.title}
        columns={props.columns}
        data={tableData}
        customStyles={customStyles}
        fixedHeader={true}
        highlightOnHover={true}
      />
    </div>
  );
}


function getUserList(data, req) {
  let labelDataMap = [];
  for (let key in data) {
    if (!labelDataMap[key] && key == req) {
      labelDataMap = [data[key]];
    } 
  }
  return labelDataMap;
}