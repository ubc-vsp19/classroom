window.onload = function() {
	alert("document finished loading");
	var count = 0;
	var resetHandler = function(){
		// to implement
	};
	var upHandler = function(){
		// to implement
	};
	var downHandler = function(){
		// to implement
	};

	var resetBtn = document.getElementById("reset");
	var upBtn = document.getElementById("up");
	var downBtn = document.getElementById("down");
	resetBtn.addEventListener( "click", resetHandler, false);
	upBtn.addEventListener( "click", upHandler, false);
	downBtn.addEventListener( "click", downHandler, false);
}
