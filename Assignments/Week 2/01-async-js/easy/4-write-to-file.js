// Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require("fs");

fs.writeFile("sample_text.txt", "Hi, this is Abhay!!!", (err) => {
    console.log(err);
});
