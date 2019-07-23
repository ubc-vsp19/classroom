// This is the solution to the class activity

var changeImages = function(id,  offset) {

	// Get the images rooted at div 
	var div = document.getElementById(id);
	var imgtags = div.getElementsByTagName("img");

	// Nested function to rotate the images above
	function changeImage() {
		if (imgtags.length==0) return;
		var first = imgtags[0].src;
		for (var i=0; i<imgtags.length; i++) {
			var img = imgtags[i];
			var nextIndex = (i + 1);
			console.log("Replacing " + i + " with " + nextIndex); 
			if (nextIndex==imgtags.length) 
				img.src = first;
			else
				img.src = imgtags[nextIndex].src;
		}
	}
	
	for (var k=0; k<offset; k++)
		changeImage();
}

window.onload = function() {
	setInterval(function() { 
		changeImages("parent", 1);
	}, 5000);
};
