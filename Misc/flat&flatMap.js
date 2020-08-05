// https://www.youtube.com/watch?v=jkpGDFoWcyI

// flat:
const someArray = ['Armin', ['Shervin', ['Arm', ['Sher']]], 'Varshokar'];

// NOTE: flat() gives the value of 1 by default (i.e. flat(1)) to flatten only once:
someArray.flat();

// NOTE: a cool trick to flatten completely is to use Infinity as argument:
someArray.flat(Infinity);

// flatMap: this maps through the array and then flattens it:
someArray.flatMap((item) => {
  return item.split('');
});

// NOTE: All browsers except IE support these (so will need a polyfill with IE)!
