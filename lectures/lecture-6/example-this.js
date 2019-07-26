function accelerate (fuel){
  this.velocity += fuel * this.power;
  console.log(this);
}
var myCar = {
  name: "Smart",
  power: 1,
  velocity: 0,
  accelerate: accelerate
}
myCar.accelerate(10);
accelerate.bind(myCar)(12);
