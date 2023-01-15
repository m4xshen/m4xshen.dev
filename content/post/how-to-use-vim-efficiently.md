---
title: "How To Use Vim Efficiently"
date: 2023-01-12T14:06:52+08:00
draft: true
---

Vim can greatly increase your productivity. However, I've seen many people use vim in a wrong way. Today I'll share how to use vim in the right way.

# Moving

## Vertical

1. relative jump

```Vim
{count}k " go up {count} lines
{count}j " go down {count} lines 
```

Use this when if the line you want to go to is within the screen. Remember to set relativenumber option to true.

Example:
Your cursor is at line 5. If you want to jump to the line of using namespace, you can press 3k.

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
2. scroll page

```Vim
<C-u> " scroll half page up
<C-d> " scroll half page up
```

Use this if the line you want to go to is out of the screen.

## Horizontal

1. jump by word

Use this if the character you want to go to is nearby.

```Vim
w   " go one word forward
b   " go one word backward
e   " go to the end of word
ge  " backward to the end of word
```

2. jump to character

Use this if the character you want to go to is far away.

```Vim
f{char} " go to the next occurrence of {char} to the right
t{char} " till before the next occurrence of {char} to the right
;       " Repeat latest f, t
,       " Repeat latest f, t in opposite direction
```

3. jump to start/end

```Vim
0   "jump to the first character of the line
$   "jump to the end of the line
^   "jump to the first non-blank character of the line
```
