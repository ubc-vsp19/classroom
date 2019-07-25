// Solution to the class activity using setItnerval

var invokeTimes = function(func, num, time) {
    var count = 0;
    var interval;
    var intervalHandler = function(){
        func(count);
        count += 1;
        if (count === num) clearInterval(interval);
    }
    if (num > 0) interval = setInterval(intervalHandler, time);
};

invokeTimes( function(count) { 
      console.log("Hello " + count);
   }, 10, 1000 );
