export function formatDonutChartData(response) {
  console.log("IN DONUT CHART: ", response.data)
  let rawData = response.data;
  let labelDataMap = getlabelDataMap(rawData);
  let xaxis = [];
  let datasets = [];
  for (let key in labelDataMap) {
    if (key == "student") {
      xaxis = labelDataMap[key];
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
