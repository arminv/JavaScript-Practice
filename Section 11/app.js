// class Person {
//   name = 'Armin';

//   constructor() {
//     this.age = 30;
//   }

//   greet() {
//     console.log(`Hi, I am ${this.name} and I am ${this.age} years old!`);
//   }
// }

// NOTE: we can use functions instead of constructor() function:
function Person() {
  this.age = 30;
  this.name = 'Armin';
  this.greet = function () {
    console.log(`Hi, I am ${this.name} and I am ${this.age} years old!`);
  };
}

const person = new Person();
person.greet();
