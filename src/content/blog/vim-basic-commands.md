---
title: "Essential Vim commands for efficient text editing"
pubDate: '2023-01-25'
description: "Master the essential Vim commands for efficient text editing. Learn Normal, Insert, and Command-line modes, navigation, editing, and more in this comprehensive Vim tutorial."
---

In this tutorial, I'll cover the basic commands and concepts that you need to know to work in Vim efficiently. I recommend you to open a file with Vim/Neovim and try the command while reading it.

The 3 most used modes in Vim:

- Normal mode: Used for moving/editing text. When you press `<ESC>` in other modes, you'll get back to Normal mode.
- Command-line mode: Used for executing commands (eg: save file, open help file).
- Insert mode: Used for inserting text.

You can learn more about each command with the Vim's help file. Open it by typing `:h {command name}` and hit enter.

## Normal Mode

To begin with, let's learn how to move your cursor in Vim normal mode.

### Motions

`motion` is a command that moves your cursor to a specific location. Here are some basic motions:

#### Up-down motions


```plaintext
k           go up
j           go down
-           go up and move to the first non-blank character
+ or <CR>   go down and move to the first non-blank character
(<CR> means enter)
gg          go to first line
G           go to last line
```

Learn more with `:h up-down-motions`.

#### Left-right motions

```plaintext
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

Learn more with `:h left-right-motions`.

#### Word motions

```plaintext
w			go one word forward
W			go one word forward, ignore symbol
e			go forward to the end of word
E			go forward to the end of word, ignore symbol
b			go one word backward
B			go one word backward, ignore symbol
ge			go backward to the end of word
gE			go backward to the end of word, ignore symbol
```

Learn more with `:h word-motions`.

#### Motion with number

You can add number before `motion` to execute it multiple times. For example, `5j` will move the cursor down 5 lines.

This is very useful when you want to move the cursor to a specific line quickly. This is often used with `'relativenumber'` option enabled so you can see the line number relative to the current line.

### Operator

After being able to move in Vim, let's learn how to editing text. The way to edit text in Vim is through `operator`.

```plaintext
d           delete
y           yank(copy)
c           change(delete and enter insert mode)
```

(after delete or yank you can use `p` to paste)

Learn more with `:h operator`.

#### Operation to current line

A most simple way to use `operator` is to repeat it twice, which will apply the operation to the current line:

- `d` `d` - delete current line
- `y` `y` - yank current line
- `c` `c` - change current line

#### Operation to end of line

You can use the uppercase version of `operator`, which will apply the operation from the current cursor position to the end of the line:

- `D` - delete until the end of the line
- `Y` - yank until the end of the line
- `C` - change until the end of the line

#### Operation with motion

Another way to use `operator` is to combine it with `motion` that we just learned. This will apply the operation from the current cursor position to the specific location.

Some examples of `operator` + `motion`:

- `d` `e` - `d`elete to the `e`nd of the word
- `c` `t(` - `c`hange `t`ill the first occurrence of `(`
- `y` `5j` - `y`ank to 5 lines down

Another way to use `operator` is to combine it with `text-objects`. Let's learn about `text-objects` first.

### Text Objects

```plaintext
iw          inside word
aw          around word

ip          inside paragraph
ap          around paragraph

it          inside tag block (for HTML, JSX, etc.)
at          around tag block (for HTML, JSX, etc.)

i{          inside {}
a{          around {}
...(you can apply this to any pair block [] () <> '' "" ``)
```

Learn more with `:h text-objects`.

#### Operation with text object

Some examples of `operator` + `text-objects`:

- `c` `i"` - `c`hange `i`nside `""`
- `d` `a{` - `d`elete `a`round `{}`
- `y` `ap` - `y`ank `a`round `p`aragraph

Tip: If the `text-objects` is pair block, Vim will find the nearest one from the right of your cursor. This trick is very useful.

Example (`|` is the position of your cursor):

```cpp
int main(void) {
| cout << "test";

  return 0;
}

NORMAL MODE
```

After you press `ci"`:

```cpp
int main(void) {
  cout << "|";

  return 0;
}

INSERT MODE
```

You can use `ci"` to change the text inside `"test"` even if your cursor is at the beginning of the line.

### Scrolling

Scrolling is useful when you want to move vertically to a position that is not visible on the screen.

```plaintext
CTRL-U       scroll window half a screen upwards
CTRL-D       scroll window half a screen downwards
CTRL-B       scroll window a full screen upwards
CTRL-F       scroll window a full screen downwards
```

Learn more with `:h scrolling`.

### Inserting

There are several ways to enter insert mode:

```plaintext
i           insert text before the cursor
I           insert text before the first non-blank in the line
a           append text after the cursor
A           append text at the end of the line
o           begin a new line below the cursor and insert text
O           begin a new line above the cursor and insert text
```

Learn more with `:h inserting`.

### Others

```plaintext
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

## Insert Mode

```plaintext
<ESC>       leave insert mode
i_CTRL-O    execute one command in Normal mode and then return to Insert mode
```

## Command-line Mode

```plaintext
:w<CR>          save the current file
:q<CR>          quit
:q!<CR>         quit without checking for changes (same as ZQ)
:wq<CR>         save current file and quit (same as ZZ)
/{pattern}<CR>  search forward for the occurrence of {pattern}
?{pattern}<CR>  search backward for the occurrence of {pattern}
n			    repeat the latest `/` or `?`
N			    repeat the latest `/` or `?` in opposite direction
```

## Final Words

Remember all these command takes some time. If you are already familiar with these commands, you can continue to read the [Practical Vim command workflow](/posts/vim-command-workflow) to learn how to move/edit text in Vim efficiently.
