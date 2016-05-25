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
        chartDateRange.unshift(String(day).substring(4,10).replace(/\b0+/g, ''));
  }
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
