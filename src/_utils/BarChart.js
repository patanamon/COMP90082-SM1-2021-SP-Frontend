import React from "react";
import { BarChart } from "react-chartjs-2";

export default function BarChartPlot(props) {
  const data = props.data;
  const datasets = [];
    datasets.push(data[0].code_lines_count);
    datasets.push(data[0].class_count);
    datasets.push(data[0].declarative_lines_count);
    datasets.push(data[0].executable_lines_count);
    datasets.push(data[0].file_count);
    datasets.push(data[0].function_count);
    datasets.push(data[0].comment_lines_count);
    datasets.push(data[0].comment_to_code_ratio);

    console.log(datasets)
  const formattedData = {
        labels: ['code_lines_count', 'class_count', 'declarative_lines_count',
        'executable_lines_count', 'file_count', 'function_count', 'comment_lines_count', 'comment_to_code_ratio'],
        datasets: [{
            data: datasets,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };
  return (
    <div style={{ position: "relative", margin: "auto", width: "80vw" }}>
      <BarChart data={formattedData}/>
    </div>
  )
    
}