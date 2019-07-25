function randInt(){
  return Math.floor(Math.random() * 2000);
}

function whenBothFinish (fn1, fn2, callback){
   /* 
    to implement: use setTimeout(___, Math.floor(Math.random()*1000))
                  for scheduling fn1 and fn2
    */
   var fn1_done = false;
   var fn2_done = false;

   function checkFlagsAndCallback(){
      if (fn1_done && fn2_done) callback();
   }

   setTimeout(function(){
      fn1();
      fn1_done = true;
      checkFlagsAndCallback();
   }, randInt());

   setTimeout(function(){
      fn2();
      fn2_done = true;
      checkFlagsAndCallback();
   }, randInt());

};

whenBothFinish(
   function(){ console.log('fn1 finished!'); }, 
   function(){ console.log('fn2 finished!'); }, 
   function(){ console.log('Both functions finished!'); }
);

console.log("Called whenBothFinish");


