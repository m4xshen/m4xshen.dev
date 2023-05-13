---
author: "Max Shen"
title: "How React Render"
date: 2024-01-01
summary: "How React Render"
tags: ["template"]
categories: ["template"]
draft: true
---

1. Trigger a render
2. Render the component
3. Commit to the DOM

## Step 1: Trigger a render

There are two reasons for a component to render:
1. It’s the component’s initial render.
2. The component’s (or one of its ancestors’) state has been updated.

### Initial render

The initial render is triggered by calling `createRoot` with the target DOM node, and then calling its `render` method with your component:

```javascript
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

## Step 2: Render the component

"Rendering" is React calling your components:
1. On initial render, React will call the root component.
2. For subsequent renders, React will call the function component whose state update triggered the render.

This process is recursive: if the updated component returns some other component, React will render that component next...

## Step 3: Commit to the DOM

1. After the initial render, React will use the `appendChild()` DOM API to put all the DOM nodes it has created on screen.
2. After rerender, React will apply the minimal necessary operations (calculated while rendering!) to make the DOM match the latest rendering output.

After React update the DOM, the browser will repaint the screen (browser rendering).
