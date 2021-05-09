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

export function formatDonutChartDataForOneStudent(formattedData, student) {
  if (student === "All") {
    return formattedData
  } else {
    let index = 0;
    let excludedSum = 0;
    for (let i = 0, len = formattedData.labels; i < len; i++) {
      if (formattedData.labels[i] === student) {
        index = i;
      } else {
        excludedSum += formattedData.datasets.data[i];
      }
    }

    let result = {
      labels: [student, "Other else students"],
      datasets: [{
        label: formattedData.datasets.label,
        data: [formattedData.datasets.data[index], excludedSum]
      }]
    };

    return result;
  }
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
