---
author: "Max Shen"
title: "React Notes — Describing the UI"
date: 2023-07-27
summary: "This is a note summarizes the 'Describing the UI' section of React documentation."
tags: ["react"]
draft: true
---

This is a note summarizes the [Describing the UI](https://react.dev/learn/describing-the-ui) section of React documentation.

## Component

React component is a:
- reusable UI elements for your app.
- JavaScript function that:
  - return JSX markup.
  - always begin with a capital letter.

## Import & Export Components

A file can have no more than one default export, but it can have as many named exports as you like.

```jsx
// default export
export default function Button() {}

// default import
import Button from './Button.js';

// named export
export function Button() {}

// named import
import { Button } from './Button.js';
```

## JSX Rules

1. Return a single root element (JSX under the hood is transformed into plain JavaScript objects. You can’t return two objects from a function without wrapping them into an array.)
2. Close all the tags
3. camelCase most of the things

## JavaScript in JSX

You can only use curly braces in two ways inside JSX:
1. As text directly inside a JSX tag: `<h1>{name}'s To Do List</h1>`
2. As attributes: `src={avatar}`

## Props

Props are:
- the information that you pass to a JSX tag.
- immutable.

For example, `className`, `src`, `alt`, and `width` are some of the props you can pass to an `<img>`.

```jsx
<Avatar
  size={100}
  person={{ 
    name: 'Katsuko Saruhashi', 
    imageId: 'YfeOqp2'
  }}
/>
```

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

Destructing:
```jsx
// size 
function Avatar({ person, size = 100 }) {
  // ...
}
```

The default value is only used if the size prop is missing or if you pass `size={undefined}`.

### Passing JSX as children

```jsx
<Card>
  <Avatar />
</Card>

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}
```

## Conditional Rendering

### Ternary

Render `a` if the condition is true, otherwise render `b`.

```jsx
{condition ? a : b}
```

### AND

Render `a` if the condition is true, otherwise render nothing.

```jsx
{condition && a}
```

A JavaScript `&&` expression returns the value of its right side if the left side (condition) is `true`. But if the condition is `false`, the whole expression becomes `false`.

React doesn't render anything for  `false`, `null` and `undefined`.

## Rendering Lists

Use `map()` or `filter()`.

You need to give each array item a `key`. Keys tell React which array item each component corresponds to, so that it can match them up later. 

Keys must:
- be unique among siblings.
- not change.

Your components won’t receive key as a prop. It’s only used as a hint by React itself.

## Keeping Components Pure

A pure function is a function with the following characteristics:
- it does not change any variables that existed before it was called
- same inputs, same output

React assumes that every component you write is a pure function.

Side effects make it impure.
