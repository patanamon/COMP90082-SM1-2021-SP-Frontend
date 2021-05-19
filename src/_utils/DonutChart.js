import React from 'react'
import { Doughnut } from 'react-chartjs-2'

// sample data format, see demo here https://www.chartjs.org/docs/latest/charts/doughnut.html
// const data = {
//     labels: [
//       'Red',
//       'Blue',
//       'Yellow'
//     ],
//     datasets: [{
//       label: 'My First Dataset',
//       data: [300, 50, 100],
//       backgroundColor: [
//         'rgb(255, 99, 132)',
//         'rgb(54, 162, 235)',
//         'rgb(255, 205, 86)'
//       ],
//       hoverOffset: 4
//     }]
//   };


export default function DonutChart(props){
  const data = props.data
  const label = props.dataLabel ? props.dataLabel: data.datasets[0].label;
  return (
      <div style={{ position: "relative", margin: "auto", width: "80vw" }}>
        <Doughnut data={data} options={{legend: { display: true, position: "right", labels: {fontSize: 12} },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
            //get the concerned dataset
            var dataset = data.datasets[tooltipItem.datasetIndex];
            //calculate the total of this data set
            var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
              return previousValue + currentValue;
            });
            //get the current items value
            var currentValue = dataset.data[tooltipItem.index];
            //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
            var percentage = Math.floor(((currentValue/total) * 100)+0.5);

            return  data.labels[tooltipItem.index] + "'s " + label + ": " +currentValue + "(" + percentage + "%" + ")";
    }
  }
} }} />
      </div>
  )
}