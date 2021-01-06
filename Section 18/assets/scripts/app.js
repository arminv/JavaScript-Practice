// NOTE: there are some differences between JSON and the native JS Object:
// 1) You cannot store methods in a JSON (only data)
// 2) Property names must be wrapped in double quotes ("")
// NOTE: We are NOT LIMITED to objects when converting data to JSON.
// we can also convert numbers, arrays, booleans or just strings - all data types JSON supports.

const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

function sendHttpRequest(method, url, data) {
  // A) XMLHttpRequest Approach:

  // const promise = new Promise((resolve, reject) => {
  //   // NOTE: XMLHttpRequest() is supported by al browsers:
  //   const xhr = new XMLHttpRequest();
  //  // NOTE: We can add headers, but once a header has been added, it cannot be removed:
  // XPathResult.setRequestHeader('Content-Type', 'application/json');
  //   // NOTE: open() does NOT send any requests - it requires 2 arguments:
  //   // 1) the HTTP request type; 2) the endpoint/URL
  //   xhr.open(method, url);
  //   // NOTE: instead of using JSON.parse(), we can do the following so that the response gets converted into a JS Object:
  //   xhr.responseType = 'json';
  //   // NOTE: some browsers do NOT support xhr.addEventListener() - better to assign a function to xhr:
  //   xhr.onload = function () {
  //     // NOTE: to make sure we also catch ant server side errors, we need to add or own condition based on HTTP response codes:
  //     if (xhr.status >= 200 && xhr.status < 300) {
  //       resolve(xhr.response);
  //     } else {
  //       reject(new Error('Something went wrong!'));
  //     }
  //   };
  //   // NOTE: this error handler does not check for server side errors, it only kicks in if anything client side happens:
  //   xhr.onerror = function () {
  //     reject(new Error('Failed to send request!'));
  //   };
  //   xhr.send(JSON.stringify(data));
  // });

  // return promise;

  // B) Fetch API Approach:
  // NOTE: if we only pass the URL with no other arguments, a GET request will be sent:
  return (
    fetch(url, {
      method: method,
      body: JSON.stringify(data),
      // NOTE: we can also add headers to help the server identify the type of information we are sending to it (only useful if server actually expects headers):
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (xhr.status >= 200 && xhr.status < 300) {
          // NOTE: fetch returns data in 'streamed' format (unlike XML approach where we get back a 'parsed' data) hence we need to call json() on the result to 'snapshot' the data and parse it:
          // NOTE: there are other methods available as well, such as: response.text(), response.blob(), etc.
          return response.json();
        } else {
          // NOTE: `response.json()` returns a promise that we can use for showing the actual error from server - downside is a nested `then` block:
          // NOTE: we have to return so the response is chained with the outer promise, otherwise we will NOT have access to `errData` here:
          return response.json().then((errData) => {
            console.log(errData);
            throw new Error('Something went wrong - server side!');
          });
        }
      })
      // NOTE: the problem with this catch block is that we will never make it into this block when there is a server error! So we handle it above instead!
      .catch((error) => {
        console.log();
        throw new Error('Something went wrong!');
      })
  );
}

async function fetchPosts() {
  try {
    const responseData = await sendHttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/posts'
    );
    // NOTE: we can use JSON.parse() to convert the json into JS Object so we can manipulate it easily:
    //   const listOfPosts = JSON.parse(xhr.response);
    // NOTE: if using xhr.responseType, then we do not need to convert the JSON (it will already be converted):
    const listOfPosts = responseData;
    console.log(listOfPosts);
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.contentEditable, true);
      postEl.querySelector('h2').textContent = post.title.toUpperCase();
      postEl.querySelector('p').textContent = post.body;
      postEl.querySelector('li').id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    alert(error.message);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}

fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector('#title').value;
  const enteredContent = event.currentTarget.querySelector('#content').value;

  createPost(enteredTitle, enteredContent);
});

postList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const postId = event.target.closest('li').id;
    sendHttpRequest(
      'DELETE',
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});
