// Solution to class activity on Slide 18

var EventEmitter = require('events').EventEmitter;
if (! EventEmitter) process.exit(1);
var fs = require("fs");

function registerEvents(emitter, keywords) {
};

// Read the contents of the file and setup the handlers to scan for words
var text = fs.readFileSync("sample.txt").toString();
var keywords = ["a", "the", "this", "is", "an", "test"];

var e = new EventEmitter();
var printCounts = registerEvents(e, keywords);

// Read the file contents and emit it to the stream one word at a time
printCounts();
// e.emit("the");
// e.emit("a");
// e.emit("the");
var words = text.split(" ");
words.forEach( function(word){
		e.emit(word.trim());	
	});
printCounts();

 

