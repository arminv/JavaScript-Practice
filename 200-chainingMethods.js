// Note: we can chain multiple array methods, like map() and reduce():
const originalArray = [{ price: 10.99 }, { price: 5.99 }, { price: 29.99 }];
const sum = originalArray
  .map((obj) => obj.price)
  .reduce((sumVal, curVal) => sumVal + curVal, 0); // => 46.97
