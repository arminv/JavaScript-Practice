class AgedPerson {
  printAge() {
    console.log(this.age);
  }
}

class Person extends AgedPerson {
  // NOTE: these fields added here are the same as adding them in the constructor() and after the super() call:
  name = 'Armin';

  // NOTE: if we don't want the optimization JS provide and want to create a method everytime one instance is created (as opposed to having the method shared via prototype) we have 2 options:
  constructor() {
    super();
    this.age = 30;
    // Option 1:
    // this.greet = function() {...}
  }

  // Option 2: one use case for this would be if this was going to be used with an event listener, so we can use arrow function (otherwise we would have to use bind() in traditional way)
  // greet = () => {
  //   console.log(`Hi, I am ${this.name} and I am ${this.age} years old!`);
  // };

  greet() {
    console.log(`Hi, I am ${this.name} and I am ${this.age} years old!`);
  }
}
const p = new Person();
const p2 = new Person();
console.log(p);
// NOTE: JS adds methods to the prototype for optimization purposes (because while properties are unique to each class, methods usually work the same and are independent)
console.log(p.__proto__ === p2.__proto__);
const button = document.getElementById('btn');
// NOTE: this would work fine with Option 2 (above - i.e. arrow functions):
button.addEventListener('click', p.greet);
// NOTE: but it would NOT work with the traditional way (i.e. using function keyword) and we would need to use bind() - this method performs slightly better (only if dealing with large number of instances!):
// button.addEventListener('click', p.greet.bind(p));

// ----------------------------------------------------------------------------------------------------------

// // NOTE: we can use functions instead of the constructor() function - starting with uppercase is only convention:
// function Person() {
//   this.age = 30;
//   this.name = 'Armin';
//   this.greet = function () {
//     console.log(`Hi, I am ${this.name} and I am ${this.age} years old!`);
//   };
// }
// NOTE: to replicate the optimization in classes (i.e. when methods are added in prototype and shared between all instances) we can do this:
// Person.prototype.greet = function () {
//   console.log(`Hi, I am ${this.name} and I am ${this.age} years old!`);
// };

// // NOTE: very much like static methods in classes, we can add methods/properties to a constructor function - however, these will NOT be added to the instances created by the constructor (only available to constructor itself):
// Person.describe = function () {
//   console.log('Creating persons...');
// };

// // NOTE: 'prototype' is used to assign/set a prototype to an object (i.e. to include something in '__proto__'):
// // NOTE: 'extends' automatically does this behind the scene (i.e. the commented out code above does the same thing):
// // Person.prototype = {
// //   printAge() {
// //     // NOTE: the 'this' keyword in prototypes  ALWAYS refers to the object that called it (i.e. the instance that calls the method):
// //     console.log(this.age);
// //   },
// // };
// // NOTE: a better approach is to just add our custom function to the existing prototype (instead of replacing it all together!):
// Person.prototype.printAge = function () {
//   console.log(this.age);
// };

// console.dir(Person);

// // NOTE: the 'new' keyword is important as it still creates an instance of Person - 'new' creates an Object (this={}) and then sets its properties:
// const p = new Person();
// p.greet();
// p.printAge();
// // NOTE: prototypes are just 'fallback objects' - they are just base classes.
// // NOTE: prototypes themselves are Objects
// // NOTE: In console, '__proto__' indicates prototypes. This is present for ALL objects in JS (functions, arrays, custom objects, etc.)!
// // NOTE: In console, 'prototype' property only exists for function objects (NOT all objects)!
// console.log(p);
// console.log(p.__proto__);
// console.log(p.toString());
// console.log(p.__proto__ === Person.prototype);

// // NOTE: the constructor here simply callse the Person function to create a new instance - this is a good approach when we don't have access to the constructor of a class:
// const p2 = new p.__proto__.constructor();
// console.log(p2);

// // NOTE: Object here is the global constructor function that is always available on JS:
// console.log(Object);
// console.dir(Object);
// // NOTE: the global fallback object (for all objects) is Object.prototype, NOT Object itself! By definition this prototype will NOT have a prototype:
// console.dir(Object.prototype);

const p = new Person();
console.log(p);
