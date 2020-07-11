// NOTE:
// Primitive values: Numbers / Strings / Booleans / null / undefined / Symbol
// Reference Values: Everything else! (Objects, Arrays, DOM Nodes, other built-in objects, etc.)

const movieList = document.getElementById('movie-list');

movieList.style['background-color'] = 'red';
movieList.style.display = 'block';

const userChosenKeyName = 'level';

// NOTE: anything we can use as a variable can be used as a key-name (but not the other way around, i.e. key names are more flexible!):
let person = {
  'first name': 'Max',
  // NOTE: age (key) is coerced into a string by JS:
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  // NOTE: we can dynamically set or access properties inside an Object:
  [userChosenKeyName]: '...',
  greet: function () {
    alert('Hi there!');
  },
  1.5: 'hello',
};

// person.greet();

// person.age = 31;
delete person.age;
// NOTE: we should not really assign undefined to a value directly (only JS should), instead use null:
// person.age = undefined;
// person.age = null;
person.isAdmin = true;

console.log(person['first name']);

// NOTE: Object preserve the order of key-value pairs, with one exception (i.e. when keys are numbers).
// This makes sense, think of Arrays, which are Objects with number keys where the order is guaranteed (ascending)
const numbers = { 5: 'hi', 1: 'true' };
console.log(numbers);

const keyName = 'first name';
console.log(person[keyName]);
