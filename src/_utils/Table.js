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
  return (
    <div style={{ position: "relative", margin: "auto", width: props.width ? props.width : "40vw" }}>
      <DataTable
        title={props.title}
        columns={props.columns}
        data={props.data}
        customStyles={customStyles}
        fixedHeader={true}
        fixedHeaderScrollHeight={ props.height ? props.height : "20vh"}
        highlightOnHover={true}
      />
    </div>
  );
}
