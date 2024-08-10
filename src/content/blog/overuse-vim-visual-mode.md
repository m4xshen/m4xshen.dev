---
title: "You might be overusing Vim visual mode"
pubDate: '2024-08-09'
description: "Learn why you might be overusing Vim's visual mode and how adopting a different mindset can help you use Vim more efficiently. Discover alternative commands and techniques that can save you keystrokes and boost your productivity in this insightful post."
---

When I started learning Vim few years ago, I read through a lot of blog posts and watched a lot of videos. I notice that most of the tutorials teach visual mode in a way that makes it seem like an important part of Vim.

After using Vim for a while, I think this is a mistake. Visual mode is not as important as most people think. In fact, you might be overusing it.

Let me explain why with some examples.

## Example 1: Copying whole file

Let's say you want to copy the whole file to system clipboard to ask ChatGPT for help. You might do something like this:

```
ggVG"+y
```

Let's break it down:
1. `gg` - Go to the beginning of the file.
2. `V` - Enter visual line mode.
3. `G` - Go to the end of the file.
4. `"+y` - Yank the selected text to system clipboard.

However, you can actually achieve the same result with fewer keystrokes:

```
gg"+yG
```

Here's the breakdown:

1. `gg` - Go to the beginning of the file.
2. `"+yG` - Yank from the current position to the end of the file to system clipboard.

## Example 2: Deleting current and previous line

Let's say you want to delete current and previous line. You might do something like this:

```
Vkd
```

Let's break it down:

1. `V` - Enter visual line mode.
2. `k` - Move up one line.
3. `d` - Delete the selected lines.

However, you can actually do it with fewer keystrokes:

```
dk
```

## Different mindset

In the above examples, the first editing approach is: `v/V` + [`motion`](/posts/vim-basic-commands#motions) + [`operator`](/posts/vim-basic-commands/#operator). You select text, move the cursor to a specific location, and then do the operation.

The second approach is: [`operator`](/posts/vim-basic-commands/#operator) + [`motion`](/posts/vim-basic-commands#motions). This means apply an operation from current cursor position to a specific location. In this way you don't need to enter visual mode at all.

I think the reason why so many people stick to first approach is because when we use general text editors, we are used to selecting text with the mouse and then do the operation. So, when we switch to Vim, we try to do the same thing with visual mode.

However, Vim is not a general text editor. It has a lot of powerful normal mode `motion` that can help you achieve the same result without selecting text first.

This is a different mindset, but once you get used to it, you will find that you can do things much faster in Vim!

## You still need visual mode

While I think you might be overusing visual mode, I'm not saying you should never use it.

If you can't find a `motion`  to achieve what you want, visual mode is a good fallback. Here are some situations where you actually need visual mode:
1. Select text that is not selectable with simple `motion`.
2. Select lines that are out of the current view.
3. Visually confirm the text you are going to operate on.
4. Use blockwise visual mode to operate on multiple lines at once.

## Bonus tip

If you are too used to visual mode and find it hard to switch to the new mindset. You can try installing [hardtime.nvim](https://github.com/m4xshen/hardtime.nvim). It will notify you when there's a better way to do what you are trying to do with visual mode.

For example, if you try to use `V5jd`, it will show you a warning message:

```
Use d5j instead of V5jd
```

In this way you can slowly get used to the new mindset.
