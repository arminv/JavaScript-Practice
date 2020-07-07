const data = 'new york;10.99;2000';

const transformedData = data.split(';');

console.log(transformedData);
console.log(+transformedData[1]);

const nameFragments = ['Max', 'Schwarz'];
const name = nameFragments.join(' ');
console.log('name', name);
