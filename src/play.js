const blessed = require('blessed')
const screen = blessed.screen({ smartCSR: true })
const { UserInterface } = require('./UserInterface')
const { Game } = require('./Game')
const ui = new UserInterface(screen, blessed)
const game = new Game(ui)

function tick() {
  if (game.gameOver()) {
    // Show game over screen on collision and end game
    game.currentDirection = null
    ui.gameOverScreen()
    ui.render()

    return
  }

  ui.clearScreen()
  game.clearDirection()
  game.renderDot()
  game.moveSnake()
  game.renderSnake()

  ui.render()
  setTimeout(tick, 50)
}

// Iterate every 50ms
function main() {
  setTimeout(tick, 50)
}

// Generate the coordinates of the first dot before the game begins
game.generateDot()

// Begin game
main()
