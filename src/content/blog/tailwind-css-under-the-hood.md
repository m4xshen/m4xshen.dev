---
title: "Tailwind CSS under the hood"
pubDate: 2024-01-31
description: "Learn how Tailwind CSS works under the hood by learning the concept of utility-first and how it extracts the class names from files."
---

Tailwind CSS defines itself on its official site as:
> A utility-first CSS framework packed with classes.

In this post I'll explain what does utility-first mean and how Tailwind CSS works under the hood.

## Utility-first

Based on the Cambridge Dictionary, utility means **a service that is used by the public**. So in the context of CSS, it means a class that can be used by any files of your site.

For example, Tailwind provides utility classes such as:

- `mx-auto` which means `margin-left: auto; margin-right: auto;`
- `text-sm` which means `font-size: 0.875rem; line-height: 1.25rem;`

So when you want to horizontally center a paragraph with small font size, you can just use `mx-auto text-sm` as the class name of the element.

In this way, we can build a complex components by composing different utility classes together.

## Benefits of utility-first

Now we understand what is utility-first and let’s see what are the benefits of it:

- **Design with constraints**: Using inline styles, every value is an arbitrary number. With utilities, you’re choosing styles from a predefined design system, which makes it much easier to build visually consistent UIs.
- **CSS stops growing**: Using a traditional approach, your CSS files get bigger every time you add a new UI component. With utilities, everything is reusable so you rarely need to write new CSS.
- **No need to invent class names**: No more adding silly class names like `sidebar-inner-wrapper` just to be able to style a `<div>`. With utilities, you just composing them to build a complex style you want.

## How Tailwind CSS works under the hood

Tailwind CSS works by scanning all of files for class names, then generating all of the corresponding CSS for those styles.

The paths to all of your content files is specified by `content` section of your `tailwind.config.js`:

```jsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}'
  ],
  // ...
}
```

Tailwind use **regular expression** to detect class names. Therefore when you want to use utility class conditionally like the following syntax doesn’t work:

```jsx
<div className={`text-${ error ? 'red' : 'green' }-600`}></div>
```

This is because the regular expression doesn’t match any class name.

Instead, you should use:

```jsx
<div className={ error ? 'text-red-600' : 'text-green-600' }></div>
```

In the second approach, Tailwind can match the string `'text-red-600'` and `'text-green-600'`  and then generates the corresponding CSS.

This also explains why you can't use props to build class names. For example, this won't work:
```javascript
function Button({ color, children }) {
  return (
    <button className={`bg-${color}-600 hover:bg-${color}-500 ...`}>
      {children}
    </button>
  )
}
```

Instead, map props to complete class names that are statically detectable at build-time:
```javascript
function Button({ color, children }) {
  const colorVariants = {
    blue: 'bg-blue-600 hover:bg-blue-500',
    red: 'bg-red-600 hover:bg-red-500',
  }

  return (
    <button className={`${colorVariants[color]} ...`}>
      {children}
    </button>
  )
}
```

## Wrap up

To sum up, we've learned that Tailwind CSS makes it easy to design neat and consistent websites. Knowing how it works also helps us understand why some things work well and others don't, guiding us to use Tailwind more effectively!
