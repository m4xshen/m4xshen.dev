---
title: "The CTRL Key In Vim"
date: 2023-02-02
summary: ""
author: "Max Shen"
tags: ["vim"]
draft: true
---

> usr_27.txt
https://learnbyexample.gitbooks.io/vim-reference/content/Regular_Expressions.html

### simple search patterns

```text
/apple$
```
matches "apple" at the end of the line

```text
/^apple
```
matches "apple" at the beginning of the line

"." matches any character

```text
/s.t
```
matches "sit", "sat", etc.

### match repeated pattern

"*" specifies that the item before it can match any number of times.

```text
/a*
```

matches ""(0 times), "a"(1 times), "aa"(2 times), "aaa"(3 times), etc.

You can match a whole string multiple times by putting "\(" before it and "\)" after it.

```text
/\(ab\)*
```

matches "", "ab", "abab", "ababab", etc.

You can avoid matching the empty string by using "\+".

```text
/ab\+
```

matches "ab", "abb", "abbb", etc.

Use "\=" to match an optional item.

```text
/apples\=
```

matches "apple" and "apples"

### specific counts

The item before "\{n,m}" will be matched "n" to "m" times.

```text
/ab\{3,5}
```

matches "abbb", "abbbb" and "abbbbb"

When "n" is omitted, it defaults to 0.  When "m" is omitted it defaults to infinity.  When ",m" is omitted, it matches exactly "n" times.

```text
\{0,1}		0 or 1, same as \=
\{0,}		0 or more, same as *
\{1,}		1 or more, same as \+
```

The items so far match as many characters as they can find.  To match as few as possible, use "\{-n,m}".  It works the same as "\{n,m}", except that the minimal amount possible is used.

```text
/ab\{-1,}
```

matches "ab", it will never match more than one b.

### alternatives

The "or" operator in a pattern is "\|".

```text
/one\|two\|three
```

matches "one", "two" and "three"

We can combine this with what we learned previous.

```text
/\(foo\|bar\)\+
```
matches "foo", "bar", "foobar", "foofoo", "barfoo", "barbar", "foofoofoo", etc.

### character ranges

The [] construct matches a single character.  Inside you specify which characters to match.  You can include a list of characters, like "/[abc]" will matches "a", "b" or "c".

### complemented range

To avoid matching a specific character, use "^" at the start of the range. The [] item then matches everything but the characters included.  Example:  

```text
/"[^"]*"
```
- "    a double quote
- [^"] any character that is not a double quote
- *    as many as possible
- "    a double quote

### predefined ranges

```text
item	matches			        equivalent  
\d	    digit			        [0-9]
\D	    non-digit		        [^0-9]
\x	    hex digit		        [0-9a-fA-F]
\X	    non-hex digit		    [^0-9a-fA-F]
\s	    white space		        [ 	]
\S	    non-white characters	[^ 	]
\l	    lowercase alpha		    [a-z]
\L	    non-lowercase alpha	    [^a-z]
\u	    uppercase alpha		    [A-Z]
\U	    non-uppercase alpha	    [^A-Z]
```

Note: These items can not be used inside [].  Thus "[\d\l]" does NOT work to match a digit or lowercase alpha.  Use "\(\d\|\l\)" instead.
