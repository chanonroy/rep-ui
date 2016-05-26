// Options for Main Chart
var options1 = {
      responsive: true,
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            callback: function(value) { return numberWithCommas(value); },
          },
        }],
        xAxes: [{
          gridLines: { display: false },
          display: true,
          ticks: {
            maxTicksLimit: 12, /* maximum labels */
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
