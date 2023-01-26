---
title: "Vim Basic"
date: 2023-01-25
summary: "Learn about the basics and practical comands in Vim. This tutorial covers normal mode, command-line mode and insert mode in Vim."
---

In this tutorial, I'll teach you the basic and practical commands in Vim. I recommend you to open your Vim/Neovim and try the command while reading it.

Today I'll only cover 3 modes in Vim:

- Normal mode: Used for edit text. The default mode.
- Command-line mode: Used for executing commands (eg: save file, search).
- Insert mode: Used for inserting text.

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

The pattern of editing text looks like this:

```text
operator + motion or text-object
```

## Operator

See more with `:h operator`.

```text
d           delete
y           yank(copy) into register
(after delete or yank you can use `p` to paste)
c           change
~           swap case
=           format
```

Some examples of operator + motion:
```text
cw          change a wrod
dt(         delete till the first occurrence of (
d5j         delete to the 5 lines down
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
...(you can apply this to [] () <> '' "" ``)
```

Some examples of operator + text-object:

```text
ci"         change in side ""
dap         delete around paragraph
=i{         format the code inside {}
```

## Scrolling

See more with `:h scrolling`.

```text
<C-U>       scroll window half a screen upwards
<C-D>       scroll window half a screen downwards
<C-B>       scroll window a screen upwards
<C-F>       scroll window a screen downwards
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
u           undo
<C-r>       redo
.           repeat last change 
ZQ          quit ithout checking for changes
ZZ          save current file and close the current window
```

# Insert Mode

```text
<ESC>       leave insert mode
<C-o>       execute one command in Normal mode and then return to Insert mode
```

# Command-line Mode

```text
:w<CR>          save the current file
/{pattern}<CR>  search forward for the occurrence of {pattern}
?{pattern}<CR>  search backward for the occurrence of {pattern}
n			    repeat the latest `/` or `?`
N			    repeat the latest `/` or `?` in opposite direction
```
