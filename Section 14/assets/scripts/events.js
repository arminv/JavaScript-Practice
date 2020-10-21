const button = document.querySelector('button');

// // NOTE: we could also have this inline and inside the HTML file (as an attribtue, 'onclick' on the <button >), but it's not the recommended way hence we use onclick here:
// const buttonClickHandler = () => {
//   alert('Button was clicked!');
// };

// const anotherButtonClickHandler = () => {
//   console.log('This was clicked!');
// };

// // NOTE: make sure NOT to execute the callback below! Downside to below approach is that we can only call one function at a time!
// button.onclick = buttonClickHandler;
// button.onclick = anotherButtonClickHandler;

// NOTE: a better way is the following:
button.addEventListener('click');
button.removeEventListener();
