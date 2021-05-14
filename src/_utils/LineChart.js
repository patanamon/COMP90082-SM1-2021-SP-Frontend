import React from "react";
import { Line } from "react-chartjs-2";

export default function LineChart(props) {
  const data = props.data;
  let options = {
    scales: {
        xAxes: [{
            gridLines: {
                display:false
            }
        }],
    }
}
return (
    <div style={{ position: "relative", margin: "auto", width: "80vw" }}>
      <Line data={data} options={options} />
    </div>
  );
}
