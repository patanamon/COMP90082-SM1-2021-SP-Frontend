import React from "react";
import { BarChart } from "react-chartjs-2";

export default function BarChartPlot(props) {
  const data = props.data;
  const datasets = [];
    datasets.push(data[0].all);
    datasets.push(data[0].classes);
    datasets.push(data[0].decst);
    datasets.push(data[0].excst);
    datasets.push(data[0].file);
    datasets.push(data[0].func);
    datasets.push(data[0].pre);
    datasets.push(data[0].ratio);

    console.log(datasets)
  const formattedData = {
        labels: ['all', 'classes', 'decst',
        'excst', 'file', 'func', 'pre', 'ratio'],
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