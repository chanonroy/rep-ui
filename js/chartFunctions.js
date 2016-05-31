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
  dataSetGen("Variable1", "rgba(131, 190, 215, 1)", "rgb(69, 133, 167)", "rgb(88, 167, 210)", 2, emptyData),
  dataSetGen("Variable2", "rgba(224, 96, 79, 1)", "rgb(167, 39, 12)", "rgb(167, 39, 12)", 2, emptyData),
  dataSetGen("Variable3", "rgba(122, 200, 120, 1)", "rgb(55, 128, 53)", "rgb(68, 158, 66)", 2, emptyData)
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
  var chart2 = new Chart(selectNew2, { type: 'line', data: streamerData, options: options3, });
  var chart3 = new Chart(selectNew3, { type: 'line', data: platformData, options: options3, });

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

    // localTotalReach turn into datasetContainer (for stacked graphs)
    datasetContainer.push(dataSetGen(name, "rgba(32, 162, 219, 0.3)", "rgb(88, 167, 210)", "white", 2, localTotalReach));

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

    // clear datasetPlatform, run func assigned to total reach
    datasetPlatform.splice(0,2);
    datasetPlatform.push(
      dataSetGen("Twitch", "rgb(101, 83, 135)", "rgba(100, 65, 165, 1)", "white", 2, twitchViews),
      dataSetGen("YouTube", "rgba(222, 81, 62, 1)", "rgb(167, 39, 12)", "white", 2, youtubeViews)
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
  for (var x = 0; x < twitchViews.length; x++) {
    twitchViews[x] = twitchViews[x] - localTwitchViews[x];
    twitchFollowers[x] = twitchFollowers[x] - localTwitchFollowers[x];
    youtubeViews[x] = youtubeViews[x] - localYoutubeViews[x];
    youtubeSubs[x] = youtubeSubs[x] - localYouTubeSubs[x];
    twitterFollowers[x] = twitterFollowers[x] - localTwitterFollowers[x];
    twitterLikes[x] = twitterLikes[x] - localTwitterLikes[x];
    totalReach[x] = totalReach[x] - localTotalReach[x];
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
}
