// NOTE: there are some differences between JSON and the native JS Object:
// 1) You cannot store methods in a JSON (only data)
// 2) Property names must be wrapped in double quotes ("")
// NOTE: We are NOT LIMITED to objects when converting data to JSON.
// we can also convert numbers, arrays, booleans or just strings - all data types JSON supports.

const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

// NOTE: XMLHttpRequest() is supported by al browsers:
const xhr = new XMLHttpRequest();

// NOTE: open() does NOT send any requests - it requires 2 arguments:
// 1) the HTTP request type; 2) the endpoint/URL
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');

// NOTE: instead of using JSON.parse(), we can do the following so that the response gets converted into a JS Object:
xhr.responseType = 'json';

// NOTE: some browsers do NOT support xhr.addEventListener() - better to assign a function to xhr:
xhr.onload = function () {
  // NOTE: we can use JSON.parse() to convert the json into JS Object so we can manipulate it easily:
  //   const listOfPosts = JSON.parse(xhr.response);
  // NOTE: if using xhr.responseType, then we do not need to convert the JSON (it will already be converted):
  const listOfPosts = xhr.response;
  console.log(listOfPosts);
  for (const post of listOfPosts) {
    const postEl = document.importNode(postTemplate.contentEditable, true);
    postEl.querySelector('h2').textContent = post.title.toUpperCase();
    postEl.querySelector('p').textContent = post.body;
    listElement.append(postEl);
  }
};

xhr.send();
