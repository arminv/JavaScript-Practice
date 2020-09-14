// class Person {
//   name = 'Armin';

//   constructor() {
//     this.age = 30;
//   }

//   greet() {
//     console.log(`Hi, I am ${this.name} and I am ${this.age} years old!`);
//   }
// }

// NOTE: we can use functions instead of the constructor() function - starting with uppercase is only convention:
function Person() {
  this.age = 30;
  this.name = 'Armin';
  this.greet = function () {
    console.log(`Hi, I am ${this.name} and I am ${this.age} years old!`);
  };
}

// NOTE: the 'new' keyword is important as it still creates an instance of Person - 'new' creates an Object (this={}) and then sets its properties:
const person = new Person();
person.greet();
