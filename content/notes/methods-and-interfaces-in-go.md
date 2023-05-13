---
author: "Max Shen"
title: "Template"
date: 2024-01-01
summary: "Methods and Interfaces In Go"
tags: ["Go"]
categories: ["template"]
draft: true
---

## Methods

A method is:
- a function with a special receiver argument
- declared on a type (eg: struct, pointer)

Here's a `Vertex` type:
```go
type Vertex struct {
  X, Y float64
}
```

Example method:
```go
func (v *Vertex) Scale(f float64) {
  v.X = v.X * f
  v.Y = v.Y * f
}

func main() {
  v := Vertex{3, 4}
  v.Scale(10)
}
```
In this example, the receiver is `v`.

Methods with pointer receivers can modify the value to which the receiver points.

Go interprets the statement `v.Scale(10)` as `(&v).Scale(10)` for convenience.

```go
func (v Vertex) Abs() float64 {
  return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
  p := &v
  fmt.Println(p.Abs())
}
```

In this case, the method call `p.Abs()` is interpreted as `(*p).Abs()`.

## Interfaces

An interface type is defined as a set of method signatures.

A value of interface type can hold any value that implements those methods.

A type implements an interface by implementing its methods. There is no explicit declaration of intent:

```go
type I interface {
  M()
}

type T struct {
  S string
}

// This method means type T implements the interface I,
func (t T) M() {
  fmt.Println(t.S)
}
```

If the concrete value inside the interface itself is nil, the method will be called with a nil receiver.

However, a nil interface value holds neither value nor concrete type. Calling a method on a nil interface is a run-time error
