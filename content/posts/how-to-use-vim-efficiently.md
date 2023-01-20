---
title: "How To Use Vim Efficiently"
date: 2023-01-12T14:06:52+08:00
draft: true
---

Vim can greatly increase your productivity. Today I'll share how to use vim in the right way.

# Moving

## Vertical

**Level 0**: Go to a line nearby.

Solution: press `k` to go up and `j` to go down.

**Level 1**: Jump to a line within the screen.

Solution: Use relative jump. Remember to set `relativenumber` option to true.

```Vim
{count}k " go up {count} lines
{count}j " go down {count} lines 
```

Example:
Your cursor is at line 5. If you want to jump to the line of `using namespace std;`, you can press `3k`.

```cpp
4 #include <iostream>
3 using namespace std;
2 
1 int main(void) {
5   cout << "hello";|  <- your cursor
1
2   return 0;
3 }
```
Situation 2: You want to jump to a line that you don't know the specific line number.

Use page scrolling.

```Vim
<C-u> " scroll half page up
<C-d> " scroll half page up
```

## Horizontal

Situation 1: You want to jump to a character that is nearby.

Use jump by word.

```Vim
w   " jump one word forward
b   " jump one word backward
e   " jump to the end of word
ge  " backward to the end of word
```

Situation 2: You want to jump to a character that is far away.

Use jump to character

```Vim
f{char} " go to the next occurrence of {char} to the right
t{char} " till before the next occurrence of {char} to the right
;       " Repeat latest f, t
,       " Repeat latest f, t in opposite direction
```

Situation 3: You want to jump to the start/end of the line.

```Vim
0   "jump to the first character of the line
$   "jump to the end of the line
^   "jump to the first non-blank character of the line
```
