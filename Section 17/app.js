// NOTE: JS is single-threaded, but it offloads longer-taking tasks to the browser (which uses multiple threads).

// NOTE: a promise can be either:
// 1) Resolved : Promise is resolved => then() executes
// 2) Pending : Promise is doing work, neither then() nor catch() executes at this moment
// 3) Rejected : Promise was rejected => catch() executes

// NOTE: additional learning resources:
// - https://web.dev/promises/
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success);
      },
      (error) => {
        // NOTE: reject() will mark the promise as failed:
        reject(error);
      },
      opts
    );
  });
};

const setTimer = (duration) => {
  // NOTE: the function inside Promise() will be executed when the promise is created:
  const promise = new Promise((resolve, reject) => {
    // NOTE: we are essentially 'promisifying a built-in API' (setTimeout() in this case) here:
    setTimeout(() => {
      // NOTE: the browser passes 'resolve' and 'reject' to the promise by default:
      resolve('DONE!');
    }, duration);
  });

  return promise;
};

// NOTE: async/await uses promises under the hood - it wraps everything in one big promise - it doesn NOT change the way JS executes:
// NOTE: async/await can ONLY be used INSIDE functions - one way around this is to use IIFEs.
async function trackUserHandler() {
  // let positionData;
  // NOTE: with async/await, we can use the normal (synchronous) error handling:
  let posData;
  let timerData;
  try {
    posData = await getPosition();
    timerData = await setTimer(2000);
  } catch (error) {
    console.log(error);
  }
  // NOTE: compared to the promise/.then() approach, these consoles execute only after
  // the try/catch block (whereas with promises the would have got executed right away, i.e. before the async parts!):
  console.log('Clicked!');
  console.log(timerData, posData);

  // NOTE: the promise-based version is better than callback approach...:
  // .then(
  //   (posData) => {
  //     positionData = posData;
  //     // NOTE: we can 'chain' promises like this (note the second then()):
  //     // NOTE: we do NOT have to return a promise based function, it can be anything (e.g. a string - which will be resolved immediately!):
  //     return setTimer(2000);
  //   },
  //   // NOTE: then() accepts a second argument for handling errors:
  //   (err) => {
  //     console.log(err);
  //   }
  // )

  // NOTE: alternatively, we can use catch() for error handling (instead of passing a second argument to then()):
  // NOTE: catch() will show ANY error that happens in the chain as long as they are BEFORE catch() (i.e. not only for one of the then() calls)
  // NOTE: therefore we can put it at the end of the chain to catch any errors in any of the then() calls!
  // NOTE: When you have another then() block after a catch() or then() block, the promise re-enters PENDING mode (keep in mind: then() and catch() always return a new promise
  // - either not resolving to anything or resolving to what you return inside of then()).Only if there are no more then() blocks left, it enters a new, final mode: SETTLED.
  // Once SETTLED, you can use a special block - finally() - to do final cleanup work. finally() is reached no matter if you resolved or rejected before.
  // .catch((err) => {
  //   console.log(err);
  //   return 'Error happened here...!';
  // })
  // .then((data) => console.log(data, positionData));

  // NOTE: as opposed to the callback version here:
  // navigator.geolocation.getCurrentPosition(
  //   (posData) => {
  //     // NOTE: the function inside then() executes whenever the promise is resolved:
  //     setTimer(2000).then((data) => console.log(data, posData));
  //     // NOTE: we CAN nest async operations inside each other:
  //     // setTimeout(() => {
  //     //   console.log(posData);
  //     // }, 2000);
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  // );

  // NOTE: this line always executes AFTER the line ('Getting positions...') because it's async and gets passed to the browser, which takes it through event loop and message queue:
  // NOTE: the lag time in setTimeout() is a minimum, it's not a guaranteed time however (e.g. if we have a large for loop that blocks the call stack, etc.).
  // setTimeout(() => {
  //   console.log('Timer Done!');
  // }, 0);

  // NOTE: we can also use a promise-based approach:
  // setTimer(1000).then(() => {
  //   console.log('Timer Done!');
  // });

  // NOTE: no matter what, this line always gets printed before the other two logs (because of event loop and message queue):
  // console.log('Getting position...');
}

// NOTE: this is an async task:
button.addEventListener('click', trackUserHandler);

// NOTE: Promise.race() takes an array of functions that return promises, and returns a promise with the result of the fastest promise in the array:
// NOTE: the slow promises are not cancelled, only their result is ignored (e.g. with HTTP requests, they are sent, but results are ignored!).
Promise.race([getPosition(), setTimer(1000)]).then((data) => {
  console.log(data);
});

// NOTE: Promise.all() is used to execute code only when all the functions in the array have finished execution - it returns an array with the
// result of each of the promises in the initial array:
Promise.all([getPosition(), setTimer(1000)]).then((promiseData) => {
  console.log(promiseData);
});

// NOTE: Promise.allSettled() also takes in an array of promises and returns an Object with the result of all the promises in the array.
// the difference here is that if any of the promises fail (i.e. is rejected), we do NOT stop execution of the others (as opposed to Promise.all()).
Promise.allSettled([getPosition(), setTimer(1000)]).then((promiseData) => {
  console.log(promiseData);
});

// NOTE: we see 'Clicked!' only after the below has been executed (because of the way browser handles the Event Loop)
let result = 0;
for (let i = 0; i < 100000000; i++) {
  result += i;
}

console.log(result);
