---
title: "React Learning Notes"
date: 2023-02-22
summary: ""
author: "Max Shen"
tags: ["javascript", "react", "web"]
draft: true
---

## Components

- React lets you create components, reusable UI elements for your app.
- In a React app, every piece of UI is a component.
- React components are regular JavaScript functions except:
  - Their names always begin with a capital letter.
  - They return JSX markup.

## Importing and Exporting Components

A file can only have one default export, but it can have numerous named exports.

- default export:
```javascript
export default function Button() {}

import Button from './button.js';
```

- named export:
```javascript
export function Button() {}

import { Button } from './button.js';
```

## JSX

React components group rendering logic together with markup because they are related.

### The Rules of JSX

1. Return a single root element
2. Close all the tags
3. camelCase [most of the things](https://beta.reactjs.org/reference/react-dom/components/common)

## JavaScript in JSX

- JSX attributes inside quotes are passed as strings.
- Curly braces `{ }` can wrap Javascript expressions inside JSX.

You can only use curly braces in two ways inside JSX:
1. As text directly inside a JSX tag: `<h1>Hello, {name}!</h1>`
2. As attributes immediately following the = sign: `src={avatar}`

To pass a JS object in JSX, you must wrap the object in another pair of curly braces: `person={{ name: "Max", age: 18 }}`.

You also have to use double curly braces when using inline css:
```javascript
<ul style={{
  backgroundColor: 'black',
  color: 'pink'
}}>
</ul>
```

## Props

Every parent component can pass some information to its child components by giving them props.

1. Pass props to the child component

```javascript
<Avatar
  person={{ name: 'Max', imageId: '1bX5QH6' }}
  size={100}
/>
```

2. Read props inside the child component

```javascript
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

or use destructing

```javascript
function Avatar({ person, size }) {
  // ...
}
```

### Default value of prop

```javascript
function Avatar({ person, size = 100 }) {
  // ...
}
```

### Forwarding props

```javascript
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

### Passing JSX as children 

When you nest content inside a JSX tag, the parent component will receive that content in a prop called `children`.

```javascript
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}
```

### Characteristics of props

- Props reflect a component’s data at any point in time, rather than only in the beginning.
- Props are immutable (unchangeable).

## Conditional Rendering

```javascript
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}
```

If you don't want to render anything at all, return `null`.

Using ternary:
```javascript
return (
  <li className="item">
    {isPacked ? name + ' ✔' : name}
  </li>
);
```

Using logical AND operator: Render some JSX when the condition is true, or render nothing otherwise.

```javascript
return (
  <li className="item">
    {name} {isPacked && '✔'}
  </li>
);
```

## Rendering List

JSX elements directly inside a `map()` call always need keys! Keys tell React which array item each component corresponds to, so that it can match them up later.

```javascript
<li key={person.id}>...</li>
```

Use `<Fragment>` to display several DOM nodes for each list item.

[nanoid](https://github.com/ai/nanoid): unique string ID generator

## Pure functions

A pure function is a function with the following characteristics:
- It minds its own business. It does not change any objects or variables that existed before it was called.
- Same inputs, same output. Given the same inputs, a pure function should always return the same result.

React assumes that every component you write is a pure function.

### Local mutation
It’s completely fine to change variables and objects that you've just created while rendering.

- You should not mutate any of the inputs that your components use for rendering. That includes props, state, and context. To update the screen, “set” state instead of mutating preexisting objects.
- Strive to express your component’s logic in the JSX you return. When you need to “change things”, you’ll usually want to do it in an event handler. As a last resort, you can `useEffect`.
