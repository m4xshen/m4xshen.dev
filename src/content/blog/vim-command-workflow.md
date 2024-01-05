---
title: "Practical Vim command workflow"
pubDate: '2023-01-26'
description: "Master the art of efficient text navigation and editing in Vim with this comprehensive command workflow tutorial. Explore key commands and practical examples to enhance your productivity in Vim."
---

There are many commands in Vim, which means that you can achieve a same goal with many approaches. Therefore it is difficult for beginner to learn how to accomplish an editing task with less keystrokes. In this tutorial, I'll share my Vim command workflow and give you some guidelines about how to move/edit text in Vim efficiently.

## Guidelines

Here are some general rules of my workflow.

1. Don't use arrow keys and mouse.
2. Use relative jump (eg: `5k 12j`) for vertical movement inside screen.
3. Use `CTRL-U CTRL-D CTRL-B CTRL-F gg G` for vertical movement outside screen.
4. Use word-motion (`w W b B e E ge gE`) for short distance horizontal movement.
5. Use `f F t T 0 ^ $ , ;` for mid long distance horizontal movement.
6. Use `operator + motion/text-object` (eg: `ci{ d5j`) whenever possible.

If you are not familiar with some of these concepts, please learn about the [Essential Vim commands for efficient text editing](/posts/vim-basic-commands) first.

## Examples

Here are 4 real situations I faced when creating a todo list website with javascript. You can think about how you will achieve the editing goal first and then see my approach.

Notes:
- `^` or `v` points to the position of the cursor.
- There are line number and relative line number on the left.

### Situation 1

Goal: Change `activeList` to `this` and add a `;` at the end of the line.

```javascript
// current mode: Normal
  2 if(this.sortMethod == 'Name') {
  1   activeList.uncheckedTodo.sort(sortWithName)
189 }
    ^
```

My approach is `-cwthis<ESC>A;<ESC>`.

- `-`: Go 1 line upward, on the first non-blank character
- `cwthis`: Change the word and type `this`.
- `<ESC>`: Leave insert mode.
- `A;<ESC>`: Jump to the end of the line, type `;` and leave Insert mode.

![situation 1](https://user-images.githubusercontent.com/74842863/215338597-2ec8d0f1-dfc3-47ef-9cfd-f646fb4f1a57.gif)

### Situation 2

Goal: Change `i-s+1` to `d` and add `new ` before `Date(y, m, d)`.

```javascript
// current mode: Normal
454 console.log(Date(y, m, i-s+1));
                        ^
```

My approach is `Wct)d<C-o>FDnew <ESC>`. (`<C-o>` means `CTRL-O`)

- `W`: Go one word forward, ignore symbol.
- `ct)d`: Change till before the occurrence of `)` to the right and type `d`.
- `<C-o>`: Execute one command in Normal mode and then return to Insert mode.
- `FD`: Go to the occurrence of `D` to the left.
- `new <ESC>`: Type `new ` and leave Insert mode.

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

My approach is `<ESC>yy4jpci'Date<ESC>`.

- `<ESC>`: Leave insert mode.
- `yy`: Yank current line.
- `4j`: Go down 4 line.
- `p`: Paste the line we just yanked.
- `ci'Date<ESC>`: Change the content inside '', type `Date` and leave Insert mode.

![situation 3](https://user-images.githubusercontent.com/74842863/215339692-810b79ea-fe3d-41f9-b3d0-dcff3cb11810.gif)

### Situation 4

Goal: Move the whole block of `//sort` (line 200 ~ 207) to the beginning of `update()` function.

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
  1   if(this.sortMethod == 'Name') {
  2     this.uncheckedTodo.sort(sortWithName);
  3   }
  4   else if(this.sortMethod == 'Date') {
  5     this.uncheckedTodo.sort(sortWithDate);
  6   }
  7
  8   createCalendar(currentYear, currentMonth, this);
  9 }
```

My approach is `dap8kp`.

- `dap`: Delete around the paragraph.
- `8k`: Go up 8 lines.
- `p`: Paste the paragraph we just deleted.

![situation 4](https://user-images.githubusercontent.com/74842863/215338606-c2e3fe70-7221-4fdd-88e5-655fe24eca49.gif)

## Final Words

If you are using Neovim, I recommend you to try out a plugin [hardtime.nvim](https://github.com/m4xshen/hardtime.nvim), which can help you establish good command workflow and display hints for better commands.

If you just start learning Vim operators, motions, it may take some times to think of what commands to use for each situation. However, If you keep practicing and using them, you'll become faster and faster. After a while, you’ll develop muscle memory for using these commands.
