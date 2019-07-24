function whenBothFinish (fn1, fn2, callback){
   /* 
    to implement: use setTimeout(___, Math.floor(Math.random()*1000))
                  for scheduling fn1 and fn2
    */
};

whenBothFinish(
   function(){ console.log(“fn1 finished!”); }, 
   function(){ console.log(“fn2 finished!”); }, 
   function(){ console.log(“Both functions finished!”); }
);

