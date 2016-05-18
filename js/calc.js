var numberWithCommas = function(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var rounding = function(x, decimal=1) {
  return x.toFixed(decimal).toString();
};
