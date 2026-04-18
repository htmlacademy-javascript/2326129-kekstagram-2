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

function isMeetOvertime(startWork, endWork, startMeet, durationMeet) {

  let startWorkTime = parseInt(startWork.split(':')[0], 10) * 60 + parseInt(startWork.split(':')[1], 10);

  let endWorkTime = parseInt(endWork.split(':')[0], 10) * 60 + parseInt(endWork.split(':')[1], 10);

  let startMeetTime = parseInt(startMeet.split(':')[0], 10) * 60 + parseInt(startMeet.split(':')[1], 10);

  let endMeetTime = startMeetTime + durationMeet;

  return startMeetTime >= startWorkTime && endMeetTime <= endWorkTime;
}

console.log(isMeetOvertime('08:00', '17:30', '14:00', 90)); // true
console.log(isMeetOvertime('8:0', '10:0', '8:0', 120));     // true
console.log(isMeetOvertime('08:00', '14:30', '14:00', 90)); // false
console.log(isMeetOvertime('14:00', '17:30', '08:0', 90));  // false
console.log(isMeetOvertime('8:00', '17:30', '08:00', 900)); // false
