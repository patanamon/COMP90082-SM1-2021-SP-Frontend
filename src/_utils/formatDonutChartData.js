import randomColor from "randomcolor";

export function formatDonutChartData(response) {
  let rawData = response.data;
  let labelDataMap = getlabelDataMap(rawData);
  let xaxis = [];
  let datasets = [];
  let result = {};
  for (let key in labelDataMap) {
    if (key == "student") {
      xaxis = labelDataMap[key];
    } else {
      datasets.push({
        label: key,
        data: labelDataMap[key].slice(),
        backgroundColor: randomColor({
          count: xaxis.length,
          format: 'rgb',
          seed: 1
        }).slice()
      });
    }
  }
  let formattedData = {
    labels: xaxis,
    datasets: datasets,
  };
  
  let colorForOtherElseStudents = randomColor({
    seed: 2
  });
  let studentList = formattedData.labels.slice();
  studentList.push("All");
  for (let i = 0, len=studentList.length; i < len; i++) {
    
    result[studentList[i]] = formatDonutChartDataForOneStudent(formattedData, studentList[i], colorForOtherElseStudents);
    
  }
  
  return result;
}

function formatDonutChartDataForOneStudent(formattedData, student, colorForOtherElseStudents) {
    if (student === "All") {
      
      return formattedData;
    }
    let index = 0;
    let excludedSum = 0;
    for (let i = 0, len = formattedData.labels.length; i < len; i++) {
      if (formattedData.labels[i] === student) {
        index = i;
      } else {
        excludedSum += formattedData.datasets[0].data[i];
      }
    }

    let result = {
      labels: [student, "Other students"],
      datasets: [{
        label: formattedData.datasets[0].label,
        data: [formattedData.datasets[0].data[index], excludedSum],
        backgroundColor: [formattedData.datasets[0].backgroundColor[index], colorForOtherElseStudents]
      }]
    };

    return result;
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
