// NOTE: XMLHttpRequest() is supported by al browsers:
const xhr = new XMLHttpRequest();

// NOTE: open() does NOT send any requests - it requires 2 arguments:
// 1) the HTTP request type; 2) the endpoint/URL
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
xhr.send();
