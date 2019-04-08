const blessed = require('blessed')
const screen = blessed.screen({ smartCSR: true })
const { UserInterface } = require('./UserInterface')
const { Game } = require('./Game')
const ui = new UserInterface(screen, blessed)
const game = new Game(ui)

game.generateDot() // Generate the coordinates of the first dot before the game begins
game.start() // Begin game
