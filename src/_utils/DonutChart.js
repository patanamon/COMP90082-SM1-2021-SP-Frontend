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
    return (
        <div style={{ position: "relative", margin: "auto", width: "80vw" }}>
          <Doughnut data={data} />
        </div>
    )
}