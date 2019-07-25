window.onload = function() {
	alert("document finished loading");
	var count = 0;
	var resetHandler = function(){
		count = 0;
		console.log(count);
	};
	var upHandler = function(){
		count ++;
		console.log(count);
	};
	var downHandler = function(){
		count --;
		console.log(count);
	};

	var resetBtn = document.getElementById("reset");
	var upBtn = document.getElementById("up");
	var downBtn = document.getElementById("down");
	resetBtn.addEventListener( "click", resetHandler, false);
	upBtn.addEventListener( "click", upHandler, false);
	downBtn.addEventListener( "click", downHandler, false);
}
