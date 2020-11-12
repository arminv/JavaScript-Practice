// NOTE: a 'pure function': 1) Returns the same output for the same input 2) Does NOT have any side effects (i.e. do not change anything outside the function):
function add(num1, num2) {
  return num1 + num2;
}

console.log(add(1, 5)); // 6
console.log(add(12, 15)); // 27

// NOTE: this is not a pure function (it violates rule #1):
function addRandom(num1) {
  return num1 + Math.random();
}

console.log(addRandom(5));

// NOTE: this is not a pure function (it violates rule #2):
let previousResult = 0;

function addMoreNumbers(num1, num2) {
  const sum = num1 + num2;
  previousResult = sum;
  return sum;
}

console.log(addMoreNumbers(1, 5));

// NOTE: this is not a pure function (it violates rule #2) - inside the function we do NOT make a copy of the array (hobbies), but instead operate on the original array - it's a side effect!:
const hobbies = ['Sports', 'Cooking'];

function printHobbies(h) {
  h.push('NEW HOBBY!');
  console.log(h);
}

printHobbies(hobbies);
