const buttons = document.querySelectorAll('button');

// NOTE: we could also have this inline and inside the HTML file (as an attribtue, 'onclick' on the <button >), but it's not the recommended way hence we use onclick here:
const buttonClickHandler = (event) => {
  // NOTE: check MDN for more info about this returned object - here, 'target' gives the element that called the function and it has a property 'disabled':
  event.target.disabled = true;
  console.log('event', event);
};

const anotherButtonClickHandler = () => {
  console.log('This was clicked!');
};

// NOTE: make sure NOT to execute the callback below! Downside to below approach is that we can only call one function at a time!
// button.onclick = buttonClickHandler;
// button.onclick = anotherButtonClickHandler;

const boundFn = buttonClickHandler.bind(this);

// NOTE: a better way is the following:
// button.addEventListener('click', buttonClickHandler);
// setTimeout(() => {
//   // NOTE: it's important to apply removeEventListener to the exact same setup/args as when we attach the listener - it has to be the exact same function object:
//   // NOTE: for the same reason above, we cannot use .bind(this) as .bind() creates a new function object!
//   button.removeEventListener('click', buttonClickHandler);
// }, 2000);

buttons.forEach((btn) => {
  btn.addEventListener('click', buttonClickHandler);
});
