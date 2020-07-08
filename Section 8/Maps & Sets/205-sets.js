// NOTE: we can pass any iterable to the Set() constructor:
const ids = new Set(['Hi', 'from', 'set!']);
ids.add(2);
// NOTE: there is no 'get' value for a set as we only need to check if a set 'has' a certain value or not:
if (ids.has('Hi')) {
  // NOTE: trying to delete a value that does not exist in the set will be simply ignored (no errors, etc will be thrown)
  ids.delete('Hi');
}

// NOTE: entries() method returns two values (in both sets and maps):
// NOTE: we can instead use values() to get the values in a set once:
for (const entry of ids.entries()) {
  console.log(entry[0]);
}

// NOTE: example use-case for sets: in a large application we want to store user ids (to save memory, etc.)
