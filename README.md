# 🐍 no step on snek [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![snekjs on NPM](https://img.shields.io/npm/v/snekjs.svg?color=green&label=snekjs)](https://www.npmjs.com/package/snekjs)

Snake written in JavaScript for the terminal (Node.js).

## Instructions

### Clone from repository

```bash
git clone https://github.com/taniarascia/snek
cd snek
yarn && yarn play
```

### npm module

Install the snek package:

```bash
yarn add snekjs
```

Create `play.js`

```js
// play.js

const blessed = require('blessed')
const screen = blessed.screen({ smartCSR: true })
const { Interface, Game } = require('snekjs')
const ui = new Interface(screen, blessed)
const game = new Game(ui)

function tick() {
  if (game.gameOver()) {
    // Show game over screen on collision and end game
    ui.gameOverScreen()
    ui.render()

    return
  }

  ui.clearScreen()
  ui.clearDirection()

  game.renderDot()
  game.moveSnake()
  game.renderSnake()

  ui.render()
}

// Iterate every 50ms
function main() {
  setInterval(tick, 50)
}

// Generate the coordinates of the first dot before the game begins
game.generateDot()

// Begin game
main()
```

Run the game.

```bash
node play.js
```

## Author

- [Tania Rascia](https://www.taniarascia.com)

## License

This project is open source and available under the [MIT License](LICENSE).
