// ------------------------- Constructors --------------------------------------

function dataSetGen(label, fill, border, color2, radius, dataPack) {
  return {
  label: label,
  fill: true,
  lineTension: 0.1,
  backgroundColor: fill,
  borderColor: border,
  borderWidth: 3,
  pointBorderWidth: 2,
  pointBorderColor: border,
  pointBackgroundColor: "white",
  pointHoverBackgroundColor: color2,
  pointHoverBorderColor: "white",
  pointHitRadius: radius * 10,
  pointRadius: radius,
  data: dataPack,
};
}

var emptyDataset = [
  dataSetGen("Variable1", "rgba(131, 190, 215, 0.8)", "rgba(131, 190, 215, 0.8)", "rgba(131, 190, 215, 1)", 2, emptyData),
  dataSetGen("Variable2", "rgba(224, 96, 79, 0.8)", "rgba(224, 96, 79, 0.8)", "rgba(224, 96, 79, 1)", 2, emptyData),
  dataSetGen("Variable3", "rgba(122, 200, 120, 0.8)", "rgba(122, 200, 120, 0.8)", "rgba(122, 200, 120, 1)", 2, emptyData)
];

// ----------------------- Chart Creations (Chart.js) --------------------------

// Function to create the big chart (section 1)
function makeBigChart(data1, data2, data3, labels) {
  // Step 1 - Remove previous chart and redefine selector
  $('#bigChart').replaceWith('<canvas id="bigChart" width="170" height="40"></canvas>'); // this is the <canvas> element
  $('#bigChart2').replaceWith('<canvas id="bigChart2" width="170" height="40"></canvas>');
  $('#bigChart3').replaceWith('<canvas id="bigChart3" width="170" height="40"></canvas>');
    // Need to reselect the selectors since they are appended to the DOM
    var selectNew = $("#bigChart");
    var selectNew2 = $("#bigChart2");
    var selectNew3 = $("#bigChart3");

  // Step 2 - Define Chart.js LABELS and DATASET
  var combinedData = {
      labels: labels,
      datasets: [ data1, ]
  };
  var streamerData = {
      labels: labels,
      datasets: data2
  };
  var platformData = {
      labels: labels,
      datasets: data3
  };

  // Step 3 - Create chart.js line chart with data and options
  var chart1 = new Chart(selectNew, { type: 'line', data: combinedData, options: options1, });
  var chart2 = new Chart(selectNew2, { type: 'bar', data: streamerData, options: options4, });
  var chart3 = new Chart(selectNew3, { type: 'bar', data: platformData, options: options4, });

} // -- func MakeBigChart

// Function to create the six small charts (section 2)
function makeChart(selector, data, labels, background, border) {

  // Step 1 - Remove previous chart and redefine selector
  $('#' + selector).replaceWith('<canvas id="' + selector + '" width="20" height="7"></canvas>'); // this is the <canvas> element
  var selectNew = $('#' + selector);

  // Step 2 - Define Chart.js LABELS and DATASET
  var dataset = {
      labels: labels,
      datasets: [ dataSetGen("Views", background, border, "white", 0.5, data),]
  };

  // Step 3 - Create chart.js line chart with data and options
  var chart = new Chart(selectNew, {
      type: 'line',
      data: dataset,
      options: options2,
  });
}

// ------------------------- DATA RELATED --------------------------------------

// Function to update chart and calculations when a streamer is added
function update(name) {

    // jQuery DOM selection - STRING ARRAY (31 elements)
    var localTwitchViews = $('#' + name).find('.viewsData').text().split(',');
    var localTwitchFollowers = $('#' + name).find('.followerData').text().split(',');
    var localYoutubeViews = $('#' + name).find('.youtubeViewData').text().split(',');
    var localYouTubeSubs = $('#' + name).find('.youtubeSubData').text().split(',');
    var localTwitterFollowers = $('#' + name).find('.twitterFollowData').text().split(',');
    var localTwitterLikes = $('#' + name).find('.twitterLikeData').text().split(',');
    var localTotalReach = [];
    var localReachChange = [];

    // turn into INT ARRAY (31 elements)
    for (var i = 0; i < localTwitchViews.length; i++) {
        localTwitchViews[i] = parseInt(localTwitchViews[i], 10);
        localTwitchFollowers[i] = parseInt(localTwitchFollowers[i], 10);
        localYoutubeViews[i] = parseInt(localYoutubeViews[i], 10);
        localYouTubeSubs[i] = parseInt(localYouTubeSubs[i], 10);
        localTwitterFollowers[i] = parseInt(localTwitterFollowers[i], 10);
        localTwitterLikes[i] = parseInt(localTwitterLikes[i], 10);

        localTotalReach[i] = localTwitchViews[i] + localYoutubeViews[i];        // calculate totalReach

      }

    // if global is empty, set global to new. Otherwise, update. [Cut objects to 30 objects]
    if (twitchViews.length === 0){
      for (var x = 1; x < localTwitchViews.length; x++) {
        twitchViews[x - 1] = localTwitchViews[x];
        twitchFollowers[x - 1] = localTwitchFollowers[x];
        youtubeViews[x - 1] = localYoutubeViews[x];
        youtubeSubs[x - 1] = localYouTubeSubs[x];
        twitterFollowers[x - 1] = localTwitterFollowers[x];
        twitterLikes[x - 1] = localTwitterLikes[x];
        totalReach[x - 1] = localTotalReach[x];
        totalReachChange[x - 1] = localTotalReach[x] - localTotalReach[x - 1]; // calculate change (this is the reason for 31 objects)
        localReachChange[x - 1] = localTotalReach[x] - localTotalReach[x - 1];
      }
    } else {
      // Update global with local (ignore first from local)
      for (var n = 1; n < localTwitchViews.length; n++) {
        twitchViews[n - 1] = twitchViews[n - 1] + localTwitchViews[n];
        twitchFollowers[n - 1] = twitchFollowers[n - 1] + localTwitchFollowers[n];
        youtubeViews[n - 1] = youtubeViews[n - 1] + localYoutubeViews[n];
        youtubeSubs[n - 1] = youtubeSubs[n - 1] + localYouTubeSubs[n];
        twitterFollowers[n - 1] = twitterFollowers[n - 1] + localTwitterFollowers[n];
        twitterLikes[n - 1] = twitterLikes[n - 1] + localTwitterLikes[n];
        totalReach[n - 1] = totalReach[n - 1] + localTotalReach[n];
      }
      // Do calculation of change AFTER totalReach is updated
      for (var c = 1; c < localTwitchViews.length; c++) {
        totalReachChange[c - 1] = totalReachChange[c - 1] + (localTotalReach[c] - localTotalReach[c - 1]); // calculate change (this is the reason for 31 objects)
        localReachChange[c - 1] = localTotalReach[c] - localTotalReach[c - 1]; // calculate change (this is the reason for 31 objects)
      }
    } // -- else

    // RANDOM COLOR SELECTOR - localTotalReach turn into datasetContainer (for stacked bar chart)
    if (globalChartColors.length === 0) {
      globalChartColors.unshift("15, 88, 121", "231, 148, 54", "146, 199, 121", "131, 140, 201", "141, 213, 214", "185, 134, 217", "250, 208, 92", "122, 200, 120", "224, 96, 79", "131, 190, 215");
      var setColor1 = globalChartColors.pop();
      datasetContainer.push(dataSetGen(name, "rgba(" + setColor1 + ", 0.8)", "rgba(" + setColor1 + ", 1)", "white", 2, localReachChange));
    } else {
      var setColor2 = globalChartColors.pop();
      datasetContainer.push(dataSetGen(name, "rgba(" + setColor2 + ", 0.8)", "rgba(" + setColor2 + ", 1)", "white", 2, localReachChange));
    }

    // clear datasetPlatform, run func assigned to total reach
    datasetPlatform.splice(0,2);
    datasetPlatform.push(
      dataSetGen("Twitch", "rgba(101, 83, 135, 0.8)", "rgba(100, 65, 165, 1)", "white", 2, twitchViews),
      dataSetGen("YouTube", "rgba(224, 96, 79, 0.8)", "rgb(167, 39, 12)", "white", 2, youtubeViews)
    );

    // Update the labels from the global variable containers
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
    $('#twitterMonthlyLikes').empty().append(numberWithCommas(twitterLikes[twitterLikes.length - 1] - twitterLikes[0]));
    $('#twitterMonthlyLikesPercent').empty().append(percentChange(twitterLikes));

    // update Chart.js and the display div
    makeBigChart(
      dataSetGen("Views", "rgba(32, 162, 219, 0.3)", "rgb(88, 167, 210)", "white", 4, totalReach), // combined
      datasetContainer, // streamer breakdown
      datasetPlatform,  // platform breakdown
      chartDateRange  // global date container
    );

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

  // Remove from the global stacked dataset container
  var index = datasetContainer.map(function(x) { return x.label; }).indexOf(name);
  datasetContainer.splice(index, 1);

  // update each global container
  for (var x = 1; x < twitchViews.length + 1; x++) {
    twitchViews[x - 1] = twitchViews[x - 1] - localTwitchViews[x];
    twitchFollowers[x - 1] = twitchFollowers[x - 1] - localTwitchFollowers[x];
    youtubeViews[x - 1] = youtubeViews[x - 1] - localYoutubeViews[x];
    youtubeSubs[x - 1] = youtubeSubs[x - 1] - localYouTubeSubs[x];
    twitterFollowers[x - 1] = twitterFollowers[x - 1] - localTwitterFollowers[x];
    twitterLikes[x - 1] = twitterLikes[x - 1] - localTwitterLikes[x];
    totalReach[x - 1] = totalReach[x - 1] - localTotalReach[x];
  }
  // Do calculation of change AFTER totalReach is updated
  for (var c = 1; c < twitchViews.length; c++) {
    totalReachChange[c - 1] = totalReachChange[c - 1] - (localTotalReach[c] - localTotalReach[c - 1]);
  }

  // clear datasetPlatform, run func assigned to total reach
  datasetPlatform.splice(0,2);
  datasetPlatform.push(
    dataSetGen("Twitch", "rgb(101, 83, 135)", "rgba(100, 65, 165, 1)", "white", 2, twitchViews),
    dataSetGen("YouTube", "rgba(222, 81, 62, 1)", "rgb(167, 39, 12)", "white", 2, youtubeViews)
  );

  // update Chart.js and the display div
  makeBigChart(
    dataSetGen("Views", "rgba(32, 162, 219, 0.3)", "rgb(88, 167, 210)", "white", 4, totalReach), // combined
    datasetContainer, // streamer breakdown
    datasetPlatform,  // platform breakdown
    chartDateRange  // global date container
  );

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
  $('#twitterMonthlyLikes').empty().append(numberWithCommas(twitterLikes[twitterLikes.length - 1] - twitterLikes[0]));
  $('#twitterMonthlyLikesPercent').empty().append(percentChange(twitterLikes));
}
