//Calculate the time it takes between a setTimeout call and the inner function actually running

let duration = 1000;
let startTime = new Date();

setTimeout(function() {

    let endTime = new Date();
    let timeTaken = endTime - startTime;

    console.log("The time in between the setTimeout call and the inner function actually running is: " + timeTaken/1000 + " seconds");

}, duration);