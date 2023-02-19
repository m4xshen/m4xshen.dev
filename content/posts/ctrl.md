---
title: "The CTRL Key In Vim"
date: 2023-02-02
summary: ""
author: "Max Shen"
tags: ["vim"]
draft: true
---

# CTRL In Insert Mode

```text
CTRL-W                      delete a word before the cursor
CTRL-U                      delete all entered characters before the cursor in the current line

CTRL-N                      find next match for words that start with the keyword in front of the cursor,
CTRL-P                      find previous match for words that start with the keyword in front of the cursor,

CTRL-E                      insert the character which is below the cursor
CTRL-Y                      insert the character which is above the cursor

CTRL-A                      insert previously inserted text
CTRL-@                      insert previously inserted text and stop insert
CTRL-C                      quit insert mode, go back to normal mode

CTRL-T                      insert one shiftwidth of indent at the start of the current line
CTRL-D                      delete one shiftwidth of indent at the start of the current line

CTRL-I                      insert a tab
CTRL-J or CTRL-M            begin new line

CTRL-R {register}           insert the content of a register
(example: CTRL-R " can insert the last delete or yank0

CTRL-K {char}               insert a digraph
(example: you can insert a square root with CTRL-K RT)

CTRL-V or CTRL-Q            insert next non-digit literally
(example: CTRL-V <Del> can insert <Del> literally)

CTRL-]		                trigger abbreviation, without inserting a character.

CTRL-X                      enter CTRL-X mode
```

## CTRL-X mode

### scroll

```text
CTRL-Y          scroll window one line down
CTRL-E          scroll window one line up
```

### completion
```text
CTRL-L          whole lines
CTRL-N          keywords in the current file
CTRL-K          keywords in 'dictionary'
CTRL-T          keywords in 'thesaurus', thesaurus-style
CTRL-I          keywords in the current and included files
CTRL-]          tags
CTRL-F          file names
CTRL-D          definitions or macros
CTRL-V          vim command-line
CTRL-U          user defined completion
CTRL-O          omni completion
s               spelling suggestions
CTRL-N          search forwards for words that start with the keyword in front of the cursor
CTRL-P          search backwards for words that start with the keyword in front of the cursor
```
