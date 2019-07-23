// Solution to class activity

var popup = function(name) {
	var foo = alert;
	return function(e) {
		console.log(this);
		foo(name + " : " + e.target);
	}
};

window.onload = function() {
	alert("document finished loading");
	var setupBtn = document.getElementById("reset");
	var runBtn = document.getElementById("increment");
	var doneBtn = document.getElementById("done");
	setupBtn.addEventListener( "click", popup("setup"), false);
	runBtn.addEventListener( "click", popup("increment"), false);
	doneBtn.addEventListener( "click", popup("done"), false);
}
