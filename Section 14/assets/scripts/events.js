const button = document.querySelector('button');

// NOTE: we could also have this inline and inside the HTML file (as an attribtue, 'onclick' on the <button >), but it's not the recommended way hence we use onclick here:
const buttonClickHandler = (event) => {
  // NOTE: check MDN for more info about this returned object - here, 'target' gives the element that called the function and it has a property 'disabled':
  // event.target.disabled = true;
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
  // NOTE: the mouse event has 'relatedTarget', which indicates what element user is coming from (i.e. before going to the element that has event listener) - if user moves too fast, browser will not accurately show this!
  btn.addEventListener('mouseenter', buttonClickHandler);
});

// NOTE: we can also listen for scroll events - we can use it for infinite scrolling for example:
window.addEventListener('scroll', (event) => {
  console.log(event);
});

const form = document.querySelector('form');

// NOTE: submit event is unique to from elements only:
form.addEventListener('submit', (event) => {
  // NOTE: each HTML element has unique default behaviour - e.g. links will take user to the URL, etc.
  event.preventDefault();
  console.log(event);
});

const div = document.querySelector('div');

// NOTE: browser handle events in 2 steps: 1) Capturing: it goes from the outside (element) to the inside 2) Bubbling: it goes from inside (element) to outside
// NOTE: all event listeners captured via addEventListener() go through bubbling only (by default) - we can change this behaviour though:
// NOTE: we can pass a third argument to addEventListener() - if 'true', the event will be captured during the Capturing phase (as opposed to Bubbling stage):
div.addEventListener(
  'click',
  (event) => {
    console.log('CLICKED DIV');
    console.log(event);
  }
  // ,true
);

// NOTE: with a normal function, 'this' refers to the current target (i.e. the element you originally attached listener too, NOT what was clicked!):
// button.addEventListener('click', (event) => {
button.addEventListener('click', function (event) {
  // NOTE: to stop propagation we can use stopPropagation():
  event.stopPropagation();
  // NOTE: if we have multiple events registered on an element, we can instead use stopImmediatePropagation():
  // NOTE: in general (for other events such as mouseenter, drag and drop, etc.) we can check the 'bubbles' property (boolean) of the 'event' object to see if it propagates by default.
  event.stopImmediatePropagation();
  console.log('CLICKED BUTTON');
  console.log(event);
  console.log(this);
});

const listItems = document.querySelectorAll('li');
const list = document.querySelector('ul');

// NOTE: the below aproach is not optimal in terms of performance:
// listItems.forEach((listItem) => {
//   listItem.addEventListener('click', (event) => {
//     event.target.classList.toggle('highlight');
//   });
// });

// NOTE: this aproach is better (aka 'event delegation pattern') - we take advantage of event propagation and add the evnt listener only to ul element:
// however this aproach can get problematic if HTML structure is more complex
// list.addEventListener('click', (event) => {
list.addEventListener('click', function (event) {
  // NOTE: one advantage of event.target is that it refers to the exact element that triggered the event in the first place:
  // event.target.classList.toggle('highlight');
  // NOTE: we also have access to another 'target' that could be helpful in cases where the HTML is complex and we have event delegation:
  // NOTE: currentTarget gives the element that we attached the event listener to, not the exacnt element that was clicked (unlike event.target);
  // console.log(event.currentTarget);
  // NOTE: we can use DOM traversal to fix the issue:
  event.target.closest('li').classList.toggle('highlight');
  // NOTE: we can 'simulate' events through certain methods provided by JS (such as click() and submit()):
  // NOTE: this 'simulation' is not exactly the same as the user's behaviour - e.g. the other event listener does NOT get triggered when using this simulatuon (vs getting triggered if it was an actual user!)
  form.click();
  // form.submit();
  console.log(this);
});

// ------------------------------------------------------
// ------------------------------------------------------
// INFINITE SCROLLING:

// Let's have fun with the scroll event and create a list which you can scroll infinitely (explanations below)!
// You can run this code snippet on any page - just make sure that you can scroll vertically (either by adding enough dummy content, by adding some styles that add a lot of height to some elements or by shrinking the browser window vertically).

// let curElementNumber = 0;

// function scrollHandler() {
//   const distanceToBottom = document.body.getBoundingClientRect().bottom;

//   if (distanceToBottom < document.documentElement.clientHeight + 150) {
//     const newDataElement = document.createElement('div');
//     curElementNumber++;
//     newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
//     document.body.append(newDataElement);
//   }
// }

// window.addEventListener('scroll', scrollHandler);

// At the very bottom, we register the scrollHandler function as a handler for the 'scroll' event on our window object.

// Inside that function, we first of all measure the total distance between our viewport (top left corner of what we currently see) and the end of the page (not just the end of our currently visible area) => Stored in distanceToBottom.

// For example, if our browser window has a height of 500px, then distanceToBottom could be 684px, assuming that we got some content we can scroll to.

// Next, we compare the distance to the bottom of our overall content (distanceToBottom) to the window height + a certain threshold (in this example 150px). document.documentElement.clientHeight is preferable to window.innerHeight because it respects potential scroll bars.

// If we have less than 150px to the end of our page content, we make it into the if-block (where we append new data).

// Inside of the if-statement, we then create a new <div> element and populate it with a <p> element which in turn outputs an incrementing counter value.
// ------------------------------------------------------
