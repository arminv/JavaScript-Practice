// NOTE: JS is single-threaded, but it offloads longer-taking tasks to the browser (which uses multiple threads).

const button = document.querySelector('button');
const output = document.querySelector('p');

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

function trackUserHandler() {
  console.log('Clicked!');
  navigator.geolocation.getCurrentPosition(
    (posData) => {
      // NOTE: the function inside then() executes whenever the promise is resolved:
      setTimer(2000).then((data) => console.log(data, posData));
      // NOTE: we CAN nest async operations inside each other:
      // setTimeout(() => {
      //   console.log(posData);
      // }, 2000);
    },
    (error) => {
      console.log(error);
    }
  );
  // NOTE: this line always executes AFTER the line ('Getting positions...') because it's async and gets passed to the browser, which takes it through event loop and message queue:
  // NOTE: the lag time in setTimeout() is a minimum, it's not a guaranteed time however (e.g. if we have a large for loop that blocks the call stack, etc.).
  // setTimeout(() => {
  //   console.log('Timer Done!');
  // }, 0);
  // NOTE: we can also use a promise-based approach:
  setTimer(1000).then(() => {
    console.log('Timer Done!');
  });
  // NOTE: no matter what, this line always gets printed before the other two logs (because of event loop and message queue):
  console.log('Getting position...');
}

// NOTE: this is an async task:
button.addEventListener('click', trackUserHandler);

// NOTE: we see 'Clicked!' only after the below has been executed (because of the way browser handles the Event Loop)
let result = 0;
for (let i = 0; i < 100000000; i++) {
  result += i;
}

console.log(result);
