import React from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "../_utils/Table";

export default function ReverseTable(props) {
  const data = props.data;
  const datasets = [];
  datasets.push(data[0].code_lines_count);
  datasets.push(data[0].class_count);
  datasets.push(data[0].file_count);
  datasets.push(data[0].function_count);
  datasets.push(data[0].comment_lines_count);
  datasets.push(data[0].comment_to_code_ratio);
  datasets.push(data[0].declarative_lines_count);
  datasets.push(data[0].executable_lines_count);

  const formattedData = [
    {
      metric: "Lines",
      number: data[0].code_lines_count,
    },
    {
      metric: "Classes",
      number: data[0].class_count,
    },
    {
      metric: "Files",
      number: data[0].file_count,
    },
    {
      metric: "Functions",
      number: data[0].function_count,
    },
    {
      metric: "Comment Lines",
      number: data[0].comment_lines_count,
    },
    {
      metric: "Comment Lines / Code Lines",
      number: data[0].comment_to_code_ratio,
    },
    {
      metric: "Declarible Statements",
      number: data[0].declarative_lines_count,
    },
    {
      metric: "Excutable Statements",
      number: data[0].executable_lines_count,
    },
  ];

  const columns = [
    {
      name: "Metric",
      selector: "metric",
      center: true,
      sortable: true,
    },
    {
      name: "Number",
      selector: "number",
      center: true,
      sortable: true,
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        margin: "auto",
        width: props.width ? props.width : "60vw",
      }}
    >
      <DataTable
        customStyles={customStyles}
        columns={columns}
        data={formattedData}
        striped={true}
        fixedHeader={true}
        highlightOnHover={true}
      />
    </div>
  );
}
