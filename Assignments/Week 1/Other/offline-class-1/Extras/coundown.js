// Create a counter in Javascript (counts down from 30 to 0)
let counter = 30;

const timer = setInterval(() => {

    console.log(counter);

    if (counter > 0) {
        counter--;
    } else {
        clearInterval(timer);
    }
}, 1000);
