const blessed = require('blessed')
const screen = blessed.screen()
const { Interface } = require('./Interface')
const { Game } = require('./Game')

function changeDirectionIMPROVE(_, key) {
  switch (key.name) {
    case 'up':
      game.currentDirection = 'up'
      break
    case 'down':
      game.currentDirection = 'down'
      break
    case 'left':
      game.currentDirection = 'left'
      break
    case 'right':
      game.currentDirection = 'right'
      break
  }
}

const ui = new Interface(screen, blessed, changeDirectionIMPROVE)
const game = new Game(ui)

function tick() {
  if (game.gameOver()) {
    ui.gameOverScreen()
    ui.render()

    return
  }

  ui.clearScreen()

  game.drawDot()
  game.moveSnake()
  game.drawSnake()

  ui.render()
}

function main() {
  setInterval(tick, 50)
}

// Generate the coordinates of the first dot before the game begins
game.generateDot()

// Begin game
main()
