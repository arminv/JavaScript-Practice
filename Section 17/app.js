const button = document.querySelector('button');
const output = document.querySelector('p');

function trackUserHandler() {
  console.log('Clicked!');
}

// NOTE: this is an async task:
button.addEventListener('click', trackUserHandler);

// NOTE: we see 'Clicked!' only after the below has been executed (because of the way browser handles the Event Loop)
let result = 0;
for (let i = 0; i < 100000000; i++) {
  result += i;
}

console.log(result);
