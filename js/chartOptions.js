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

// Options 3 for Stacked Big Chart
var options3 = {
  scales: {
    xAxes: [{
      stacked: true,
      gridLines: { display: false },
      ticks: {
        maxTicksLimit: 12, /* maximum labels */
        maxRotation: 0,
      },
    }],
    yAxes: [{
      stacked: true,
      ticks: {
        callback: function(value) { return numberWithCommas(value); },
      },
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

// Options 4 for Stacked BAR Chart
var options4 = {
     		tooltips: {
					mode: 'label',
         },
        scales: {
          xAxes: [{ stacked: true, gridLines: { display: false }, ticks: {
            maxTicksLimit: 12, /* maximum labels */
            maxRotation: 0,
          },}],
          yAxes: [{
            stacked: true,
            ticks: {
              callback: function(value) { return numberWithCommas(value); },
            },
          }],
        }, // scales
        legend: {display: false}
    };
