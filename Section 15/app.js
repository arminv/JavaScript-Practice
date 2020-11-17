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

// NOTE: In general we prefer pure functions over normal ones as they are more predictable.
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// Factory Functions & closures:
// NOTE: every function in JS is a closure because it 'closes over' all the variables in its environment and stores their value!
// NOTE: the inner function gets created only when we call the outer function.

let multiplier = 1.1;

function createTaxCalculator(tax) {
  function calculateTax(amount) {
    console.log(multiplier);
    return amount * tax * multiplier;
  }

  return calculateTax;
}

// const vatAmount = calculateTax(100, 0.19);
// const incomeTax = calculateTax(100, 0.25);

// NOTE: by using factory functions, we can instead use - this way we don't have to pass in tax rate as and arg, we only need to pass amount:
const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

// NOTE: unlike 'tax' variable that gets locked in, this new/updated variable will be used inside the calculateTax() function - i.e. it is NOT 'locked in' as it was defined in the global scope:
multiplier = 1.2;

console.log(calculateVatAmount(100));
console.log(calculateIncomeTaxAmount(100));

let userName = 'Armin';

function greetUser() {
  // let name = userName;
  // NOTE: when it comes to 'shadowing', the (inner) function scope has priority over the global one:
  let name = 'Anna';
  console.log('Hi' + name);
}

let name = 'Max';
userName = 'AV';
greetUser();

// NOTE: in theory, closures can be inefficient in terms of memory (as each function has access to all the global variables, etc.)
// However, in practice JS engines are smart and optimized, so that if a function doesn't use a variable, they get rid of that to save memory!

// NOTE: In JavaScript - especially in older scripts - you sometimes find a pattern described as "IIFEs". IIFE stands for "Immediately Invoked Function Expression"
// Nowadays, this is not really required anymore. With let and const we got block scope and if you want to restrict where variables are available (outside of functions, if statements, for loops etc - where you automatically have scoped variables since these structures create blocks),
// you can simply wrap the code that should have scoped variables with {}.
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// Recursion:

// function powerOf(x, n) {
//   let result = 1;

//   for (let i = 0; i < n; i++) {
//     result *= x;
//   }

//   return result;
// }

// console.log(powerOf(2, 3));

// The recursive version of above is:

function powerOf(x, n) {
  // if (n === 1) {
  //   return x;
  // }

  // return x * powerOf(x, n - 1);

  // The shortest way to implement this function would be:
  return n === 1 ? x : x * powerOf(x, n - 1);
}

console.log(powerOf(2, 3));
