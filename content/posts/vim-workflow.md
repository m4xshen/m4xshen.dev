---
title: "Vim Workflow"
date: 2023-01-26
---

There are many commands in Vim, and it is difficult to learn when to use which command. In this tutorial, I'll share my Vim workflow and give you some examples about how I use Vim.

# Workflow

There are some general rules in my workflow.

1. Use relative jump (eg: `5k 9j`) for vertical movement inside screen.
2. Use `<C-U> <C-D> <C-B> <C-F> gg G` for vertical movement outside screen.
3. Use word-motion (`w W b B e E ge gE`) for short distance horizontal movement.
4. Use `f F t T 0 ^ $ , ;` for long distance horizontal movement.
5. Use `operator + motion/text-object` (eg: `ci{ d5j`) whenever possible.

If you are not familiar with some of these concepts, please read about the [vim basic](/posts/vim-basic) first.

# Examples

Here are some real situations I faced when creating a todo list website with javascript. You can think about how you will achieve the goal first and then see my approach.

Notes:
- `^` or `v` points to the position of the cursor.
- There are line number and relative line number on the left.

## Situation 1

Goal: Change `activeList` to `this` and add a `;` at the end of the line.

```javascript
// current mode: NORMAL
  2 if(this.sortMethod == 'Name') {
  1   activeList.uncheckedTodo.sort(sortWithName)
189 }
    ^
```

My approach is `k^cwthis<ESC>A;`.

- `k`: Go up 1 line.
- `^`: Jump to the first non-blank character of the line.
- `cwthis`: Change the word and type `this`.
- `<ESC>`: Leave insert mode.
- `A;`: Jump to the end of the line and type `;`.

## Situation 2

Goal: Change `i-s+1` to `d` and add `new ` before `Date(y, m, d)`.

```javascript
// current mode: NORMAL
454 console.log(Date(y, m, i-s+1));
                        ^
```

My approach is `Wct)d<C-o>FDnew `.

- `W`: Go one word forward, ignore symbol.
- `ct)`: Change till before the occurrence of `)` to the right.
- `d<ESC>`: Type `d` and exit Insert mode.
- `<C-o>`: Execute one command in Normal mode and then return to Insert mode.
- `FD`: Go to the occurrence of `D` to the left.
- `new `: Type `new `.

## Situation 3

Goal: Add a line `activeList.sortMethod = 'Date';` below `document.querySelector('.sort-date')...`.

```javascript
// current mode: INSERT
  1 document.querySelector('.sort-name').addEventListener('click', () => {
343   activeList.sortMethod = 'Name'; 
  1   activeList.update();           ^
  2 })
  3 
  4 document.querySelector('.sort-date').addEventListener('click', () => {
  5   activeList.update();
  6 })
```

My approach is `<ESC>yy4jpci'Date`.

- `<ESC>`: Leave insert mode.
- `yy`: Yank current line.
- `4j`: Go down 4 line.
- `p`: Paste the line we just yanked.
- `ci'Date`: Change the content inside '' and type `Date`.

## Situation 4

Goal: Move the whole block of `//sort` (line 200 ~ 207) to the beginning of `update()` function.

```javascript
// current mode: NORMAL
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

# Final Words

If you just start learning Vim operators, motions, it may take some times to think of what commands to use for each situation. However, If you keep practicing and using them, you'll become faster and faster. Finally, you'll have an ituition in using commands.
