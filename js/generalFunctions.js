// ------------------------- GENERAL CALCS -------------------------------------

  // Return with commas in between
  var numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // numbers with commas, adds plus if positive
  function numberWithCommasPlus(x) {
    if (x > 0) {
      return '+' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  // Rounds integers and floats
  var rounding = function(x) {
    if (x < 0.1) {
      return x.toFixed(2).toString();
    }
    else {
      return x.toFixed(1).toString();
    }
  };

  // Calculates the percentage change in a data array
  function percentChange(data) {
    var last = data[data.length - 1];
    var change = last - data[0];
    var percent = change / last * 100;
    return rounding(percent);
  }

  // function to calculate abbreviated numbers (e.g. 1,000 is 1K)
  function toAbbrev(x) {
    var str = x.toString();
    if (str.length < 7){                   // 1,000 (1K)
      return str > 999 ? (Math.floor((str/1000) * 10 ) / 10).toString() + 'K' : str;
    }
    else if (str.length < 10){                  // 1,000,000 (1M)
      return str > 999999 ? (Math.floor((str/1000000) * 10 ) / 10).toString() + 'M' : str;
    }
    else {                                    // 1,000,000,000 (1B)
      return str > 999999999 ? (Math.floor((str/1000000000) * 10 ) / 10).toString() + 'B' : str;
    }
  }

  // checks whether value is positive or negative and returns HTML element for arrow indicator
  function htmlPercentChange(x) {
    if (x > 0) {
      return '<h3 class="percentChange-green"> <i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i> <span>' + x + '%</span> </h3>';
    }
    else {
      return '<h3 class="percentChange-red"> <i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i> <span>' + x + '%</span> </h3>';
    }
  }

  // Gets the current date using JavaScript and fills the dates global variable for 30 days
  function getDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var date = today.getDate();

    for(var i=0; i<31; i++){
      var day = new Date(year, month, date - i);
      chartDateRange.unshift(String(day).substring(4,10).replace(/\b0+/g, ''));}
  }

  // checks the status of the green/red boolean in the AJAX call and returns an HTML color
  function statusChecker(green, red) {
    if (green === true && red === true) {
      return "#D79D45"; // for incomplete data
    }
    else if (green === true && red === false) {
      return "#438a4c"; // for complete data
    }
    else {
      return "#CA4448"; // for missing data
    }
  }

  // check if an outlying zero is present from API problems (currently set to fix 1 zero)
  function outlierChecker(array) {
    for (var x = 0; x < array.length + 1; x++) {
      if (array[x - 1] > 0 && array[x] === 0 && array[x + 1] > 0) {
        array[x] = array[x - 1];
      }
    }
    return array;
  }
