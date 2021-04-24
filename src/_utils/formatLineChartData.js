import { unixToDate } from "../_utils/unixToDate.js";

export function formatLineChartData(response) {
  let rawData = response.data;
  let labelDataMap = getlabelDataMap(rawData);
  let xaxis = [];
  let datasets = [];
  for (let key in labelDataMap) {
    if (key == "time") {
      xaxis = labelDataMap[key].map(unixToDate);
    } else {
      datasets.push({
        label: key,
        data: labelDataMap[key],
      });
    }
  }
  let formattedData = {
    labels: xaxis,
    datasets: datasets,
  };

  return formattedData;
}

function getlabelDataMap(rawData) {
  let labelDataMap = {};
  for (let i = 0, len = rawData.length; i < len; i++) {
    for (let key in rawData[i]) {
      if (!labelDataMap[key]) {
        labelDataMap[key] = [rawData[i][key]];
      } else {
        labelDataMap[key].push(rawData[i][key]);
      }
    }
  }
  return labelDataMap;
}
