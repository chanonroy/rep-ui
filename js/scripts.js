// ADD PLAYER
$('#addPlayer').click(function() {
  var twitchID = prompt("Please enter the streamer's TwitchID");

  $("#team-default").remove();

  $.ajax({
     type: 'GET',
     url: 'http://52.25.105.60/all/' + twitchID,
     dataType: "json",
     success: function(object) {

       var totalViews = object.maxViewsFromUser[0].views;
       var maxFollowers = object.maxFollowersFromUserFromUser[0].followers;

       // Parsing name (sometimes the name is null)
       var name;
       if (object.display_nameFromUser[0].display_name === null) {
         name = twitchID;
         console.log("twitchID not in database");
       }
       else {
         name = object.display_nameFromUser[0].display_name;
       }

       // Local Data Containers (Daily Polling)
       var monthlyViews = [];
       var dateRange = ["Jan ", "Feb ", "Mar ", "Apr ", "May ", "June ", "July ", "Aug ", "Sept ", "Oct ", "Nov ", "Dec "];
       var dates = [];

       for (var i=0; i < 721; i += 24) { // 24 objects per day, 720 per month
         // Twitch Monthly Views
         monthlyViews.unshift(Number(object.viewsFromMetrics[i].views));
         // Date - "2016-04-20" into "April 20"
         dates.unshift(dateRange[Number((object.viewsFromMetrics[i].stamp).substring(5, 7)) - 1] + ((object.viewsFromMetrics[i].stamp).substring(8, 10)).replace(/\b0+/g, ''));
       }

       // dom injection
       $('#team').append(
            '<div id="' + name + '" class="team-player">' +
            '<span> -- </span>' +
            '<span> <img src="img/brand-small.png">' + name + ' </span>' +
            '<span>' + numberWithCommas(totalViews) + '</span>' +
            '<span>' + numberWithCommas(maxFollowers) + '</span>' +
            '<span> <button class="remove"> x </button> </span>' +
            '<span class="hidden viewsData">' + monthlyViews + '</span>' +
            '<span class="hidden dateData">' + dates + '</span>' +
            '</div>');

        update(name);

     } // -- success
  }); // -- ajax
}); // -- button

// REMOVE PLAYER
$('#team').on('click', '.remove', function() {
	var name = $(this).parent().parent().attr('id');
  remove(name);
  // if/else statement
  $('#' + name).remove();

});

function update(name) {
    // Used to update chart and calculations when a streamer is added

    // jQuery DOM selection - STRING ARRAY
    var localViews = $('#' + name).find('.viewsData').text().split(',');
    var localDates = $('#' + name).find('.dateData').text().split(',');

    // turn into INT ARRAY
    for (var i = 0; i < localViews.length; i++) {
        localViews[i] = parseInt(localViews[i], 10);
      }

    if (chartViews.length === 0){
      // if global is empty, set global to new
      chartViews = localViews;
    } else {
      // if global has objects, update global array
      for (var x = 0; x < chartViews.length; x++) {
          chartViews[x] = chartViews[x] + localViews[x];
        }
    }

    // while no dates, assign date range
    while(chartDateRange.length === 0) {
      chartDateRange = localDates;
    }

    $('#totalMonthlyReach').empty().append(numberWithCommas(chartViews[chartViews.length - 1] - chartViews[0]));

    // update Chart.js and the display div
    makeBigChart(chartViews, chartDateRange);
}
function remove(name) {

  // jQuery DOM selection - STRING ARRAY
    var localViews = $('#' + name).find('.viewsData').text().split(',');

  // turn into INT ARRAY
    for (var i = 0; i < localViews.length; i++) {
        localViews[i] = parseInt(localViews[i], 10);
    }

  for (var x = 0; x < chartViews.length; x++) {
      chartViews[x] = chartViews[x] - localViews[x];
  }

  makeBigChart(chartViews, chartDateRange);

}
function makeBigChart(data, labels) {
  // Remove previous chart
  $('#bigChart').replaceWith('<canvas id="bigChart" width="170" height="40"></canvas>'); // this is the <canvas> element
  // redefine DOM variable
  var bigBox = $("#bigChart");
  var mainData = {
      labels: labels,
      datasets: [
          {
              label: "Views",
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
              data: data,
          }
      ]
  };
  var chart = new Chart(bigBox, {
      type: 'line',
      data: mainData,
      options: options1,
  });
} // -- func(makeBigChart)

// produce default bigChart on page load
makeBigChart(emptyData, dateDefault);

// SIX SMALLER CHARTS
function makeChart(selector, data, options) {
  var chart = new Chart(selector, {
      type: 'line',
      data: data,
      options: options,
  });
}

var data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "2"],
    datasets: [
        {
            label: "Views",
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
            pointHoverBackgroundColor: "white",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [13, 15, 15, 15, 18, 20, 21, 25, 26],
        }
    ]
};

// params = selector, data, options
makeChart(box1, data, options2);
makeChart(box2, data, options2);
makeChart(box3, data, options2);
makeChart(box4, data, options2);
makeChart(box5, data, options2);
makeChart(box6, data, options2);
