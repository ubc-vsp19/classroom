function Car (name, power=1){
   this.name = name;
   this.power = power;
};
Car.prototype = {
  velocity: 0
};
Car.prototype.accelerate = function(fuel){
   this.velocity += fuel * this.power;
};
var myCar = new Car("Smart");
myCar.accelerate(10);
console.log( "velocity = " + myCar.velocity );

console.log(myCar.accelerate === Car.prototype.accelerate);
