/**
 * @class UserInterface
 *
 * Interact with the input (keyboard directions) and output (creating screen and
 * drawing pixels to the screen). Currently this class is one hard-coded
 * interface, but could be made into an abstract and extended for multiple
 * interfaces - web, terminal, etc.
 */
class UserInterface {
  constructor(blessed, screen) {
    // Blessed is the terminal library API that provides a screen, elements, and
    // event handling
    this.blessed = blessed
    this.screen = screen

    // Game title
    this.screen.title = 'Snek.js'

    // Create the game container
    this.initialGameBox = {
      parent: this.screen,
      top: 1,
      left: 0,
      width: '100%',
      height: '100%-1',
      style: {
        fg: 'black',
        bg: 'black',
      },
    }

    // Create the score container
    this.scoreBox = {
      parent: this.screen,
      top: 0,
      left: 'left',
      width: '100%',
      height: 1,
      tags: true,
      style: {
        fg: 'black',
        bg: 'blue',
      },
      content: '{bold}Score{/bold}: 0',
    }

    this.gameOverBox = {
      parent: this.screen,
      top: 'center',
      left: 'center',
      width: 20,
      height: 5,
      tags: true,
      valign: 'middle',
      content: `{center}Game Over!{/center}`,
      border: {
        type: 'line',
      },
      style: {
        fg: 'black',
        bg: 'magenta',
        border: {
          fg: '#ffffff',
        },
      },
    }

    this.gameContainer = this.blessed.box(this.initialGameBox)
    this.scoreContainer = this.blessed.box(this.scoreBox)
    this.gameOverContainer = null
  }

  bindHandlers(keyPressHandler, quitHandler, enterHandler) {
    // Event to handle keypress i/o
    this.screen.on('keypress', keyPressHandler)
    this.screen.key(['escape', 'q', 'C-c'], quitHandler)
    this.screen.key(['enter'], enterHandler)
  }

  // Draw a pixel
  draw(coords, color) {
    this.blessed.box({
      parent: this.gameContainer,
      top: coords.y,
      left: coords.x,
      width: 1,
      height: 1,
      style: {
        fg: color,
        bg: color,
      },
    })
  }

  // Keep track of how many dots have been consumed and write to the score box
  updateScore(score) {
    this.scoreContainer.style.bg = 'blue'
    this.scoreContainer.setLine(0, `{bold}Score:{/bold} ${score}`)
  }

  // BSOD on game over
  gameOverScreen() {
    this.gameContainer = this.blessed.box(this.gameOverBox)
  }

  // Set to initial screen
  clearScreen() {
    this.gameContainer.detach()
    if (this.gameOverContainer) this.gameOverContainer.detach()
    this.gameContainer = this.blessed.box(this.initialGameBox)
  }

  render() {
    this.screen.render()
  }
}

module.exports = { UserInterface }
