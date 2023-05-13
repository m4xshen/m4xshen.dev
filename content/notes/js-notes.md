---
title: "JS Notes"
date: 2023-03-30T02:14:05+08:00
draft: false
---

## API

APIs are ready-made sets of code building blocks that allow a developer to implement programs that would otherwise be hard or impossible to implement.

### Browser APIs

Browser APIs are built into your web browser, and are able to expose data from the surrounding computer environment, or do useful complex things. For example:
- DOM API
- Geolocation API
- Canvas and WebGL API
- Audio and Video API

### Third Party APIs

Third party APIs are not built into the browser by default, and you generally have to grab their code and information from somewhere on the Web.

### Type of languages

- interpreted languages: the code is run from top to bottom and the result of running the code is immediately returned (eg: JS)
- Compiled languages: the code is compiled into another form before they are run by the computer (eg: C++)

## Variables

### Dynamic Typing

JavaScript is a dynamically typed language, which means that you don't need to specify what data type a variable will contain.

### var hoisting

Because `var` declarations are processed before any code is executed, declaring a variable anywhere in the code is equivalent to declaring it at the top.

Only a variable's declaration is hoisted, not its initialization. The initialization happens only when the assignment statement is reached. Until then the variable remains `undefined` (but declared):

### Constants

When using constants:
- you must initialize them when you declare them
- you can't assign them a new value after you've initialized them.

You can update, add, or remove properties of an object declared using `const`, because even though the content of the object has changed, the constant is still pointing to the same object:

### Strings

Most things are objects in JavaScript. When you create a string, your variable becomes a string object instance, and as a result has a large number of properties and methods available to it.

```javascript
let str = 'a string'
console.log(str.length)
```

### Arrays

We can mix data types in a single array.

```javascript
let nums = [1, 3, 5];
nums.push(9); // add 9 to the end
nums.unshift(7); // add 7 to the start
nums.pop(); // remove the last item
nums.shift(); // remove the first item
nums.splice(0, 2); // remove 1 item starting at index 0
```

#### Converting between strings and arrays

- `split()`
- `join()`

## Looping

```javascript
for (const num of nums) {
  console.log(num);
}
```

- `map()` calls the function once for each item in the array, passing in the item. It then adds the return value from each function call to a new array, and finally returns the new array.
- `filter()` calls the function for every item in the array, passing in the item. If the function returns true, then the item is added to a new array. Finally it returns the new array.

## Functions

### Default Parameters

```javascript
function hello(name = 'Max') {
  console.log('hello, ' + name);
}
```

### Anonymous Functions

```javascript
textBox.addEventListener('keydown', function(e) {
  console.log(e.key);
});
```

### Arrow Functions

```javascript
textBox.addEventListener('keydown', (e) => {
  console.log(e.key);
});
```

- If the function only has one line in the curly brackets, you omit the curly brackets.
- If the function only takes one parameter, you can also omit the brackets around the parameter.
- If your function needs to return a value, and contains only one line, you can also omit the `return` statement.

## Events

- `addEventListener()`
- `removeEventListener()`

### Event Objects

Event object is automatically passed to event handlers to provide extra features and information

- `e.target`: a reference to the element the event occurred upon
- `e.preventDefault()`

### Event bubbling

Event bubbles up from the innermost element that was fired. Use `e.stopPropagation()` stop that event from bubbling up

### Event Capture

Event Capture like event bubbling but the order is reversed.

Event capture is disabled by default. To enable it you have to pass the capture option in addEventListener().

```javascript
document.body.addEventListener("click", handleClick, { capture: true });
```

### Event Delegation

Event delegation is an event-handling pattern that allows you to handle events at a higher level in the DOM tree other than the level where the event was first received.

## Objects

- properties: data in objects
- methods: functions in objects

### Object Literal

```javascript
const objectName = {
  member1Name: member1Value,
  member2Name: member2Value,
  member3Name: member3Value,
};
```

if an object property name is held in a variable, then you can't use dot notation to access the value, but you can access the value using bracket notation.

```javascript
person.age;

let prop = "age";
person[prop];
```

### this

The this keyword refers to the current object the code is being written inside.

### Constructor

A constructor is just a function called using the `new` keyword. When you call a constructor, it will:
- create a new object
- bind `this` to the new object, so you can refer to `this` in your constructor code
- run the code in the constructor
- return the new object.

```javascript
function Person(name) {
  this.name = name;
  this.introduceSelf = function () {
    console.log(`Hi! I'm ${this.name}.`);
  };
}

const max = new Person("Max");
```

### Object Prototype

Every object in JavaScript has a built-in property, which is called its prototype. **The prototype is itself an object**, so the prototype will have its own prototype, making what's called a prototype chain. The chain ends when we reach a prototype that has `null` for its own prototype.

The property of an object that points to its prototype is called `__proto__`.

When you try to access a property of an object: if the property can't be found in the object itself, the prototype is searched for the property. If the property still can't be found, then the prototype's prototype is searched, and so on until either the property is found, or the end of the chain is reached, in which case `undefined` is returned.

`Object.prototype` is the most basic prototype that all objects have by default.

![](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes/mydate-prototype-chain.svg)

#### Shadowing properties

```javascript
const myDate = new Date(1995, 11, 17);

console.log(myDate.getYear()); // 95

myDate.getYear = function () {
  console.log("something else!");
};

myDate.getYear(); // 'something else!'
```

When we call `getYear()` the browser first looks in `myDate` for a property with that name, and only checks the prototype if `myDate` does not define it.

#### Setting a prototype

##### Using Object.create

The `Object.create()` method creates a new object and allows you to specify an object that will be used as the new object's prototype.

```javascript
const personPrototype = {
  greet() {
    console.log("hello!");
  },
};

const carl = Object.create(personPrototype);
carl.greet(); // hello!
```

##### Using a constructor

In JavaScript, all functions have a property named prototype. When you call a function as a constructor, this property is set as the prototype of the newly constructed object.

```javascript
const personPrototype = {
  greet() {
    console.log(`hello, my name is ${this.name}!`);
  },
};

function Person(name) {
  this.name = name;
}

Object.assign(Person.prototype, personPrototype);
// or
// Person.prototype.greet = personPrototype.greet;
```

After this code, objects created using `Person()` will get `Person.prototype` as their prototype, which automatically contains the greet method.

This also explains why we said earlier that the prototype of `myDate` is called `Date.prototype`: it's the prototype property of the Date constructor.

#### Own Properties

It's common to see the pattern that methods are defined on the prototype, but data properties are defined in the constructor.

That's because methods are usually the same for every object we create, while we often want each object to have its own value for its data properties.

#### Prototypes and inheritance

For example, if we're modeling a school, we might have professors and students: they are both people.

If `Professor` and `Student` objects can have `Person` prototypes, then they can inherit the common properties, while adding and redefining those properties which need to differ.

## Classes

Constructors and prototypes can be used to implement class-based OOP patterns in JavaScript. But using them directly to implement features like inheritance is tricky, so JavaScript provides classes, layered on top of the prototype model, that map more directly to the concepts of class-based OOP.

```javascript
class Person {
  name;

  constructor(name) {
    this.name = name;
  }

  introduceSelf() {
    console.log(`Hi! I'm ${this.name}`);
  }
}
```

- The `name;` declaration is optional.
- The constructor is defined using the `constructor` keyword. Just like a constructor outside a class definition.
- If you don't need to do any special initialization, you can omit the constructor, and a default constructor will be generated for you:

### Inheritance

```javascript
class Professor extends Person {
  ...
}
```

`Person` is the superclass or parent class of `Professor`. Conversely, Professor is subclass or child class of `Person`.

Subclass can call the superclass constructor using `super()`.

If a subclass has any of its own initialization to do, it must first call the superclass constructor using `super()`, passing up any parameters that the superclass constructor is expecting.

### Encapsulation

Private data properties must be declared in the class declaration, and their names start with `#`.

```javascript
class Student extends Person {
  #name;

  #somePrivateMethod() {
    ...
  }

  ...
}
```

### JSON

```json
{
  "name": "Molecule Man",
  "age": 29,
  "secretIdentity": "Dan Jukes",
  "powers": ["Radiation resistance", "Turning tiny", "Radiation blast"],
},
```

Converting between objects and text

```javascript
obj = JSON.parse(text)
text = JSON.stringify(obj)
```

## Asynchronous JavaScript

### Promises

A promise is an object returned by an asynchronous function, which represents the current state of the operation.

```javascript
const fetchPromise = fetch('https://...');
fetchPromise.then((response) => {
  console.log(response.status);
})
```

### Chaining Promises

```javascript
fetchPromise.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((data) => {
    console.log(data[0].name);
  });
});
```

```javascript
fetchPromise
  .then((response) => response.json())
  .then((data) => {
    console.log(data[0].name);
  });
```

### Catching errors

`Promise` objects provide a `catch()` method. The handler passed to `then()` is called when the asynchronous operation succeeds, the handler passed to `catch()` is called when the asynchronous operation fails.

### States of promises

A promise can be in one of three states:
- pending: The promise has been created, and the asynchronous function it's associated with has not succeeded or failed yet.
- fulfilled: The asynchronous function has succeeded.
- rejected: The asynchronous function has failed.

Sometimes, we use the term settled to cover both fulfilled and rejected.

A promise is resolved if it is settled, or if it has been "locked in" to follow the state of another promise.

### Multiple promises

`Promise.all()` takes an array of promises and returns a single promise.
- fulfilled when and if all the promises in the array are fulfilled. In this case, the `then()` handler is called with an array of all the responses, in the same order that the promises were passed into `all()`.
- rejected when and if any of the promises in the array are rejected. In this case, the `catch()` handler is called with the error thrown by the promise that rejected.

`Promise.any()` is fulfilled as soon as any of the array of promises is fulfilled, or rejected if all of them are rejected.

### async and await

```javascript
async function myFunction() {
  try {
    const response = await fetch('https://...');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.log(error);
  }
}
```
Inside an async function, you can use the `await` keyword before a call to a function that returns a promise.

