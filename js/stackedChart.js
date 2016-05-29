// Data Containers
var dataPack1 = [200, 210, 220, 230, 240, 260, 280, 290, 300, 430, 440, 450];
var dataPack2 = [210, 220, 260, 350, 550, 550, 560, 590, 600, 610, 610, 620];
var dataPack3 = [100, 120, 130, 140, 160, 230, 270, 400, 410, 420, 430, 450];


// Canvas Selector and Gradient Variables
var ctx = document.getElementById("myChart").getContext('2d');
  var gradient = ctx.createLinearGradient(0, 400, 0, 600);
  gradient.addColorStop(0, 'skyblue');
  gradient.addColorStop(1, 'steelblue');

  var gradient2 = ctx.createLinearGradient(0, 150, 0, 600);
  gradient2.addColorStop(0, 'tomato');
  gradient2.addColorStop(1, 'darkred');

  var gradient3 = ctx.createLinearGradient(0, 0, 0, 600);
  gradient3.addColorStop(0, 'aquamarine');
  gradient3.addColorStop(1, 'cadetblue');

// dataSet Constructor
function datasetGen(label, color, color2, dataPack) {
	return {
    label: label,
    fill: true,
    lineTension: 0.1,
    backgroundColor: color,
    borderColor: color,
    borderWidth: 4,
    pointBorderWidth: 2,
    pointBorderColor: color2,
    pointBackgroundColor: "#fff",
    pointHoverBackgroundColor: color2,
    pointHoverBorderColor: "white",
    pointHitRadius: 50,
    data: dataPack,
  };
}

// Data Package for Chart.js
var data = {
  labels: ["May 1", "May 2", "May 3", "May 4", "May 5", "May 6",
  				 "May 7", "May 8", "May 9", "May 10", "May 11", "May 12"],
  datasets: [
  	datasetGen("chelxie", gradient, "steelblue", dataPack1),
    datasetGen("nrggbm", gradient2, "firebrick", dataPack2),
    ]
};

// Extra injection
data.datasets[2] = datasetGen("chanzi", gradient3, "aquamarine", dataPack3);

// Chart.js global options
var options = {
  scales: {
    xAxes: [{
      stacked: true,
    }],
    yAxes: [{
      stacked: true
    }]
  },
  tooltips: {
  	mode: 'label',
    xPadding: 10,
    yPadding: 7,
    titleSpacing: 5,
    },
  legend: {
    display: false
  },
};

var myLineChart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: options
});
