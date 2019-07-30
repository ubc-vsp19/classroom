
window.onload = function() {
	var ok = document.getElementById("OK");
	ok.addEventListener("click", /* to implement */, false);	// sendRequest upon button click

	var cancel = document.getElementById("Cancel");
	cancel.addEventListener("click", /* to implement */, false);	// cancel last sent request
	setInterval(/* to implement */, 1000);			// Display the inflight list
}
