// ------------------------- GENERAL CALCS -------------------------------------

  // Return with commas in between
  var numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Rounds an INT to a decimal place
  var rounding = function(x, decimal=1) {
    return x.toFixed(decimal).toString();
  };

  // Calculates the percentage change in a data array
  function percentChange(data) {
    var totalViews = data[data.length - 1];
    var monthlyViews = totalViews - data[0];
    var monthlyChange = monthlyViews / totalViews * 100;
    return rounding(monthlyChange);
  }

  // Gets the current date using JavaScript and fills the dates global variable for 30 days
  function getDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var date = today.getDate();

    for(var i=0; i<30; i++){
      var day = new Date(year, month, date - i);
      chartDateRange.unshift(String(day).substring(4,10).replace(/\b0+/g, ''));}
  }

  // checks the status of the green/red boolean in the AJAX call and returns an HTML color
  function statusChecker(green, red) {
    if (green === true && red === true) {
      return "#D79D45";
    }
    else if (green === true && red === false) {
      return "#438a4c";
    }
    else {
      return "#CA4448";
    }
  }

// ------------------------- CHART RELATED -------------------------------------

// Function to create the big chart (section 1)
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

// Function to create the six small charts (section 2)
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
} // -- func(makeChart)

// ------------------------- DATA RELATED --------------------------------------

// Function to update chart and calculations when a streamer is added
function update(name) {

    // jQuery DOM selection - STRING ARRAY
    var localTwitchViews = $('#' + name).find('.viewsData').text().split(',');
    var localTwitchFollowers = $('#' + name).find('.followerData').text().split(',');
    var localYoutubeViews = $('#' + name).find('.youtubeViewData').text().split(',');
    var localYouTubeSubs = $('#' + name).find('.youtubeSubData').text().split(',');
    var localTwitterFollowers = $('#' + name).find('.twitterFollowData').text().split(',');
    var localTwitterLikes = $('#' + name).find('.twitterLikeData').text().split(',');
    var localTotalReach = [];

    // turn into INT ARRAY
    for (var i = 0; i < localTwitchViews.length; i++) {
        localTwitchViews[i] = parseInt(localTwitchViews[i], 10);
        localTwitchFollowers[i] = parseInt(localTwitchFollowers[i], 10);
        localYoutubeViews[i] = parseInt(localYoutubeViews[i], 10);
        localYouTubeSubs[i] = parseInt(localYouTubeSubs[i], 10);
        localTwitterFollowers[i] = parseInt(localTwitterFollowers[i], 10);
        localTwitterLikes[i] = parseInt(localTwitterLikes[i], 10);

        localTotalReach[i] = localTwitchViews[i] + localYoutubeViews[i];        // calculate totalReach
      }

    // if global is empty, set global to new. Otherwise, update.
    if (twitchViews.length === 0){
      twitchViews = localTwitchViews;
      twitchFollowers = localTwitchFollowers;
      youtubeViews = localYoutubeViews;
      youtubeSubs = localYouTubeSubs;
      twitterFollowers = localTwitterFollowers;
      twitterLikes = localTwitterLikes;
      totalReach = localTotalReach;
    } else {
      for (var x = 0; x < twitchViews.length; x++) {
          twitchViews[x] = twitchViews[x] + localTwitchViews[x];
          twitchFollowers[x] = twitchFollowers[x] + localTwitchFollowers[x];
          youtubeViews[x] = youtubeViews[x] + localYoutubeViews[x];
          youtubeSubs[x] = youtubeSubs[x] + localYouTubeSubs[x];
          twitterFollowers[x] = twitterFollowers[x] + localTwitterFollowers[x];
          twitterLikes[x] = twitterLikes[x] + localTwitterLikes[x];
          totalReach[x] = totalReach[x] + localTotalReach[x];
        }
    }

    $('#totalMonthlyReach').empty().append(numberWithCommas(totalReach[totalReach.length - 1] - totalReach[0]));
    $('#twitchMonthlyViews').empty().append(numberWithCommas(twitchViews[twitchViews.length - 1] - twitchViews[0]));
    $('#twitchMonthlyViewsPercent').empty().append(percentChange(twitchViews));
    $('#twitchMonthlyFollowers').empty().append(numberWithCommas(twitchFollowers[twitchFollowers.length - 1] - twitchFollowers[0]));
    $('#twitchMonthlyFollowersPercent').empty().append(percentChange(twitchFollowers));
    $('#youtubeMonthlyViews').empty().append(numberWithCommas(youtubeViews[youtubeViews.length - 1] - youtubeViews[0]));
    $('#youtubeMonthlyViewsPercent').empty().append(percentChange(youtubeViews));
    $('#youtubeMonthlySubscribers').empty().append(numberWithCommas(youtubeSubs[youtubeSubs.length - 1] - youtubeSubs[0]));
    $('#youtubeMonthlySubscribersPercent').empty().append(percentChange(youtubeSubs));
    $('#twitterMonthlyFollowers').empty().append(numberWithCommas(twitterFollowers[twitterFollowers.length - 1] - twitterFollowers[0]));
    $('#twitterMonthlyFollowersPercent').empty().append(percentChange(twitterFollowers));

    // update Chart.js and the display div
    makeBigChart(totalReach, chartDateRange);

    makeChart('box1', twitchViews, chartDateRange, "rgba(100, 65, 165, 0.4)", "rgba(100, 65, 165, 1)");
    makeChart('box2', youtubeViews, chartDateRange, "rgba(229, 45, 39, 0.4)", "rgba(229, 45, 39, 1)");
    makeChart('box3', twitterFollowers, chartDateRange, "rgba(85, 172, 238, 0.4)", "rgba(85, 172, 238, 1)");
    makeChart('box4', twitchFollowers, chartDateRange, "rgba(100, 65, 165, 0.4)", "rgba(100, 65, 165, 1)");
    makeChart('box5', youtubeSubs, chartDateRange, "rgba(229, 45, 39, 0.4)", "rgba(229, 45, 39, 1)");
    makeChart('box6', twitterLikes, chartDateRange, "rgba(85, 172, 238, 0.4)", "rgba(85, 172, 238, 1)");
}


// Function to remove streamer data from global container when they are removed
function removePlayer(name) {

  // jQuery DOM selection - STRING ARRAY
  var localTwitchViews = $('#' + name).find('.viewsData').text().split(',');
  var localTwitchFollowers = $('#' + name).find('.followerData').text().split(',');
  var localYoutubeViews = $('#' + name).find('.youtubeViewData').text().split(',');
  var localYouTubeSubs = $('#' + name).find('.youtubeSubData').text().split(',');
  var localTwitterFollowers = $('#' + name).find('.twitterFollowData').text().split(',');
  var localTwitterLikes = $('#' + name).find('.twitterLikeData').text().split(',');
  var localTotalReach = [];

  // turn into INT ARRAY
  for (var i = 0; i < localTwitchViews.length; i++) {
    localTwitchViews[i] = parseInt(localTwitchViews[i], 10);
    localTwitchFollowers[i] = parseInt(localTwitchFollowers[i], 10);
    localYoutubeViews[i] = parseInt(localYoutubeViews[i], 10);
    localYouTubeSubs[i] = parseInt(localYouTubeSubs[i], 10);
    localTwitterFollowers[i] = parseInt(localTwitterFollowers[i], 10);
    localTwitterLikes[i] = parseInt(localTwitterLikes[i], 10);

    localTotalReach[i] = localTwitchViews[i] + localYoutubeViews[i];            // calculate totalReach
  }

  // update each global container
  for (var x = 0; x < twitchViews.length; x++) {
    twitchViews[x] = twitchViews[x] - localTwitchViews[x];
    twitchFollowers[x] = twitchFollowers[x] - localTwitchFollowers[x];
    youtubeViews[x] = youtubeViews[x] - localYoutubeViews[x];
    youtubeSubs[x] = youtubeSubs[x] - localYouTubeSubs[x];
    twitterFollowers[x] = twitterFollowers[x] - localTwitterFollowers[x];
    twitterLikes[x] = twitterLikes[x] - localTwitterLikes[x];
    totalReach[x] = totalReach[x] - localTotalReach[x];
  }

  makeBigChart(totalReach, chartDateRange);
  makeChart('box1', twitchViews, chartDateRange, "rgba(100, 65, 165, 0.4)", "rgba(100, 65, 165, 1)");
  makeChart('box2', youtubeViews, chartDateRange, "rgba(229, 45, 39, 0.4)", "rgba(229, 45, 39, 1)");
  makeChart('box3', twitterFollowers, chartDateRange, "rgba(85, 172, 238, 0.4)", "rgba(85, 172, 238, 1)");
  makeChart('box4', twitchFollowers, chartDateRange, "rgba(100, 65, 165, 0.4)", "rgba(100, 65, 165, 1)");
  makeChart('box5', youtubeSubs, chartDateRange, "rgba(229, 45, 39, 0.4)", "rgba(229, 45, 39, 1)");
  makeChart('box6', twitterLikes, chartDateRange, "rgba(85, 172, 238, 0.4)", "rgba(85, 172, 238, 1)");

  $('#totalMonthlyReach').empty().append(numberWithCommas(totalReach[totalReach.length - 1] - totalReach[0]));
  $('#twitchMonthlyViews').empty().append(numberWithCommas(twitchViews[twitchViews.length - 1] - twitchViews[0]));
  $('#twitchMonthlyViewsPercent').empty().append(percentChange(twitchViews));
  $('#twitchMonthlyFollowers').empty().append(numberWithCommas(twitchFollowers[twitchFollowers.length - 1] - twitchFollowers[0]));
  $('#twitchMonthlyFollowersPercent').empty().append(percentChange(twitchFollowers));
  $('#youtubeMonthlyViews').empty().append(numberWithCommas(youtubeViews[youtubeViews.length - 1] - youtubeViews[0]));
  $('#youtubeMonthlyViewsPercent').empty().append(percentChange(youtubeViews));
  $('#youtubeMonthlySubscribers').empty().append(numberWithCommas(youtubeSubs[youtubeSubs.length - 1] - youtubeSubs[0]));
  $('#youtubeMonthlySubscribersPercent').empty().append(percentChange(youtubeSubs));
  $('#twitterMonthlyFollowers').empty().append(numberWithCommas(twitterFollowers[twitterFollowers.length - 1] - twitterFollowers[0]));
  $('#twitterMonthlyFollowersPercent').empty().append(percentChange(twitterFollowers));
}
