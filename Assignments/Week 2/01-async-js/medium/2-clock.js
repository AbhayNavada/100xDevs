// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

let currentTime = null;
let hours = null;
let minutes = null;
let seconds = null;
let amPm = null;

setInterval(() => {

    currentTime = new Date();
    hours = currentTime.getHours();
    minutes = currentTime.getMinutes();
    seconds = currentTime.getSeconds();

    if (hours < 10) {
        hours = "0" + hours.toString();
    }
    if (minutes < 10) {
        minutes = "0" + minutes.toString();
    }
    if (seconds < 10) {
        seconds = "0" + seconds.toString();
    }

    // 24-hour clock
    console.log(hours + ":" + minutes + ":" + seconds);

    if (parseInt(hours) > 12) {
        hours = parseInt(hours) - 12;
        amPm = "PM";
    } else {
        amPM = "AM";
    }

    //12-hour clock
    console.log(hours + ":" + minutes + ":" + seconds + " " + amPm);

}, 1000);