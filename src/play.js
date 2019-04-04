const blessed = require('blessed')
const screen = blessed.screen({ smartCSR: true })
const { Interface } = require('./Interface')
const { Game } = require('./Game')
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
