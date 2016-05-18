// Options for Main Chart
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

// Options for Sub Chart
var options2 = {
      responsive: true,
      scales: {
        yAxes: [{ display: false,}],
        xAxes: [{ display: false,}]
      },
      legend: {display: false}
    };
