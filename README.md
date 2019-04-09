# 🐍 Snek.js [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![snekjs on NPM](https://img.shields.io/npm/v/snekjs.svg?color=green&label=snekjs)](https://www.npmjs.com/package/snekjs)

A terminal-based Snake implementation written in JavaScript (Node.js).

![snek.gif](https://raw.githubusercontent.com/taniarascia/snek/master/snek.gif)

## Instructions

Use the arrow keys (`↑`, `↓`, `←`, `→`) or `W` `A` `S` `D` to navigate the snake up, down, left, or right. Eat the red dot to gain points. If the snake collides with the wall or its own tail, it's game over. Press `ENTER` to restart, and `Q`, `ESCAPE` or `CTRL` + `C` to quit the game.

## Installation

### Clone from repository

```bash
git clone https://github.com/taniarascia/snek
cd snek
yarn && yarn play
```

### npm module

Add the `snekjs` module.

```bash
yarn add snekjs
```

Create the game.

```js
// index.js

const blessed = require('blessed')
const { UserInterface, Game } = require('snekjs')
const ui = new UserInterface(blessed, blessed.screen())
const game = new Game(ui)

// Begin game
game.start()
```

Run the game.

```bash
node index.js
```

## Acknowledgements

- [Vanya Sergeev](https://sergeev.io) for pointing out my snake collision bug, for advising me to make a single, reusable draw method, for showing me how to properly bind methods between classes, and for overall guidance and inspiration
- [Devin McIntyre](https://www.dev-eloper.com/) for general advice
- Panayiotis Nicolaou's [JavaScript Snake for Web](https://medium.freecodecamp.org/think-like-a-programmer-how-to-build-snake-using-only-javascript-html-and-css-7b1479c3339e) for initial logic

## Author

- [Tania Rascia](https://www.taniarascia.com)

## License

This project is open source and available under the [MIT License](LICENSE).
