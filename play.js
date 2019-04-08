const blessed = require('blessed')
const { UserInterface } = require('./src/UserInterface')
const { Game } = require('./src/Game')
const ui = new UserInterface(blessed, blessed.screen())
const game = new Game(ui)

// Begin game
game.start()
