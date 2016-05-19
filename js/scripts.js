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

       // Local Data Containers to be injected into DOM
       var localTwitchViews = [];
       var localTwitchFollowers = [];
       var localYoutubeViews = [];
       var localYouTubeSubs = [];
       var localTwitterFollowers = [];
       var localTwitterLikes = [];

       var dateRange = ["Jan ", "Feb ", "Mar ", "Apr ", "May ", "June ", "July ", "Aug ", "Sept ", "Oct ", "Nov ", "Dec "];
       var dates = [];

       for (var i=0; i < 721; i += 24) { // 24 objects per day, 720 per month
         // Date - "2016-04-20" into "April 20"
         dates.unshift(dateRange[Number((object.viewsFromMetrics[i].stamp).substring(5, 7)) - 1] + ((object.viewsFromMetrics[i].stamp).substring(8, 10)).replace(/\b0+/g, ''));
         // Twitch Monthly Views
         localTwitchViews.unshift(Number(object.viewsFromMetrics[i].views));
         // Twitch Monthly Followers
         localTwitchFollowers.unshift(Number(object.followersFromMetrics[i].followers));
         // YouTube Monthly Views
         localYoutubeViews.unshift(Number(object.viewsFromYoutube[i].views));
         // YouTube Monthly Subs
         localYouTubeSubs.unshift(Number(object.subscribersFromYoutube[i].subscribers));
         // Twitter Monthly Followers
         localTwitterFollowers.unshift(Number(object.followingFromTwitter[i].following));
         // Twitter Monthly Likes
         localTwitterLikes.unshift(Number(object.likesFromTwitter[i].likes));
       }

       // dom injection for storage
       $('#team').append(
            '<div id="' + name + '" class="team-player">' +
            '<span> -- </span>' +
            '<span> <img src="img/brand-small.png">' + name + ' </span>' +
            '<span>' + numberWithCommas(totalViews) + '</span>' +
            '<span>' + numberWithCommas(maxFollowers) + '</span>' +
            '<span> <button class="remove"> x </button> </span>' +
            '<span class="hidden dateData">' + dates + '</span>' +
            '<span class="hidden viewsData">' + localTwitchViews + '</span>' +
            '<span class="hidden followerData">' + localTwitchFollowers + '</span>' +
            '<span class="hidden youtubeViewData">' + localYoutubeViews + '</span>' +
            '<span class="hidden youtubeSubData">' + localYouTubeSubs + '</span>' +
            '<span class="hidden twitterFollowData">' + localTwitterFollowers + '</span>' +
            '<span class="hidden twitterLikeData">' + localTwitterLikes + '</span>' +
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
    var localDates = $('#' + name).find('.dateData').text().split(',');
    var localTwitchViews = $('#' + name).find('.viewsData').text().split(',');
    var localTwitchFollowers = $('#' + name).find('.followerData').text().split(',');
    var localYoutubeViews = $('#' + name).find('.youtubeViewData').text().split(',');
    var localYouTubeSubs = $('#' + name).find('.youtubeSubData').text().split(',');
    var localTwitterFollowers = $('#' + name).find('.twitterFollowData').text().split(',');
    var localTwitterLikes = $('#' + name).find('.twitterLikeData').text().split(',');

    // turn into INT ARRAY
    for (var i = 0; i < localTwitchViews.length; i++) {
        localTwitchViews[i] = parseInt(localTwitchViews[i], 10);
        localTwitchFollowers[i] = parseInt(localTwitchFollowers[i], 10);
        localYoutubeViews[i] = parseInt(localYoutubeViews[i], 10);
        localYouTubeSubs[i] = parseInt(localYouTubeSubs[i], 10);
        localTwitterFollowers[i] = parseInt(localTwitterFollowers[i], 10);
        localTwitterLikes[i] = parseInt(localTwitterLikes[i], 10);
      }

    // if global is empty, set global to new. Otherwise, update.
    if (chartViews.length === 0){
      chartViews = localTwitchViews;
      chartFollowers = localTwitchFollowers;
      youtubeViews = localYoutubeViews;
      youtubeSubs = localYouTubeSubs;
      twitterFollowers = localTwitterFollowers;
      twitterLikes = localTwitterLikes;
    } else {
      for (var x = 0; x < chartViews.length; x++) {
          chartViews[x] = chartViews[x] + localTwitchViews[x];
          chartFollowers[x] = chartFollowers[x] + localTwitchFollowers[x];
          youtubeViews[x] = youtubeViews[x] + localYoutubeViews[x];
          youtubeSubs[x] = youtubeSubs[x] + localYouTubeSubs[x];
          twitterFollowers[x] = twitterFollowers[x] + localTwitterFollowers[x];
          twitterLikes[x] = twitterLikes[x] + localTwitterLikes[x];
        }
    }

    // while no dates, assign date range
    while(chartDateRange.length === 0) {
      chartDateRange = localDates;
    }

    $('#totalMonthlyReach').empty().append(numberWithCommas(chartViews[chartViews.length - 1] - chartViews[0]));
    $('#twitchMonthlyViews').empty().append(numberWithCommas(chartViews[chartViews.length - 1] - chartViews[0]));
    $('#twitchMonthlyViewsPercent').empty().append(percentChange(chartViews));
    $('#twitchMonthlyFollowers').empty().append(numberWithCommas(chartFollowers[chartFollowers.length - 1] - chartFollowers[0]));
    $('#twitchMonthlyFollowersPercent').empty().append(percentChange(chartFollowers));

    // update Chart.js and the display div
    makeBigChart(chartViews, chartDateRange);

    makeChart('box1', chartViews, chartDateRange, "rgba(100, 65, 165, 0.4)", "rgba(100, 65, 165, 1)");
    makeChart('box2', youtubeViews, chartDateRange, "rgba(229, 45, 39, 0.4)", "rgba(229, 45, 39, 1)");
    makeChart('box3', twitterFollowers, chartDateRange, "rgba(85, 172, 238, 0.4)", "rgba(85, 172, 238, 1)");
    makeChart('box4', chartFollowers, chartDateRange, "rgba(100, 65, 165, 0.4)", "rgba(100, 65, 165, 1)");
    makeChart('box5', youtubeSubs, chartDateRange, "rgba(229, 45, 39, 0.4)", "rgba(229, 45, 39, 1)");
    makeChart('box6', twitterLikes, chartDateRange, "rgba(85, 172, 238, 0.4)", "rgba(85, 172, 238, 1)");
}

// FUNCTION TO REMOVE
function remove(name) {

  // jQuery DOM selection - STRING ARRAY
    var localViews = $('#' + name).find('.viewsData').text().split(',');
    var localFollowers = $('#' + name).find('.followerData').text().split(',');

  // turn into INT ARRAY
    for (var i = 0; i < localViews.length; i++) {
        localViews[i] = parseInt(localViews[i], 10);
        localFollowers[i] = parseInt(localFollowers[i], 10);
    }

  for (var x = 0; x < chartViews.length; x++) {
      chartViews[x] = chartViews[x] - localViews[x];
      chartFollowers[x] = chartFollowers[x] - localFollowers[x];
  }

  makeBigChart(chartViews, chartDateRange);
  $('#totalMonthlyReach').empty().append(numberWithCommas(chartViews[chartViews.length - 1] - chartViews[0]));
  $('#twitchMonthlyViews').empty().append(numberWithCommas(chartViews[chartViews.length - 1] - chartViews[0]));
  $('#twitchMonthlyViewsPercent').empty().append(percentChange(chartViews));
  $('#twitchMonthlyFollowers').empty().append(numberWithCommas(chartFollowers[chartFollowers.length - 1] - chartFollowers[0]));

// percentChange(chartViews)

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

// small chart
function makeChart(selector, data, labels, background, border) {
  $('#' + selector).replaceWith('<canvas id="' + selector + '" width="20" height="7"></canvas>'); // this is the <canvas> element
  var selectNew = $('#' + selector);
  var dataset = {
      labels: labels,
      datasets: [
          {
              label: "Views",
              fill: true,
              lineTension: 0.1,
              backgroundColor: background,
              borderColor: border,
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: background,
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "white",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: data,
          }
      ]
  };
  var chart = new Chart(selectNew, {
      type: 'line',
      data: dataset,
      options: options2,
  });
} // -- func(makeChart) //rgb(229, 45, 39)

// params = selector, background, border
makeChart('box1', emptyData, dateDefault, "rgba(100, 65, 165, 0.4)", "rgba(100, 65, 165, 1)");
makeChart('box2', emptyData, dateDefault, "rgba(229, 45, 39, 0.4)", "rgba(229, 45, 39, 1)");
makeChart('box3', emptyData, dateDefault, "rgba(85, 172, 238, 0.4)", "rgba(85, 172, 238, 1)");
makeChart('box4', emptyData, dateDefault, "rgba(100, 65, 165, 0.4)", "rgba(100, 65, 165, 1)");
makeChart('box5', emptyData, dateDefault, "rgba(229, 45, 39, 0.4)", "rgba(229, 45, 39, 1)");
makeChart('box6', emptyData, dateDefault, "rgba(85, 172, 238, 0.4)", "rgba(85, 172, 238, 1)");
