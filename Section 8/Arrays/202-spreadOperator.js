const nameFragments = ['Max', 'Schwarz'];
const name = nameFragments.join(' ');

nameFragments.push('MR');
const copiedNameFragments = [...nameFragments];

console.log('nameFragments', nameFragments);
console.log('copiedNameFragments', copiedNameFragments);

const prices = [10.99, 5.99, 3.99, 6.59];

console.log('MIN:', Math.min(...prices));

// ----------------------
// NOTE: Objects inside and array are only references,
const persons = [
  { name: 'Max', age: 30 },
  { name: 'Manuel', age: 31 },
];

const copiedPersons = [...persons];

persons.push({ name: 'Anna', age: 29 });
// NOTE: hence changing the first person's name in the original array will also be reflected in the copied one!
persons[0].age = 31;

// NOTE: to get around this behaviour, we can do:
const copiedPersonsReal = persons.map((person) => ({
  name: person.name,
  age: person.age,
}));

console.log(persons, copiedPersons);
console.log(persons, copiedPersonsReal);
