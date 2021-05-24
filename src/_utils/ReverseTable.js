import React from "react";
import DataTable from "react-data-table-component";

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

    console.log(datasets)
  const formattedData = [{
      matrix: 'Number of all line',
      index: data[0].code_lines_count
    },
    {
      matrix: 'Number of classes',
      index: data[0].class_count
    },
    {
      matrix: 'Number of files',
      index: data[0].file_count
    },
    {
      matrix: 'Number of functions',
      index: data[0].function_count
    },
    {
      matrix: 'Number of comment lines',
      index: data[0].comment_lines_count
    },
    {
      matrix: 'Ratio of comment lines to code lines',
      index: data[0].comment_to_code_ratio
    },
    {
      matrix: 'Number of declarible statements',
      index: data[0].declarative_lines_count
    },
    {
      matrix: 'Number of excutable statements',
      index: data[0].executable_lines_count
    },
    
  ];

  const customStyles = {
    cells: {
      style: {
        fontSize: "20px",
      },
    },
  };

  const columns1 = [
    {
      name: "Matrix",
      selector: "matrix",
      center: Boolean(true),
    },
    {
      name: "Index",
      selector: "index",
      center: Boolean(true),
    },
  ];

  console.log(formattedData)
  return (
    <div >
      <DataTable
        customStyles={customStyles}
        columns = {columns1}
        data={formattedData}
        noTableHead={Boolean(true)}
        striped={Boolean(true)}
      />
    </div>
  )
    
}