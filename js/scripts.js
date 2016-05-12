var bigBox = $("#bigChart");

var box1 = $("#box1");
var box2 = $("#box2");
var box3 = $("#box3");
var box4 = $("#box4");
var box5 = $("#box5");
var box6 = $("#box6");

var options1 = {
      responsive: true,
      scales: {
        yAxes: [{
          display: true,
        }],
        xAxes: [{
          gridLines: { display: false },
          display: true,
          ticks: {
            maxTicksLimit: 10, /* maximum labels */
            maxRotation: 0,
          },
        }],
      },
      legend: {display: false},
    };

var options2 = {
      responsive: true,
      scales: {
        yAxes: [{ display: false,}],
        xAxes: [{ display: false,}]
      },
      legend: {display: false}
    };

  var mainData = {
      labels: ["Apr 24", "Apr 25", "Apr 26", "Apr 27", "Apr 28",
               "Apr 29", "Apr 30", "Apr 31", "May 1", "May 2",
               "May 3", "May 4", "May 5", "May 6", "May 7",
               "May 8", "May 9", "May 10", "May 11", "May 12",
               "May 13", "May 14", "May 15", "May 16", "May 17",
               "May 18", "May 19", "May 20", "May 21", "May 22", ],
      datasets: [
          {
              label: "My First dataset",
              fill: true,
              lineTension: 0.1,
              backgroundColor: "rgba(32, 162, 219, 0.3)",
              borderColor: "rgb(88, 167, 210)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgb(88, 167, 210)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 2,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "white",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 4,
              pointHitRadius: 10,
              data: [120, 125, 130, 131, 133,
                     134, 136, 140, 144, 144,
                     145, 148, 149, 150, 155,
                     155, 155, 155, 165, 166,
                     167, 168, 169, 172, 175,
                     180, 181, 182, 182, 188],
          }
      ]
  };

var data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "2"],
    datasets: [
        {
            label: "My First dataset",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75, 193, 90, 0.4)",
            borderColor: "rgba(75, 193, 90, 1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [13, 16, 14, 15, 18, 20, 21, 25, 25],
        }
    ]
};

var chart1 = new Chart(box1, {
    type: 'line',
    data: data,
    options: options2,
});

var chart2 = new Chart(box2, {
    type: 'line',
    data: data,
    options: options2,
});

var chart3 = new Chart(box3, {
    type: 'line',
    data: data,
    options: options2,
});

var chart4 = new Chart(box4, {
    type: 'line',
    data: data,
    options: options2,
});

var chart5 = new Chart(box5, {
    type: 'line',
    data: data,
    options: options2,
});

var chart6 = new Chart(box6, {
    type: 'line',
    data: data,
    options: options2,
});

var bigChart = new Chart(bigBox, {
    type: 'line',
    data: mainData,
    options: options1,
});
