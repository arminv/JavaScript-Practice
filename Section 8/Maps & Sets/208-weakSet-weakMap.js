// NOTE: with WeakSet() we can only store Objects (and Arrays as a result):

let person = { name: 'Max' };
const persons = new WeakSet();
persons.add(person);

// NOTE: WeakSet and WeakMap allow for garbage collection (even though we can't control when collection happens):
// ... some operations
// NOTE: now we can override (i.e. clear from heap) the same variable and use it for something else:
// person = null;

console.log(persons);

const personData = new WeakMap();
personData.set(person, 'Extra info!');

person = null;

console.log(personData);
