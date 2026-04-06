function checkLengthString(string = '', number = 1) {
  return string.length <= number;
}

function isPalindrome(string = '') {
  const normalizeString = string.replaceAll(' ', '').toLowerCase();
  const reverseString = normalizeString.split('').reverse().join('');
  return normalizeString === reverseString;
}

function getNumbers(string = '') {
  const str = String(string);
  let result = '';
  for(const sign of str) {
    if(!isNaN(parseInt(sign, 10))) {
      result += sign;
    }
  }
  return parseInt(result, 10);
}
