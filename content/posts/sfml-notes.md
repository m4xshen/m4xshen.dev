---
title: "Vim Command Workflow"
date: 2023-02-02
summary: ""
author: "Max Shen"
tags: ["sfml", "gamedev"]
draft: true
---

# Making a Game Tick

good code:
- Modularity: In this the functionalities are separated, and dependencies between them are reduced to a minimum.
- Abstraction: In this, the functionality is encapsulated into classes and functions.

## The Game Class

Instead of doing out logic in the `main()` function, we move everything into the `Game` class instead, which gives us a better overview of our code, as we can extract separate functionality into their own functions, and use them wtihin the Game class.

```cpp
class Game {
public:
  Game();
  void run();

private:
  void processEvents();
  void update();
  void render();

  sf::RenderWindow mWindow;
  sf::CircleShape mPlayer;
};

int main() {
  Game game;
  game.run();
}
```

3 main parts: processEvent, update, render. If we want to get something actually done, we implement them in one of the three private functions.

```cpp
void Game::run() {
  while(window.isOpen()) {
    processEvents();
    update();
    render();
  }
}
```

The `processEvents()` handles user input.

```cpp
void Game::processEvents() {
  sf::Event event;
  while(window.pollEvent(event)) {
    if(event.type == sf::Event::Closed) {
      window.close();
    }
  }
}
```

The `update()` updates the game logic.

The `render()` renders our game to the screen. It consist of three parts: clear, draw and display.

```cpp
void Game::render() {
  window.clear();
  window.draw(player);
  window.display();
}
```

## Game loop and frames

The loop in the `run()` function is called game loop. An iteration of game loop is called a frame or a tick.

## Input over several frames

What are events? The word itself implies something that is happening with our window, emitting a notice of the happening. As soon as the user somehow interacts with our window, the operating system sends an event that we can process. For our convenience, SFML translates events from the underlying operating systems to a uniform structure that we can use with ease: sf::Event. Once the window internally detects that some kind of input has happened, it will store an sf::Event object containing information about that input. We will then poll all those events as fast as we can, in order to respond to them.

## Vector algebra

Because in graphics all coordinates are expressed with the decimal float data type, sf::Vector2 is instantiated as sf::Vector2<float>, which conveniently has a typedef named sf::Vector2f. Such an object is made to contain two member variables, x and y. This makes our life simpler, because now we don't need to pass two variables to functions, as we can fit both in a single sf::Vector2f object. sf::Vector2f also defines common vector operations, such as additions and subtractions with other vectors, or multiplications and divisions with scalars (single values), effectively
A vector is great to store a two-component coordinate, be it an absolute or relative position, or even to express a direction to follow, or to shoot a bullet towards. There i

## Frame-independent movement

If you run everything we have done so far, you will be able to move the circle, but it won't move uniformly. It will probably be very fast, because currently we have done the movement in a very naive way. Right now your computer will be running the update() function as fast as it can, which means it will probably call it a couple of hundreds of times each second, if not more. If we move the shape by one pixel for every frame, this can count up to several 100 pixels every second, making our little player fly all over the screen. You cannot just change the movement value to something lower, as it will only fix the problem for your computer. If you move to a slower or faster computer, the speed will change again. So how do we solve this? Well, let's look at the problem we are facing. We are having a problem because our movement is frame-dependent. We want to provide the speed in a way that changes depending on the time a frame takes. There is a simple formula you should remember from your old school days. It's the formula that goes: distance = speed * time. Now why is this relevant for us? Because with this formula we can calculate a relevant speed for every frame, so that the circle always travels exactly the distance we want it to travel over one second, no matter what computer we are sitting on. So let's modify the function to what we actually need to make this work.

## Fixed time steps

The solution we have come up with so far is sufficient for many cases. But it is not 
a perfect solution, because you can have problems in certain scenarios where delta 
times vary strongly. The code can be quite hard to debug, because it is impossible 
to get 100 percent reproducible results, since every frame is unique, and you can't 
guarantee that the delta time remains the same.
Consider that a frame may sometimes take three times the average delta time. This 
can lead to severe mistakes in the game logic, for example, when a player moves 
three times the distance and passes through a wall he would normally collide with. 
