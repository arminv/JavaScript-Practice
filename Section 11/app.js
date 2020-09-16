// class AgedPerson {
//   printAge() {
//     console.log(this.age);
//   }
// }

// class Person extends AgedPerson {
//   name = 'Armin';

//   constructor() {
//     super();
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

// NOTE: 'prototype' is used to assign/set a prototype to an object (i.e. to include something in '__proto__'):
// NOTE: 'extends' automatically does this behind the scene (i.e. the commented out code above does the same thing):
// Person.prototype = {
//   printAge() {
//     // NOTE: the 'this' keyword in prototypes  ALWAYS refers to the object that called it (i.e. the instance that calls the method):
//     console.log(this.age);
//   },
// };
// NOTE: a better approach is to just add our custom function to the existing prototype (instead of replacing it all together!):
Person.prototype.printAge = function () {
  console.log(this.age);
};

console.dir(Person);

// NOTE: the 'new' keyword is important as it still creates an instance of Person - 'new' creates an Object (this={}) and then sets its properties:
const p = new Person();
p.greet();
p.printAge();
// NOTE: prototypes are just 'fallback objects' - they are just base classes.
// NOTE: prototypes themselves are Objects
// NOTE: In console, '__proto__' indicates prototypes. This is present for ALL objects in JS (functions, arrays, custom objects, etc.)!
// NOTE: In console, 'prototype' property only exists for function objects (NOT all objects)!
console.log(p.__proto__);
console.log(p.__proto__ === Person.prototype);

// NOTE: the constructor here simply callse the Person function to create a new instance - this is a good approach when we don't have access to the constructor of a class:
const p2 = new p.__proto__.constructor();
console.log(p2);
