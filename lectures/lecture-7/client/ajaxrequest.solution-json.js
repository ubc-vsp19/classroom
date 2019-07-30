// Example of AJAX request
// - makes GET request to a public endpoint
// - expects a JSON response from the public endpoint

window.onload = function() {
	var inflight = [];	// Array to keep all the XMLHttpRequests
	var count = 0;		// Just keeping count of how many requests are made

	// helper function for removing the request from the inflight array
	// will be called in the XMLHttpRequest event handlers
	var removeRequest = (req)=> {
		var index = inflight.indexOf(req);
		if (index > -1) inflight.splice(index, 1);
		else alert(req.toString() + " not found !");
	}

	// Function for sending the request, attached as the click event listener
	var sendRequest = (url)=> {
		var label = "Request " + count;		// Just some label for readability
		var req = new XMLHttpRequest();		// Create the actual XMLHttpRequest object
		req.open("GET", url);			// Configure the connection with HTTP method and URL

		// On Load handler
		req.onload = ()=> {
			if (req.status === 200) {
				if (req.getResponseHeader("Content-Type").indexOf("application/json") > -1){
					console.log(label + " : Received JSON Message");
					var payload = JSON.parse(req.responseText);
					console.log(payload);
				}
				else {
					console.log(label + " : Received Text Message");
					console.log(req.responseText);
				}
			} else {	
				console.log(label + " : Received error code : " + req.status);
			}
			removeRequest(req);
		};		
		// On Timeout handler
		req.ontimeout = ()=> {
			console.log(label + " : Timed out after " + req.timeout + " ms");
			removeRequest(req);
		}
		// On Error handler
		req.onerror = ()=> {
			console.log(label + " : Resulted in an error !");
			removeRequest(req);
		};
		// On Abort handler
		req.onabort = ()=> {
			console.log(label + " : Aborted");
			removeRequest(req);
		};

		// Overriding the toString method to print the label instead
		// (used in removeRequest)
		req.toString = ()=> {
			return label;
		};

		// All the handlers are setup, so send the message
		req.timeout = 5000;	 // Wait at most 5000 ms for a response
		console.log("Sending request " + req);
		inflight.push(req);	 // Add it to the inflight messages Array before sending it
		req.send();
	}

	// Function for cancelling the last request, attached as the click event listener
	var cancelRequest = ()=> {
		if (inflight.length > 0) {
			inflight[inflight.length - 1].abort();
		} else {
			alert("No messages in flight");
		}
	};

	// var URL = "https://reqres.in/api/users?page=1";		// hard-coded RESTful endpoint
	var URL = "https://jsonplaceholder.typicode.com/posts/1";	// hard-coded RESTful endpoint

	// Find the buttons from the DOM and attach listeners
	var ok = document.getElementById("OK");
	ok.addEventListener("click", ()=> {
		sendRequest(URL);
		count += 1;
	}, false);	// sendRequest upon button click

	var cancel = document.getElementById("Cancel");
	cancel.addEventListener("click", cancelRequest, false);	// cancel last sent request

	// Set up an interval handler for printing inflight messages
	setInterval(()=> {
		if (inflight.length > 0) {
			var msg = "In flight messages : ";
			for (var i = 0; i < inflight.length; i++) {
				msg = msg + " (" + inflight[i] + ")";
			}
			console.log(msg);
		}
	}, 1000);			// Display the inflight list
}
