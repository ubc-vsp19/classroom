var SuccessProbability = Math.pow(0.80, 1/6);		// 80% is overall success probability, 6 components in the system

function getDummyFunction(funcName){
    return function(arg){
        console.log("Called [" + funcName + "] >>>");
        return new Promise((resolve, reject)=> {
            var success = (Math.random() < SuccessProbability);	// outcome is successful 96.35% of the time
            var delay = Math.floor(Math.random() * 500) + 200;	// delay is 200 + randint(0,500) ms
            setTimeout(()=> {
                if (success){
                    console.log("    [" + funcName + "] resolved!");
                    resolve(Math.random());
                }
                else {
                    console.log("    [" + funcName + "] rejected!");
                    reject(new Error("Random error in " + funcName));
                }
            }, delay);
            console.log("    " + funcName + " returned a Promise object");
        });
    }
}

module.exports = {
    multiVarLinearRegression: getDummyFunction("multiVarLinearRegression"),
    tableRead: getDummyFunction("tableRead"),
    annotate: getDummyFunction("annotate"),
    decisionTreeTrain: getDummyFunction("decisionTreeTrain"),
    blobWrite: getDummyFunction("blobWrite"),
    mqttPublish: getDummyFunction("mqttPublish"),
}
