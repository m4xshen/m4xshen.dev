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

## Events

### Event handler

To add an event handler, you will first define a function and then pass it as a prop to the appropriate JSX tag.

Event handler functions:
- Are usually defined inside your components.
- Have names that start with handle, followed by the name of the event.

Functions passed to event handlers must be passed, not called.
- correct: `<button onClick={handleClick}>`
- incorrect: `<button onClick={handleClick()}>`

You can also pass event handler as props.

```javascript
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

### Event propagation

Event handlers will also catch events from any children your component might have. We say that an event propagates up the tree.

All events propagate in React except onScroll, which only works on the JSX tag you attach it to.

### Stopping propagation

Event handlers receive an event object as their only argument. By convention, it’s usually called `e`. If you want to prevent an event from reaching parent components, you can call `e.stopPropagation()`.

### Preventing default behavior

Some browser events have default behavior associated with them. For example, a <form> submit event, which happens when a button inside of it is clicked, will reload the whole page by default. You can call `e.preventDefault()` on the event object to stop this from happening.

## State

Reasons to use state instead of variable:
1. Local variables don’t persist between renders.
2. Changes to local variables won’t trigger renders.

The `useState` Hook provides those two things:
1. A state variable to retain the data between renders.
2. A state setter function to update the variable and trigger React to render the component again.
3. State is local to a component instance on the screen.

### Adding a state variables

```javascript
import { useState } from 'react';

const [index, setIndex] = useState(0);
```

`index` is a state variable and `setIndex` is the setter function. The `0` is the initial value of `index`.

The `[` and `]` syntax here is called array destructuring and it lets you read values from an array. The array returned by `useState` always has exactly two items.

### Hook

In React, functions starting with `use` is called a hook.

Hook functions
- are only available when rendering.
- can only be called at the top level of your components or your own Hooks.

## Rendering

Any screen update in a React app happens in three steps: 
1. Triggering a render
2. Rendering the component
3. Committing to the DOM

### Trigger a render

Two reasons for a component to render:
1. It’s the component’s initial render.

```javascript
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

2. The component’s (or one of its ancestors’) state has been updated: Updating your component’s state automatically queues a render.

### Rendering the component

"Rendering" is React calling your components (recursively).

1. On initial render, React will call the root component.
2. For subsequent renders, React will call the function component whose state update triggered the render.

### Committing to the DOM

1. For the initial render, React will use the `appendChild()` DOM API to put all the DOM nodes it has created on screen.
2. For re-renders, React will apply the minimal necessary operations (calculated while rendering!) to make the DOM match the latest rendering output.

React only changes the DOM nodes if there’s a difference between renders.

## State as a Snapshot

When React calls your component, it gives you a snapshot of the state for that particular render. Your component returns a snapshot of the UI with a fresh set of props and event handlers in its JSX, all calculated using the state values from that render!

A state variable’s value never changes within a render.

## Queueing State

Batching: React waits until all code in the event handlers has run before processing your state updates.

updater function:`setNumber(n => n + 1);`

1. React queues this function to be processed after all the other code in the event handler has run.
2. During the next render, React goes through the queue and gives you the final updated state.

After the event handler completes, React will trigger a re-render. During the re-render, React will process the queue. Updater functions run during rendering, so updater functions must be pure and only return the result.

## Update objects in state

Although objects in React state are technically mutable, you should treat them as if they were immutable—like numbers, booleans, and strings. Instead of mutating them, you should always replace them.

### Copying objects with the spread syntax

You can use the `...` object spread syntax so that you don’t need to copy every property separately.
```javascript
setPerson({
  ...person, // Copy the old fields
  firstName: e.target.value // But override this one
});
```

The `...` spread syntax is “shallow”—it only copies things one level deep.

## Update array without mutation

- adding to an array: use `concat`, `[...arr]`
- removing from an array: use `filter`
- transforming an array: use `map`
- inserting to an array: 
```javascript
const insertAt = 1; // Could be any index
const nextArtists = [
  // Items before the insertion point:
  ...artists.slice(0, insertAt),
  // New item:
  { id: nextId++, name: name },
  // Items after the insertion point:
  ...artists.slice(insertAt)
];
setArtists(nextArtists);
setName('');
```
- making other changes to an array: copy the array first, and then make changes to it

However, even if you copy an array, you can’t mutate existing items inside of it directly. This is because copying is shallow—the new array will contain the same items as the original one. So if you modify an object inside the copied array, you are mutating the existing state.

When updating nested state, you need to create copies from the point where you want to update, and all the way up to the top level.

[immer](https://immerjs.github.io/immer/)

## Strict Mode

Strict Mode enables the following development-only behaviors:

- Your components will re-render an extra time to find bugs caused by impure rendering.
- Your components will re-run Effects an extra time to find bugs caused by missing Effect cleanup.
- Your components will be checked for usage of deprecated APIs.
