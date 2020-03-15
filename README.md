# 🐍 Snek.js 

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![snekjs on NPM](https://img.shields.io/npm/v/snekjs.svg?color=green&label=snekjs)](https://www.npmjs.com/package/snekjs)

[![Run on Repl.it](https://repl.it/badge/github/taniarascia/snek)](https://repl.it/github/taniarascia/snek)

A terminal-based Snake implementation written in JavaScript (Node.js).

### [Read the tutorial](https://www.taniarascia.com/snake-game-in-javascript/)

![snek.gif](https://raw.githubusercontent.com/taniarascia/snek/master/snek.gif)

## Instructions

Use the arrow keys (`↑`, `↓`, `←`, `→`) or `W` `A` `S` `D` to navigate the snake up, down, left, or right. Eat the red dot to gain points. If the snake collides with the wall or its own tail, it's game over. Press `ENTER` to restart, and `Q`, `ESCAPE` or `CTRL` + `C` to quit the game.

## Installation

### Run without installing

The easiest way to play the game is to just run it in the terminal without installing anything!

```bash
npx taniarascia/snek
```

### Clone from repository

```bash
git clone https://github.com/taniarascia/snek
cd snek

# install and run via npm or yarn
npm i && npm run play
```

### npm module

Add the `snekjs` module.

```bash
npm i snekjs
```

Create the game.

```js
// index.js
const { UserInterface, Game } = require('snekjs')
const game = new Game(new UserInterface())

// Begin game
game.start()
```

Run the game.

```bash
node index.js
```

## Acknowledgements

- [Vanya Sergeev](https://sergeev.io) for pointing out my snake collision bug, for advising me to make a single, reusable draw method, for showing me how to properly bind methods between classes, and for overall guidance and inspiration.
- [Devin McIntyre](https://www.dev-eloper.com/) for general advice.
- Panayiotis Nicolaou's [JavaScript Snake for Web](https://medium.freecodecamp.org/think-like-a-programmer-how-to-build-snake-using-only-javascript-html-and-css-7b1479c3339e) for initial logic.

## Author

- [Tania Rascia](https://www.taniarascia.com)

## License

This project is open source and available under the [MIT License](LICENSE).
