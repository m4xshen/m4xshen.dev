---
title: "Understanding CSS Flow"
date: 2023-03-29T15:46:35+08:00
draft: false
tags: ["CSS"]
---

## The CSS Box Model

CSS takes DOM and renders it onto a canvas such as your screen, a piece of paper. To do this, it generates an intermediary structure, the box tree, which represents the formatting structure of the rendered document. Then, for each element, CSS generates zero or more boxes.

![css box model](https://res.cloudinary.com/practicaldev/image/fetch/s--7ihEu6G5--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/iwkjpm93cri86dxj19gb.png)

### Principal Box

When an element generates one or more boxes, one of them is the principal box, which contains its descendant boxes and generated content in the box tree, and is also the box involved in any positioning scheme.

### Anonymous Boxes

An anonymous box is created when there is not an HTML element to use for the box. It cannot be targeted and styled like a regular box because there is no element to target.

### Line Boxes

Line boxes are the boxes that wrap each line of text.

example:
```html
<div class="flex">
  I am wrapped in an anonymous box 
  <p>I am in the paragraph</p>
  I am wrapped in an anonymous box.
</div>
```

## Formatting Context

A formatting context is the environment into which a set of related boxes are laid out. Different formatting contexts lay out their boxes according to different rules.

When a box establishes an independent formatting context (whether that formatting context is of the same type as its parent or not), it essentially creates a new, independent layout environment: except through the sizing of the box itself, the layout of its descendants is (generally) not affected by the rules and contents of the formatting context outside the box, and vice versa. 

### Blocking Formatting Context (BFC)

In a block formatting context, boxes are laid out one after the other, vertically, beginning at the top of a containing block. The vertical distance between two sibling boxes is determined by the `margin` properties. Vertical margins between adjacent block-level boxes in a block formatting context collapse.

The outermost element in a document that uses block layout rules establishes the initial block formatting context. This means that every element inside the <html> element's block is laid out according to normal flow following the rules for block and inline layout.

A new BFC will behave much like the outermost document in that it becomes a mini-layout inside the main layout.

### Inline Formatting Context

In an inline formatting context, boxes are laid out horizontally, one after the other, beginning at the top of a containing block. Horizontal margins, borders, and padding are respected between these boxes.

The boxes may be aligned vertically in different ways: their bottoms or tops may be aligned, or the baselines of text within them may be aligned. The rectangular area that contains the boxes that form a line is called a line box.

Inline formatting contexts exist inside other formatting contexts and can be thought of as the context of a paragraph. The paragraph creates an inline formatting context inside which such things as `<strong>`, `<a>`, or `<span>` elements are used on text.

## Positioning Schemes

### Normal Flow

Boxes in the normal flow belong to a formatting context, which may be block or inline, but not both simultaneously. Block-level boxes participate in a block formatting context. Inline-level boxes participate in an inline formatting context.

All elements are in-flow apart from:

- floated items
- items with position: `absolute` or `fixed`
- the root element (html)

Out of flow items create a new BFC and therefore everything inside them can be seen as a mini layout, separate from the rest of the page. The root element therefore is out of flow, as the container for everything in our document, and establishes the Block Formatting Context for the document.

Out of flow essentially means that the other elements on your page no longer know that element exists so will not respond to it.

### Floats

In the float model, a box is first laid out according to the normal flow, then taken out of the flow and positioned, typically to the left or right. Content may flow along the side of a float.

If we want to stop the following element from moving up, we need to clear it; this is achieved with the clear property.

The `clear` property accepts the following values:
- `left`: Clear items floated to the left.
- `right`: Clear items floated to the right.
- `both`: Clear any floated items, left or right.

### Absolute Positioning

- `position: absolute`: offsets are based on the containing block
- `position: fixed`: offsets are based on the viewport

### Relative Positioning

If you give an item relative positioning with `position: relative`, it remains in flow. However, you are then able to use the offset values to push it around.

## Box Layout Modes

In CSS, there are two types of display:
- inner display type: dictates how its descendant boxes are laid out.
- outer display type: dictates how the principal box itself participates in flow layout.

You can set the `display` property like this:

`display: <display-outside> <display-inside>`

If a `<display-outside>` value is specified but `<display-inside>` is omitted, the element’s inner display type defaults to `flow`.

### Outer Display Type

- `block`: The element generates a box that is block-level when placed in flow layout.
- `inline`: The element generates a box that is inline-level when placed in flow layout.

### Inner Display Type

- `flow`: If its outer display type is inline , and it is participating in a block or inline formatting context, then it generates an inline box. Otherwise it generates a block container box.
- `flow-root`: The element generates a block container box, and lays out its contents using flow layout. It always establishes a new BFC for its contents.
- `flex`: The element generates a principal flex container box and establishes a flex formatting context.
- `grid`: The element generates a principal grid container box, and establishes a grid formatting context.

### Special Display Type

- `none`: subtree omitted from box tree 
- `contents`: element replaced by contents in box tree 

### Expand Short Display

- `block` = `block flow`
- `flow-root` = `block flow-root`
- `inline` = `inline flow`
- `inline-block` = `inline flow-root`
- `flex` = `block flex`
- `inline-flex` = `inline flex`
- `grid` = `block grid`
- `inline-grid` = `inline grid`

## Overflow

Overflow happens when there is too much content to fit in a box.

The `overflow` property is how you take control of an element's overflow. The default value of overflow is `visible`. With this default, we can see content when it overflows.

available values:
- `scroll`: scrollbars will always appear all the time
- `auto`: scrollbars will appear when the content overflow

Using `scroll` and `auto` creates a BFC.

The content of the box that you have changed the value of overflow for acquires a self-contained layout. Content outside the container cannot poke into the container, and nothing can poke out of that container into the surrounding layout.

- https://www.w3.org/TR/css-2023/
- https://www.w3.org/TR/css-display-3/
- https://www.w3.org/TR/css-position-3/
- https://www.w3.org/TR/css-align-3/
- https://www.w3.org/TR/css-sizing-3/
