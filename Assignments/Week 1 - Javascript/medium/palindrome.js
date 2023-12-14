/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let regex = /^[a-z]+$/;
  let strList = [];

  for (let i = 0; i < str.length; i++) {
    if (regex.test(str[i].toLowerCase())) {
      strList.push(str[i].toLowerCase());
    }
  }

  let i = 0;
  let j = strList.length - 1;

  while (i < j) {
    if (strList[i] != strList[j]) {
      return false;
    }
    i++;
    j--;
  }

  return true;
}

module.exports = isPalindrome;
