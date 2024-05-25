---
title: "Practical Vim command workflow"
pubDate: '2023-01-26'
description: "Master the art of efficient text navigation and editing in Vim with this comprehensive command workflow tutorial. Explore key commands and practical examples to enhance your productivity in Vim."
---

In Vim, there's a variety of commands that let you accomplish tasks in different ways. This can be overwhelming for beginners trying to figure out the most efficient keystrokes for editing. In this tutorial, I'll share my approach to using Vim commands and offer some real life examples to help you improve your workflow.

## Guidelines

Here are some general rules of my workflow:

1. Avoid using the mouse and arrow keys if they are not at the home row of your keyboard.
2. Use relative jump (eg: `5j` `12-`) for vertical movement within the screen.
3. Use `CTRL-U` `CTRL-D` `CTRL-B` `CTRL-F` `gg` `G` for vertical movement outside the screen.
4. Use word-motion (`w` `W` `b` `B` `e` `E` `ge` `gE`) for short-distance horizontal movement.
5. Use `f` `F` `t` `T` `,` `;` `0` `^` `$` for medium to long-distance horizontal movement.
6. Use operator + motion/text-object (eg: `ci{` `y5j` `dap`) whenever possible.
7. Use `%` and [square bracket commands](/posts/vim-commands-for-navigation-between-brackets) to jump between brackets.

If you are not familiar with some of the commands and concepts, you can learn about them in [Essential Vim commands for efficient text editing](/posts/vim-basic-commands).

## Examples

Here are 4 real situations I faced when creating a todo list website with javascript. I recommend you to think about how you would achieve the editing goal first and then see my approach.

Notes:
- `^` or `v` points to the position of the cursor.
- There are line number and relative line number on the left.

### Situation 1

Goal: Change `activeList` to `this` and add a `;` at the end of the line.

```javascript
// current mode: Normal
  2 if (this.sortMethod === 'Name') {
  1   activeList.uncheckedTodo.sort(sortWithName)
189 }
    ^
```

My approach: `-cwthis<ESC>A;`

- `-`: Go 1 line upward, on the first non-blank character
- `cwthis`: Change the word and type `this`.
- `<ESC>`: Leave insert mode.
- `A;`: Jump to the end of the line and type `;`.

![situation 1](https://user-images.githubusercontent.com/74842863/215338597-2ec8d0f1-dfc3-47ef-9cfd-f646fb4f1a57.gif)

### Situation 2

Goal: Change `i-s+1` to `d` and add `new ` before `Date(y, m, d)`.

```javascript
// current mode: Normal
454 console.log(Date(y, m, i-s+1));
                        ^
```

My approach: `Wct)d<C-o>FDnew ` (`<C-o>` means `CTRL-O`)

- `W`: Go one word forward, ignore symbol.
- `ct)d`: Change till before the occurrence of `)` to the right and type `d`.
- `<C-o>`: Execute one command in Normal mode and then return to Insert mode.
- `FD`: Go to the occurrence of `D` to the left.
- `new `: Type `new `.

![situation 2](https://user-images.githubusercontent.com/74842863/215338599-406d97d0-18a1-49f3-a7c7-817887b60724.gif)

### Situation 3

Goal: Add a line `activeList.sortMethod = 'Date';` below `document.querySelector('.sort-date')...`.

```javascript
// current mode: Insert
  1 document.querySelector('.sort-name').addEventListener('click', () => {
343   activeList.sortMethod = 'Name'; 
  1   activeList.update();           ^
  2 })
  3 
  4 document.querySelector('.sort-date').addEventListener('click', () => {
  5   activeList.update();
  6 })
```

My approach: `<ESC>yy4jpci'Date`

- `<ESC>`: Leave insert mode.
- `yy`: Yank current line.
- `4j`: Go down 4 line.
- `p`: Paste the line we just yanked.
- `ci'Date`: Change the content inside single quote and type `Date`.

![situation 3](https://user-images.githubusercontent.com/74842863/215339692-810b79ea-fe3d-41f9-b3d0-dcff3cb11810.gif)

### Situation 4

Goal: Move the whole block of `//sort` to the beginning of `update()` function.

```javascript
// current mode: Normal
  8 update() {
  7   this.checkedTodo.forEach((todo) => {
  6     this.element.insertBefore(todo.element, todoCreator.nextSibling);
  5   });
  4   this.uncheckedTodo.forEach((todo) => {
  3     this.element.insertBefore(todo.element, todoCreator.nextSibling);
  2   });
  1         v
200   // sort
  1   if(this.sortMethod === 'Name') {
  2     this.uncheckedTodo.sort(sortWithName);
  3   }
  4   else if(this.sortMethod === 'Date') {
  5     this.uncheckedTodo.sort(sortWithDate);
  6   }
  7
  8   createCalendar(currentYear, currentMonth, this);
  9 }
```

My approach: `dap8kp`

- `dap`: Delete around the paragraph.
- `8k`: Go up 8 lines.
- `p`: Paste the paragraph we just deleted.

![situation 4](https://user-images.githubusercontent.com/74842863/215338606-c2e3fe70-7221-4fdd-88e5-655fe24eca49.gif)

## Final Words

If you just start learning Vim operators, motions, it may take some times to think of what commands to use for each situation. However, If you keep practicing and using them, you'll become faster and faster. After a while, you’ll develop muscle memory for using these commands.

If you are using Neovim, I recommend you to try out [hardtime.nvim](https://github.com/m4xshen/hardtime.nvim). It's a plugin to help you establish good command workflow and display hints for better commands!
