// ------------------------- DEFAULT CONTENT -----------------------------------

  // fills global date variable for last 30 days (generalFunctions.js)
  getDate();

  // (dataset1, dataset2, dataset3, labels) - produce default bigChart on page load (generalFunctions.js)
  makeBigChart(
    dataSetGen("Views", "rgba(32, 162, 219, 0)", "rgba(88, 167, 210, 0)", "white", 4, noData),
    emptyDataset, // emptyDataset located in chartFunctions.js
    emptyDataset.slice(0,2),
    chartDateRange);

  // make smaller charts, params = selector, background, border (generalFunctions.js)
  makeChart('box1', noData, chartDateRange, "rgba(100, 65, 165, 0)", "rgba(100, 65, 165, 0)");
  makeChart('box2', noData, chartDateRange, "rgba(229, 45, 39, 0.4)", "rgba(229, 45, 39, 0)");
  makeChart('box3', noData, chartDateRange, "rgba(85, 172, 238, 0.4)", "rgba(85, 172, 238, 0)");
  makeChart('box4', noData, chartDateRange, "rgba(100, 65, 165, 0.4)", "rgba(100, 65, 165, 0)");
  makeChart('box5', noData, chartDateRange, "rgba(229, 45, 39, 0.4)", "rgba(229, 45, 39, 0)");
  makeChart('box6', noData, chartDateRange, "rgba(85, 172, 238, 0.4)", "rgba(85, 172, 238, 0)");
  makeChart('box7', noData, chartDateRange, "rgba(59, 89, 152, 0.4)", "rgba(59, 89, 152, 0)");

// ------------------------------ BUTTONS --------------------------------------

  // [ ** BUTTON ** ] - ADD PLAYER
  $('#addPlayer').click(function() {
    var twitchID = prompt("Please enter the streamer's TwitchID");

    // remove default streamer placeholder
    $("#team-default").remove();

    // make AJAX get request for streamer in Repable API
    $.ajax({
       type: 'GET',
       url: 'http://52.25.105.60/all/' + twitchID,
       dataType: "json",
       success: function(object) {
        //  var totalViews = object.maxViewsFromUser[0].views;
        //  var maxFollowers = object.maxFollowersFromUserFromUser[0].followers;

         // Parsing name (sometimes the name is null)
         var name;
         if (object.display_nameFromUser[0].display_name === null) {
           name = twitchID;
          //  console.log("twitchID not in database");
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
         var localFacebookLikes = [];

         // booleans to check scraping status
         var twitchGreen = false;
         var twitchRed = false;
         var youtubeGreen = false;
         var youtubeRed = false;
         var twitterGreen = false;
         var twitterRed = false;
         var facebookGreen = false;
         var facebookRed = false;

         for (var i=0; i < 744 + 1; i += 24) { // 24 objects per day, 720 per month
           // Twitch Monthly Views
           if (object.viewsFromMetrics[i] !== undefined) { localTwitchViews.unshift(Number(object.viewsFromMetrics[i].views)); twitchGreen = true;}
           else { localTwitchViews.unshift(0); twitchRed = true;}
           // Twitch Monthly Followers
           if (object.followersFromMetrics[i] !== undefined) { localTwitchFollowers.unshift(Number(object.followersFromMetrics[i].followers)); }
           else { localTwitchFollowers.unshift(0); }
           // YouTube Monthly Views
           if (object.viewsFromYoutube[i] !== undefined) { localYoutubeViews.unshift(Number(object.viewsFromYoutube[i].views)); youtubeGreen = true;}
           else { localYoutubeViews.unshift(0); youtubeRed = true;}
           // YouTube Monthly Subs
           if (object.subscribersFromYoutube[i] !== undefined) { localYouTubeSubs.unshift(Number(object.subscribersFromYoutube[i].subscribers)); }
           else { localYouTubeSubs.unshift(0); }
           // Twitter Monthly Followers
           if (object.followersFromTwitter[i] !== undefined) { localTwitterFollowers.unshift(Number(object.followersFromTwitter[i].followers)); twitterGreen = true;}
           else { localTwitterFollowers.unshift(0); twitterRed = true;}
           // Twitter Monthly Likes
           if (object.likesFromTwitter[i] !== undefined) { localTwitterLikes.unshift(Number(object.likesFromTwitter[i].likes)); }
           else { localTwitterLikes.unshift(0); }
           // Facebook Monthly Likes
           if (object.likesFromFacebook[i] !== undefined) { localFacebookLikes.unshift(Number(object.likesFromFacebook[i].likes)); facebookGreen = true;}
           else { localFacebookLikes.unshift(0); facebookRed = true;}
         }

         function appendAndUpdate(photo) {
           // calculate the present total
           var totViews = localTwitchViews[localTwitchViews.length - 1] + localYoutubeViews[localYoutubeViews.length - 1];
           var totFollow = localTwitchFollowers[localTwitchFollowers.length - 1] + localYouTubeSubs[localYouTubeSubs.length - 1] + localTwitterFollowers[localTwitterFollowers.length - 1];
           var totLikes = localTwitterLikes[localTwitterLikes.length - 1] + localFacebookLikes[localFacebookLikes.length - 1];

           // dom injection for storage (callback from twitchPhoto())
           $('#team').append(
              '<div id="' + name + '" class="team-player">' +
              '<span> -- </span>' +
              '<span> <div> <img src="' + photo + '">' + name + '</div> <div> <i style="color:' + statusChecker(twitchGreen, twitchRed) + '" class="fa fa-twitch fa-fw"></i> <i style="color:' + statusChecker(youtubeGreen, youtubeRed) + '"class="fa fa-youtube-play fa-fw"></i> <i style="color:' + statusChecker(twitterGreen, twitterRed) + '"class="fa fa-twitter fa-fw"></i><i style="color:' + statusChecker(facebookGreen, facebookRed) + '"class="fa fa-facebook fa-fw"></i></div></span>' +
              '<span>' + numberWithCommas(totViews) + '</span>' +
              '<span>' + numberWithCommas(totFollow) + '</span>' +
              '<span>' + numberWithCommas(totLikes) + '</span>' +
              '<span> <button class="remove"> <i class="fa fa-trash fa-fw" aria-hidden="true"></i> </button> </span>' +
              '<span class="hidden viewsData">' + localTwitchViews + '</span>' +
              '<span class="hidden followerData">' + localTwitchFollowers + '</span>' +
              '<span class="hidden youtubeViewData">' + localYoutubeViews + '</span>' +
              '<span class="hidden youtubeSubData">' + localYouTubeSubs + '</span>' +
              '<span class="hidden twitterFollowData">' + localTwitterFollowers + '</span>' +
              '<span class="hidden twitterLikeData">' + localTwitterLikes + '</span>' +
              '<span class="hidden facebookLikeData">' + localFacebookLikes + '</span>' +
              '</div>');

              // recalculates global container values and redraws the charts (generalfunctions.js)
              update(name);
          }

         // gets twitch photo (async)
         function twitchPhoto(name) {
           $.getJSON( "https://api.twitch.tv/kraken/users/" + name, function( data ) {
         	   if (data.logo !== null) {
               var twitchDisplay = data.logo;
               appendAndUpdate(twitchDisplay);
               $('.profile-players').append('<span id="' + name + '-photo"><img src="' + twitchDisplay + '"></span>');
         	   }
             else {
              var twitchDisplayAlt = 'img/repthumb.png';
              appendAndUpdate(twitchDisplayAlt);
              $('.profile-players').append('<span id="' + name + '-photo"><img src="' + twitchDisplayAlt + '"></span>');
             }
           });
         }

        // grabs twitch profile photo from Twitch API and do a callback for appendAndUpdate
        twitchPhoto(name);

       } // -- success
    }); // -- ajax
  }); // -- button

  // [ ** BUTTON ** ]  - REMOVE PLAYER
  $('#team').on('click', '.remove', function() {
  	var name = $(this).parent().parent().attr('id');
    removePlayer(name);// remove player and recalculate (generalFunctions.js)
    $('#' + name).remove();
    $('#' + name + '-photo').remove();
  });

  // [ ** BUTTON ** ]  - BIG CHART TABS
  $("#chart1-streamer").click(function(){
	  $("#bigChartContainer").hide();
    $("#bigChartContainer3").hide();
	  $("#bigChartContainer2").show();
  });

  $("#chart1-platform").click(function(){
  	 $("#bigChartContainer").hide();
     $("#bigChartContainer2").hide();
  	 $("#bigChartContainer3").show();
  });

  $("#chart1-combined").click(function(){
  	 $("#bigChartContainer3").hide();
     $("#bigChartContainer2").hide();
  	 $("#bigChartContainer").show();
  });
