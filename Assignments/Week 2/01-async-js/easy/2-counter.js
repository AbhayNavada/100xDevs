// Counter without setInterval

//Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

counter = 0;

function countDown() {
    console.log(counter);
    counter++;
    setTimeout(countDown, 1000);
}

countDown();








































































// (Hint: setTimeout)