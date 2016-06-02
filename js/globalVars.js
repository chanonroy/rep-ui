// Global data Containers

  // Date
  var chartDateRange = [];

  // Twitch
  var twitchViews = [];
  var twitchFollowers = [];

  // YouTube
  var youtubeViews = [];
  var youtubeSubs = [];

  // Twitter
  var twitterFollowers = [];
  var twitterLikes = [];

  // Total Reach
  var totalReach = [];

  // Data Set Containers (chart.js stacked)
  var datasetContainer = [];
  var datasetPlatform = [];

// default big chart values
  var emptyData = [1000, 2500, 3000, 3250, 4000, 4500,
                   5000, 6000, 7500, 8000, 8500, 9500,
                   9555, 9558, 9900, 9924, 9956, 9998,
                   9999, 10232, 10111, 11232, 12342, 12377,
                   12455, 12433, 12445, 12449, 12666, 12777,];

  // Color selection Container
  var globalChartColors = ["15, 88, 121", "231, 148, 54", "146, 199, 121", "131, 140, 201", "141, 213, 214", "185, 134, 217", "250, 208, 92", "122, 200, 120", "224, 96, 79", "131, 190, 215"];
