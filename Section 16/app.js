// NOTE: all numbers in JS are floating point (e.g. 3 will be saved as 3.0, etc.)
// NOTE: there are minimum and maximum bounds for numbers in JS:
console.log(Number.MAX_SAFE_INTEGER); // Biggest integer possible (it is 2^53 - 1)
console.log(Number.MAX_VALUE); // Biggest floating number possible
console.log(Math.pow(2, 53) - 1);

console.log(Number.MIN_SAFE_INTEGER); // Smallest integer possible
console.log(Number.MIN_VALUE); // Smallest floating number possible

// NOTE: because JS converts numbers into binary format and then back to decimal, sometimes we have issues with accuracy:
console.log(0.2 + 0.4 === 0.6); // false

// MORE INFO:
// https://stackoverflow.com/questions/11695618/dealing-with-float-precision-in-javascript
// https://en.wikipedia.org/wiki/Floating-point_arithmetic
// https://2ality.com/2012/04/number-encoding.html

// NOTE: we can see the binary representation of a decimal number like this:
console.log((1).toString(2)); // 2 specifies the base (binary in this case)
// NOTE: same way that for example 1/3 cannot be calculated exactly, some fractions cannot be precisely represented by the binary system
console.log((1 / 5).toString(2));

// NOTE: for representation purposes, toFixed() is good enough. However, for accuracy of calculations themselves,
// we can do this 'trick' - multiply by 100 to ensure we work with 'integers' (not 100% true as all numbers are floating in JS)
// alternatively, use 3rd party libraries to help.
console.log(20.2 * 100);

// NOTE: BigInt is a primitive type that allows us to represent numbers that are bigger than MAX_SAFE_INTEGER:
// we can create a BigInt by adding an 'n' at the end of our numbers:
console.log(90071992547409919n);
console.log(-90071992547409919n);
console.log(90071992547409919989284939374987348729882n);
// NOTE: there are NO DECIMALS when working with BigInt type! As a result, some fractions will lose their decimals:
console.log(5n / 2n);
// NOTE: we CANNOT MIX BigInt with other number types!
// NOTE: we can convert BigInt to normal numbers and vice versa like this:
console.log(parseInt(10n) - 4);
console.log(10n - BigInt(4));

// NOTE: There are some special types of number in JS:
console.log(Number.POSITIVE_INFINITY);
console.log(Infinity);
console.log(-Infinity);
console.log(1 / 0); // Infinity

// NOTE: we can check if a number is finite or not:
console.log(Number.isFinite(10));
console.log(Number.isFinite(Infinity));

