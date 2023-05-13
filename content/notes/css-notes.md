---
author: "Max Shen"
title: "CSS Notes"
date: 2024-01-01
summary: "My CSS notes"
tags: ["template"]
categories: ["template"]
draft: true
---

## DOM

A DOM has a tree-like structure. Each element, attribute, and piece of text in the markup language becomes a DOM node in the tree structure. Understanding the DOM helps you design, debug and maintain your CSS because the DOM is where your CSS and the document's content meet up.

A real HTML snippet is converted into a DOM:

```html
<p>
  Let's use:
  <span>Cascading</span>
  <span>Style</span>
  <span>Sheets</span>
</p>
```

```text
P
├─ "Let's use:"
├─ SPAN
|  └─ "Cascading"
├─ SPAN
|  └─ "Style"
└─ SPAN
    └─ "Sheets"
```

If a browser encounters a CSS selector or declaration it doesn't recognize, it does nothing, and just moves on to the next bit of CSS!

## CSS selectors

A CSS selector is the first part of a CSS Rule. It is a pattern of elements and other terms that tell the browser which HTML elements should be selected to have the CSS property values inside the rule applied to them.

If you have more than one thing which uses the same CSS then the individual selectors can be combined into a selector list so that the rule is applied to all of the individual selectors.

```css
h1,
.special {
  color: blue;
}
```

### Type selectors
```css
h1 {
}
```

### The universal selector
```css
* {
  margin: 0;
}
```

### Class selectors
```css
.box {
}
```

### Targeting classes on particular elements
```css
span.highlight {
  background-color: yellow;
}
```

### ID selectors
```css
#unique {
}
```

### Presence and value selectors
```css
li[class] /* match any list item with a class attribute */
li[class="c"] /* matches a selector with a class of only c*/
li[class~="c"] /* match a class of c but also a value that contains the class of c as part of a whitespace-separated list */
```

### Substring matching selectors

```css
li[class^="c"] /* matches any attribute value which starts with c */
li[class$="c"] /* matches any attribute value that ends with c */
li[class*="c"] /* matches any attribute value where c appears anywhere in the string */
```

### Pseudo-class

A pseudo-class is a selector that selects elements that are in a specific state (eg: `:hover`).

```css
:first-child
:hover
:focus
```

### Pseudo-element

Pseudo-elements behave in a similar way. However, they act as if you had added a whole new HTML element into the markup, rather than applying a class to existing elements. (eg: `::before`)

```css
::first-line

/* used along with the content property to insert content into document */
::before
::after

/* example */
article p:first-child::first-line {
  font-size: 120%;
  font-weight: bold;
}
```

## Combinators

### Descendant combinator (` `)

Combines two selectors such that elements matched by the second selector are selected if they have an ancestor element matching the first selector.

### Child Combinator (`>`)

Matches only those elements matched by the second selector that are the direct children of elements matched by the first.

### Adjacent sibling combinator (`+`)

Matches only those elements matched by the second selector that are the next sibling element of the first selector.

### General sibling combinator (`~`)

Select siblings of an element even if they are not directly adjacent.

Instead of creating big lists of selectors, it is often better to create a simple class and apply that to the element in question.

## Conflicting rules

- Inheritance
- Cascade
- Specificity

### Inheritance

The `color` property is an inherited property. So, the `color` property value is applied to the direct children and also to the indirect children.

CSS provides five special universal property values for controlling inheritance:
- `inherit`: Sets the property value applied to a selected element to be the same as that of its parent element.
- `initial`: Sets the property value applied to a selected element to the initial value of that property.
- `revert`: Resets the property value applied to a selected element to the browser's default styling rather than the defaults applied to that property.
- `revert-layer`: Resets the property value applied to a selected element to the value established in a previous cascade layer.
- `unset`: Resets the property to its natural value, which means that if the property is naturally inherited it acts like `inherit` , otherwise it acts like `initial`.

The CSS shorthand property `all` can be used to apply one of these inheritance values to all properties at once.

```css
.fix-this {
  all: unset;
}
```

### Cascade

The rule that is nearer the element itself overwrites the earlier ones until the last one wins and gets to style the element.

Conflicting declarations will be applied in the following order, with later ones overriding earlier ones:
1. Declarations in user agent style sheets (browser's default styles).
2. Normal declarations in user style sheets (custom styles set by a user).
3. Normal declarations in author style sheets (these are the styles set by web developers).
4. Important declarations in author style sheets.
5. Important declarations in user style sheets.
5. Important declarations in user agent style sheets.

### Specificity

The amount of specificity a selector has is measured using three different values, which can be thought of as ID, CLASS, and ELEMENT columns in the hundreds, tens, and ones place:

- ID: Score one in this column for each ID selector contained inside the overall selector.
- Classes: Score one in this column for each class selector, attribute selector, or pseudo-class contained inside the overall selector.
- Elements: Score one in this column for each element selector or pseudo-element contained inside the overall selector.

Examples:
- `h1`: 0-0-1
- `h1 + p::first-letter`: 0-0-3
- `li > a[href*="en-US"] > .inline-warning`: 0-2-2
- `button:not(#mainBtn, .cta)`: 1-0-1

Exceptions:
- Inline styles: The style declaration inside a style attribute, take precedence over all normal styles.
- `!important`: Override the normal rules of the cascade, including normal inline styles.

## CSS Box Model

### Parts of a box

- Content box: The area where your content is displayed; size it using properties like `inline-size` and `block-size` or `width` and `height`.
- Padding box: The padding sits around the content as white space; size it using `padding` and related properties.
- Border box: The border box wraps the content and any padding; size it using `border` and related properties.
- Margin box: The margin is the outermost layer, wrapping the content, padding, and border as whitespace between this box and other elements; size it using `margin` and related properties.

### Standard CSS box model

### The alternative CSS box model

In the alternative box model, any width is the width of the visible box on the page. The content area width is that width minus the width for the padding and border. To turn on the alternative model for an element, set `box-sizing: border-box` on it:

To use the alternative box model for all of your elements, set the `box-sizing` property on the `<html>` element and set all other elements to inherit that value:

```css
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
```

#### Margin

- `margin-top`
- `margin-right`
- `margin-bottom`
- `margin-left`

The margin is an invisible space around your box. It pushes other elements away from the box. Margins can have positive or negative values. Setting a negative margin on one side of your box can cause it to overlap other things on the page.

Whether you are using the standard or alternative box model, the margin is always added after the size of the visible box has been calculated.

#### Margin collapsing

- Two positive margins will combine to become one margin. Its size will be equal to the largest individual margin.
- Two negative margins will collapse and the smallest (furthest from zero) value will be used.
- If one margin is negative, its value will be subtracted from the total.

#### Borders

- `border-top`
- `border-right`
- `border-bottom`
- `border-left`
- `border-width`
- `border-style`
- `border-color`
- `border-top-width`
- `border-top-style`
- `border-top-color` ...
- `border-radius`

#### Padding

The padding sits between the border and the content area and is used to push the content away from the border. Unlike margins, you cannot have a negative padding. Any background applied to your element will display behind the padding.

- `padding-top`
- `padding-right`
- `padding-bottom`
- `padding-left`

#### inline-block

All of the above fully applies to block boxes. Some of the properties can apply to inline boxes too.

`display: inline-block` provides a middle ground between `inline` and `block.` Use it if you do not want an item to break onto a new line, but do want it to respect width and height and avoid the overlapping.

- The `width` and `height` properties are respected.
- `padding`, `margin`, and `border` will cause other elements to be pushed away from the box.
- It does not break onto a new line, and will only become larger than its content if you explicitly add width and height properties.

## Background

- `background-color` defines the background color on any element in CSS. The property accepts any valid [`<color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). A background-color extends underneath the content and padding box of the element.
- `background-image`

## Overflow

Everything in CSS is a box. You can constrain the size of these boxes by assigning values of `width` and `height` (or `inline-size` and `block-size`). Overflow happens when there is too much content to fit in a box.

- `overflow`
- `overflow-x`
- `overflow-y`

values of overflow:
- `visible` (default): shows overflow
- `hidden`: hides overflow
- `scroll`: browsers with visible scrollbars will always display them
- `auto`: allows the browser to determine if it should display scrollbars

### Block Formatting Content

When you use a value of overflow such as `scroll` or `auto`, you create a Block Formatting Context. Content outside the container cannot poke into the container, and nothing can poke out of that container into the surrounding layout.

## Sizing items

- intrinsic size: size defined by its content
- extrinsic size

### Percentages

When you use margin and padding set in percentages, the value is calculated from the inline size of the containing block (width).

### min- and max- size

- percentages
- `min-width`
- `max-width`
- `1vw`: 1% viewport width
- `1vh`: 1% viewport height

## Form elements

reset:
```css
button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

textarea {
  overflow: auto;
}
```

[normalize.css](https://necolas.github.io/normalize.css/)

## Text

[web safe font](https://www.cssfontstack.com/)

Font stacks:
```css
p {
  font-family: "Trebuchet MS", Verdana, sans-serif;
}
```

### Text layout

The text-align property is used to control how text is aligned within its containing content box.
- `left`
- `right`
- `center`

## CSS Layout

### Flexbox

`display: flex`: acting like a block-level element in terms of how it interacts with the rest of the page, but its children are laid out as flex items.
`display: inline-flex`: acting like a inline element in terms of how it interacts with the rest of the page, but its children are laid out as flex items.

- main axis: the axis running in the direction the flex items are laid out in
- cross axis: the axis running perpendicular to the direction the flex items are laid out in
- flex container: the parent element that has `display: flex` set on it
- flex items: the items laid out as flexible boxes inside the flex container

Flexbox provides a property called `flex-direction` that specifies which direction the main axis runs (by default this is set to `row`).

One issue that arises when you have a fixed width or height in your layout is that eventually your flexbox children will overflow their container, breaking the layout. One way in which you can fix this is to add:
```css
section {
  flex-wrap: wrap;
  flex: 200px;
}
```
The `flex: 200px` declaration set on the articles means that each will be at least 200px wide.

`flex` is a shorthand property
- `flex-grow`: how much of the remaining space in the flex container should be assigned to the item
- `flex-shrink`: how much an item will shrink in order to prevent overflow
- `flex-basis`: the minimum size

#### `align-items`

controls where the flex items sit on the **cross axis**
- `stretch` (default): stretches all flex items to fill the parent in the direction of the cross axis
- `center`: causes the items to maintain their intrinsic dimensions, but be centered along the cross axis
- `flex-start`
- `flex-end`

You can override the align-items behavior for individual flex items by applying the `align-self` property to them.

#### `justify-content`

controls where the flex items sit on the **main axis**
- `flex-start` (default)
- `flex-end`
- `center`
- `space-around`
- `space-between`
