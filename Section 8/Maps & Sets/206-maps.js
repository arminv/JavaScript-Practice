const person1 = { name: 'Max' };
const person2 = { name: 'Manuel' };

// NOTE: a map can be initialized with an array of arrays (i.e. each array is a key-value pair):
const personData = new Map([[person1, [{ date: 'yesterday', price: 10 }]]]);

personData.set(person2, [{ date: 'two weeks ago', price: 100 }]);

console.log(personData);
// NOTE: here the key is an Object, so we can easily pass it to the get() method of maps:
console.log(personData.get(person1));

// NOTE: we can have keys of mixed types (one is an Object, another is string, etc.)
for (const [key, value] of personData.entries()) {
  console.log(key, value);
}

for (const key of personData.keys()) {
  console.log(key);
}

for (const value of personData.values()) {
  console.log(value);
}

// NOTE: size() returns the number of key-value pairs:
console.log(personData.size);
