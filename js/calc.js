var numberWithCommas = function(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var rounding = function(x, decimal=1) {
  return x.toFixed(decimal).toString();
};

function percentChange(data) {
  var totalViews = data[data.length - 1];
  var monthlyViews = totalViews - data[0];
  var monthlyChange = monthlyViews / totalViews * 100;
  return rounding(monthlyChange);
}
