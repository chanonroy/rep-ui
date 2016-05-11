var box1 = $("#box1");
var box2 = $("#box2");
var box3 = $("#box3");
var box4 = $("#box4");
var box5 = $("#box5");
var box6 = $("#box6");

var options2 = {
      responsive: true,
      scales: {
        yAxes: [{ display: false,}],
        xAxes: [{ display: false,}]
      },
      gridlines: {
        display: false,
      },
      legend: {display: false}
    };

var data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
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
            pointRadius: 2,
            pointHitRadius: 10,
            data: [13, 16, 14, 15, 18, 20, 21, 25],
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
