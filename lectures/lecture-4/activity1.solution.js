function map (list, f){
   // to implement
   var arr = [];
   for (var i of list){
      var item = f(list[i]);
      arr.push(item);
   }
   return arr;
};

var myList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var tList = map(myList, function (item){
   return item + 5;
});
console.log(tList);     // prints: 5, 6, 7, 8, 9, 10, 11, 12, 13, 14

