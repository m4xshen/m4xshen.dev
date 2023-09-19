---
author: "Max Shen"
title: "The beauty of C++ STL algorithm and lambda"
date: 2023-03-22
summary: "Discover the power of C++ STL algorithms and lambda expressions. Improve your code's readability and conciseness while solving problems. Explore practical examples and harness the beauty of modern C++."
tags: ["cpp"]
---

In this tutorial, you will learn how to improve your code using STL algorithms and lambdas.

### Example Problem

In this problem, you have a class that stores grades for students in an English class, and you need to implement two functions:

- `countFail()`: returns the number of students whose score is below 60.
- `getAverage()`: returns the average score of the class.

```cpp
#include <string>
#include <vector>

struct Student {
  std::string name;
  int score;
};

class EnglishClass {
private:
  std::vector<Student> vs;
public:
  int countFail() const;
  double getAverage() const;
};
```

### countFail()

Let's first consider how to implement countFail().

The simplest way to do this is:
```cpp
int EnglishClass::countFail() const {
  int count = 0;
  for(auto it = vs.begin(); it != vs.end(); it++) {
    if(it->score < 60) {
      count++;
    }
  }

  return count;
}
```

### Refactor Code

Although the above code is intuitive, there is a better approach: using the range-based for loop provided in C++11

```cpp
int EnglishClass::countFail() const {
  int count = 0;
  for(Student s : vs) {
    if(s.score < 60) {
      count++;
    }
  }

  return count;
}
```

The `count_if` function in <algorithm> returns the number of elements in the range satisfying a specific condition. There is no need to reinvent the wheel.

```cpp
bool isFail(const Student &s) {
  return s.score < 60;
}

int EnglishClass::countFail() const {
  return std::count_if(vs.begin(), vs.end(), isFail);
}
```

The third parameter of count_if is the condition for the type of element to count. This can be achieved by passing a function to it.

Since the isFail function is only used once in `countFail()`, you can rewrite it with a lambda expression.

```cpp
int EnglishClass::countFail() const {
  return std::count_if(vs.begin(), vs.end(),
    [](const Student &s) { return s.score < 60; });
}
```

You can notice that by combining STL algorithms with lambdas, the code becomes much more concise and readable.

### getAverage()

You can use the same concept to implement the `getAverage()` function:

```cpp
double EnglishClass::getAverage() const {
  return std::accumulate(vs.begin(), vs.end(), 0.0,
    [](const double t, const Student &s) { return t+s.score; }) / vs.size();
}
```

In this case, you can use the `accumulate` function in `<numeric>`. However, don't just sum up the students; you have to sum up the student's score with the total score.

### STL Algorithm

There are many STL algorithms that you can use to make your code shorter. You can also pass a lambda to it whenever the default behavior doesn't match your needs.

Check out the [full list](https://cplusplus.com/reference/algorithm/) of the functions to learn more.
