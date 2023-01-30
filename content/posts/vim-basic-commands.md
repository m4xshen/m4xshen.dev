---
author: "Max Shen"
title: "Vim Basic Commands"
date: 2023-01-25
summary: "In this tutorial, you'll learn the basic commands in Normal, Command-line and Insert mode that you need to know to work in Vim efficiently."
tags: ["vim"]
categories: ["tutorial"]
---

In this tutorial, I'll cover the basic commands that you need to know to work in Vim efficiently. I recommend you to open a file with Vim/Neovim and try the command while reading it.

The 3 most used modes in Vim:

- Normal mode: Used for moving/editing text. When you press `<ESC>` in other modes, you'll get back to Normal mode.
- Command-line mode: Used for executing commands (eg: save file, open help file).
- Insert mode: Used for inserting text.

You can learn more about each command with the Vim's help file. Open it by typing `:h {command name}` and hit enter. 

# Normal Mode

To begin with, let's learn how to move in Vim.

## Up-down Motions

See more with `:h up-down-motions`.

```text
k           go up
j           go down
gg          go to first line
G           go to last line
```

## Left-right Motions

See more with `:h left-right-motions`.

```text
h           go left 
l           go right 
0           go to the first character of the line
^			go to the first non-blank character of the line
$           go to the end of the line
f{char}		go to the occurrence of {char} to the right
F{char}		go to the occurrence of {char} to the left
t{char}		go till before the occurrence of {char} to the right
T{char}		go till after the occurrence of {char} to the left
;			repeat latest f, t, F or T
,			repeat latest f, t, F or T in opposite direction
```

## Word Motions

See more with `:h word-motions`.

```text
w			go one word forward
W			go one word forward, ignore symbol
e			go forward to the end of word
E			go forward to the end of word, ignore symbol
b			go one word backward
B			go one word backward, ignore symbol
ge			go backward to the end of word
gE			go backward to the end of word, ignore symbol
```

After being able to move in Vim, let's learn how to editing text. The pattern of editing looks like this:

```text
operator + motion or text-object
```

## Operator

See more with `:h operator`.

```text
d           delete
y           yank(copy) into register
(after delete or yank you can use `p` to paste)
c           change(delete and start insert)
~           swap case
=           format
```

Some examples of operator + motion:
```text
cw          change a wrod
dt(         delete till the first occurrence of (
y5j         yank to 5 lines down
```

Exceptions:
```text
dd          delete current line
D           delet until the end of the line
yy          yank current line
Y           yank until the end of the line
cc          change current line
C           change until the end of the line
==          format current line
```

## Text Objects

See more with `:h text-objects`.

```text
iw          inside word
aw          around word 

ip          inside paragraph
ap          around paragraph 

it          inside tag block (for HTML and XML)
at          around tag block (for HTML and XML)

i{          inside {}
a{          around {}
...(you can apply this to any pair block [] () <> '' "" ``)
```

Some examples of operator + text-object:

```text
ci"         change inside ""
dap         delete around paragraph
=i{         format the code inside {}
```

Note: If the text-object is pair block, Vim will find the nearest one from the right of your cursor. This trick is very useful.

Example (^ points to the position of your cursor):

```cpp
int main(void) {
  cout << "test";
^
  return 0;
}
```

You can use `ci"` to change the text inside "" pair although your cursor is at the beginning of the line.

## Scrolling

See more with `:h scrolling`.

```text
CTRL-U       scroll window half a screen upwards
CTRL-D       scroll window half a screen downwards
CTRL-B       scroll window a screen upwards
CTRL-F       scroll window a screen downwards
```

## Inserting

See more with `:h inserting`.

```text
i           insert text before the cursor
I           insert text before the first non-blank in the line
a           append text after the cursor
A           append text at the end of the line
o           begin a new line below the cursor and insert text
O           begin a new line above the cursor and insert text
```

## Others

You can add number before command to execute it [count] times.

Examples: `5k` will go up 5 lines

```text
s           delete character and start insert (synonym for cl)
S           delete line and start insert (synonym of cc)
x           delete character under the cursor
X           delete character before the cursor
u           undo
CTRL-R      redo
.           repeat last change 
ZQ          quit without checking for changes
ZZ          save current file and quit
```

# Insert Mode

```text
<ESC>       leave insert mode
i_CTRL-O    execute one command in Normal mode and then return to Insert mode
```

# Command-line Mode

(`<CR>` means enter)
```text
:w<CR>          save the current file
:q<CR>          quit
:q!<CR>         quit without checking for changes (same as ZQ)
:wq<CR>         save current file and quit (same as ZZ)
/{pattern}<CR>  search forward for the occurrence of {pattern}
?{pattern}<CR>  search backward for the occurrence of {pattern}
n			    repeat the latest `/` or `?`
N			    repeat the latest `/` or `?` in opposite direction
```

# Final Words

Remember all these command takes some time. If you are already familiar with these commands, you can continue to read the [vim command workflow](/posts/vim-command-workflow) to learn how to move/edit text in Vim efficiently.
