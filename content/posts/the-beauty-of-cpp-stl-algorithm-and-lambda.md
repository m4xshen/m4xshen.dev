---
author: "Max Shen"
title: "The beauty of C++ STL algorithm and lambda"
date: 2023-03-22
summary: "In this tutorial I refactor some C++ functions several times with STL algorithm and lambda to make them more concise and readable."
tags: ["cpp"]
---

In this tutorial you'll learn how to refine your code with STL algorithm and lambda.

### Example Problem

In this problem there is a class that stores grades about students in an English class. You need to implement 2 functions:
- `countFail()`: returns how many students' score is below 60
- `getAverage()`: returns the average score of the class

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

Let's first think about how to implement `countFail`.

The most simple way to do this:
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

The code above is intuitive, but there is a better approach: using the range-based for loop provided in C++11.

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

In fact, the `count_if` function in `<algorithm>` returns the number of elements in the range satisfying specific condition. Don't reinvent the wheel.

```cpp
bool isFail(const Student &s) {
  return s.score < 60;
}

int EnglishClass::countFail() const {
  return std::count_if(vs.begin(), vs.end(), isFail);
}
```

The third parameter is the condition for what kind of element you want to count. This can be achieved by passing a function to it.

Since the `isFail` function is only used once in `countFail`, you can rewrite it with lambda.

```cpp
int EnglishClass::countFail() const {
  return std::count_if(vs.begin(), vs.end(),
    [](const Student &s) { return s.score < 60; });
}
```

You can notice that when combining STL algorithm with lambda, the code becomes much more concise and readable.

### getAverage()

You can use the same concept to implement `getAverage` function:

```cpp
double EnglishClass::getAverage() const {
  return std::accumulate(vs.begin(), vs.end(), 0.0,
    [](const double t, const Student &s) { return t+s.score; }) / vs.size();
}
```

In this case, you can use the `accumulate` function in `<numeric>`. But don't just sum up the students, you have to sum up the student's score with total score.

### STL Algorithm

There are many STL algorithm that you can use to make your code shorter. You can also pass a lambda to it whenever the default behavior doesn't match your needs.

Check out the [full list](https://cplusplus.com/reference/algorithm/) of the functions to learn more.
