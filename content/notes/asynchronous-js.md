---
author: "Max Shen"
title: "Asynchronous JS"
date: 2024-01-01
summary: "This is a template."
tags: ["template"]
draft: true
---

Asynchronous function using event handler:
```javascript
const log = document.querySelector(".event-log");

document.querySelector("#xhr").addEventListener("click", () => {
  log.textContent = "";

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("loadend", () => {
    log.textContent = `${log.textContent}Finished with status: ${xhr.status}`;
  });

  xhr.open(
    "GET",
    "https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json"
  );
  xhr.send();
  log.textContent = `${log.textContent}Started XHR request\n`;
});

document.querySelector("#reload").addEventListener("click", () => {
  log.textContent = "";
  document.location.reload();
});
```

## Callbacks

An event handler is a particular type of callback. A callback is just a function that's passed into another function.

```javascript
function doAsyncTask(callback) {
  setTimeout(() => {
    const data = { name: 'John', age: 30 };
    callback(data); // call the callback function with the data
  }, 1000);
}

function handleData(data) {
  console.log(data);
}

doAsyncTask(handleData); // pass the handleData function as a callback
```


## Promises

A promise is an object returned by an asynchronous function, which represents the current state of the operation.

With a promise-based API, the asynchronous function starts the operation and returns a Promise object.

The handler passed to `then()` is called when the asynchronous operation succeeds, the handler passed to `catch()` is called when the asynchronous operation fails.

```javascript
const fetchPromise = fetch("https:...");
fetchPromise.then((response) => {
  console.log(`Received response: ${response.status}`);
});
console.log("Started request…");
```

```javascript
then(onFulfilled, onRejected)
```
It immediately returns an equivalent Promise object

### Chaining promises

```javascript
fetchPromise.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((data) => {
    console.log(data[0].name);
  });
});
```

### States

a promise can be in one of three states:
- pending
- fulfilled: `then()` handler is called
- rejected: `catch()` handler is called

### Combining promises

The promise returned by `Promise.all()` is:

- fulfilled when and all the promises in the array are fulfilled. In this case, the then() handler is called with an array of all the responses, in the same order that the promises were passed into all().
- rejected when and if any of the promises in the array are rejected. In this case, the catch() handler is called with the error thrown by the promise that rejected.

```javascript
Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
  .then((responses) => {
    for (const response of responses) {
      console.log(`${response.url}: ${response.status}`);
    }
  })
  .catch((error) => {
    console.error(`Failed to fetch: ${error}`);
  });
```

`Promise.any()` is fulfilled as soon as any of the array of promises is fulfilled, or rejected if all of them are rejected.

### async and await

Adding `async` at the start of a function makes it an async function:
```javascript
async function myFunction() {
  // This is an async function
}
```

Inside an async function, you can use the `await` keyword before a call to a function that returns a promise. This makes the code wait at that point until the promise is settled

This enables you to write code that uses asynchronous functions but looks like synchronous code.

Notes:
- async functions always return a promise
- you can only use `await` inside an `async` function
