---
title: "3 Vim commands for blazingly fast navigation between brackets"
pubDate: "2024-02-20"
description: "Discover three powerful Vim commands for blazingly fast navigation between brackets in your code. Enhance your coding efficiency with %, [(, [{, ][, and [] for unmatched precision in large files and complex structures. Perfect for developers looking to streamline their workflow and boost productivity."
---

There are often lots of brackets within a programming file. Therefore the efficiency of navigating between them becomes crucial for the overall productivity. I'll introduce you to three types of commands that allows you to navigate between brackets blazingly fast!

## 1. `%`

Let's begin with an example first (the arrow pointing to your cursor position):

```plaintext
( example )
↑
```

Press `%`:

```plaintext
( example )
          ↑
```

Press `%` again:

```plaintext
( example )
↑
```

This demonstrates that `%` jumps between the matched brackets. However the actual behavior is more than that. `%` find the next item in this line **after or under the cursor** and jump to its match.

`%` not only works on `()`, it also works with:
- pairs: `()` or `[]` or `{}` (this can be changed with the `'matchpairs'` option)
- C-style comment: `/* */`.
- HTML tag: `<div></div>`

It's crucial to note the emphasis on **after or under the cursor**, which means that you can use it even when bracket is not under the cursor.

Example:

```plaintext
some text (( example )) some text
↑
```

Let's say you want to go to the last `)`. You might initially think to use `f(%` in the following steps:

1. Press `f(`:

```plaintext
some text (( example )) some text
          ↑
```

2. Press `%`:
```plaintext
some text (( example )) some text
                      ↑
```

However the `f(` is unnecessary. You can achieve the same navigation with just `%`.

This is because of `%` works like this under the hood:
1. Finds the first pair after or under the cursor which is `(`.
2. Jump to its match which is `)`.

It might not be that intuitive to use `%` when bracket not under the cursor, but after you get more familiar with it you can achieve some magic movement with it. 

## 2. `[(` and `[{`

- `[(` jumps backward to the first unmatched `(`
- `[{` jumps backward to the first unmatched `{`

Example:

```plaintext
{

  example

  text
  ↑
}
```

Press `[{`:

```plaintext
{
↑
  example
  
  text

}
```

In addition to `[(` and `[{`, there's also `])` and `]}`:

- `])` jumps forward to unmatched `)`
- `]}` jumps forward to unmatched `}`

Let's see a practical example. Imagine you're navigating inside a large function:


```javascript
function example() {
  const sum = 0;
  ↑ 
  for (let i = 0; i < 10; i++) {
    sum += i;
  }

  // some other operation, which takes many lines
  // ...

  return sum;
}
```

Let's say you want to jump to the closing `}` of that function. There are several ways to do this:

1. Use relative jump such as `12j` to jump to the `}` directly:

This approach works for smaller functions. However in the example this is impossible because the function is too big and the last line of the function is outside the screen.

2. Use `/}` to search the `}`.

This might work if there's no other `}` inside the function. However in the example there's other `}`, and you need to press `n` multiple times to get to the last `}`.

3. Use `]}`

The most efficient method is to use `]}`, which directly takes you to the closing `}` of the function without the need for counting lines or repeated searching.

## 3. `][` and `[]`

- `][`: jump forward to the next `}` **in the first column**.
- `[]`: jump backward to the next `}` **in the first column**.

Example:

```plaintext
{
↑ example
}

{
  {
    example
  }
}

{
  example
}
```

Press `][`:

```plaintext
{
  example
}
↑
{
  {
    example
  }
}

{
  example
}
```

Press `][` again:

```plaintext
{
  example
}

{
  {
    example
  }
}
↑
{
  example
}
```

Press `][` again:

```plaintext
{
  example
}

{
  {
    example
  }
}

{
  example
}
↑
```

This is useful when in files containing multiple functions. In most languages, the end of a function is a `}` at the start of a line (first column). You can then use `][` to jump to the end of next function and `[]` to jump to the end of previous function.

There's also:

- `]]`: jump forward to the next `{` in the first column.
- `[[`: jump backward to the next `{` in the first column.

Though in practice, the `{` character appearing in the first column is less common. I personally rarely find an occasion to use them. If you can think of scenarios where `]]` and `[[` would be particularly useful, please share them in the comments below!

## Conclusion

In conclusion, mastering Vim commands such as `%`, `[(`, `[{`, `][`, and `[]` boosts navigation efficiency in programming files. Each command offers unique advantages under different situation, enabling us to move through code with precision and ease!
