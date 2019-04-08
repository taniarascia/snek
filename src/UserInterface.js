const { gameOverText } = require('./GameOverText')

/**
 * @class UserInterface
 *
 * Interact with the input (keyboard directions) and output (creating screen and drawing pixels
 * to the screen). Currently this class is one hard-coded interface, but could be made into an
 * abstract and extended for multiple interfaces - web, terminal, etc.
 */
class UserInterface {
  constructor(screen, blessed) {
    // Blessed is the terminal library API that provides a screen, elements, and event handling
    this.blessed = blessed
    this.screen = screen

    // Game title
    this.screen.title = 'Snake.js'

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
    this.gameContainer = this.blessed.box(this.initialGameBox)
    this.scoreContainer = this.blessed.box(this.scoreBox)

    // Snake and dot are represented by pixels
    this.snakePixels = []
    this.dotPixel = {}
  }

  bindHandlers(keyPressHandler, quitHandler) {
    // Event to handle keypress i/o
    this.screen.on('keypress', keyPressHandler)
    this.screen.key(['escape', 'q', 'C-c'], quitHandler)
  }

  // Draw each snake segment as a pixel
  drawSnakeSegment(segment, i) {
    this.snakePixels[i] = this.blessed.box({
      parent: this.gameContainer,
      top: segment.y,
      left: segment.x,
      width: 1,
      height: 1,
      style: {
        fg: 'green',
        bg: 'green',
      },
    })
  }

  // Draw each dot as a single pixel
  drawDot(dot) {
    this.dotPixel = this.blessed.box({
      parent: this.gameContainer,
      top: dot.y,
      left: dot.x,
      width: 1,
      height: 1,
      style: {
        fg: 'red',
        bg: 'red',
      },
    })
  }

  // Keep track of how many dots have been consumed and write to the score box
  drawScore(score) {
    this.scoreContainer.setLine(0, `{bold}Score:{/bold} ${score}`)
  }

  // BSOD on game over
  gameOverScreen() {
    this.gameContainer = this.blessed.box({
      parent: this.screen,
      top: 'center',
      left: 'center',
      width: '50%',
      height: '50%',
      tags: true,
      valign: 'middle',
      content: `{center}${gameOverText}{/center}`,
      style: { bg: 'black', fg: 'red' },
    })
  }

  // Set to initial screen
  clearScreen() {
    this.gameContainer = this.blessed.box(this.initialGameBox)
  }

  render() {
    this.screen.render()
  }
}

module.exports = { UserInterface }
