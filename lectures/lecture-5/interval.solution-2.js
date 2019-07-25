// Solution to the class activity using setItnerval

var invokeTimes = function(func, num, time) {
    var count = 0;
    var timeoutHandler = function(){
        func(count);
        count += 1;
        if (count < num) setTimeout(timeoutHandler, time);
    };
    if (num > 0) setTimeout(timeoutHandler, time);
};

invokeTimes( function(count) { 
      console.log("Hello " + count);
   }, 10, 1000 );
