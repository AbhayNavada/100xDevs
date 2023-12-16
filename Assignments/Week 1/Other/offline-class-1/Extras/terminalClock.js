// Create a terminal clock (HH:MM:SS)

setInterval(() => {

    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    if (hours < 10) {
        hours = "0" + hours.toString();
    }
    if (minutes < 10) {
        minutes = "0" + minutes.toString();
    }
    if (seconds < 10) {
        seconds = "0" + seconds.toString();
    }

    console.log(hours + ":" + minutes + ":" + seconds);

}, 1000);