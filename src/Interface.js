/**
 * @class Interface
 *
 * Interact with the input (keyboard directions) and output (creating screen and drawing pixels
 * to the screen). Currently this class is one hard-coded interface, but could be made into an
 * abstract and extended for multiple interfaces - web, terminal, etc.
 */
class Interface {
  constructor(screen, blessed) {
    // Blessed is the terminal library API that provides a screen, elements, and event handling
    this.blessed = blessed
    this.screen = screen

    // Game title
    this.screen.title = 'no step on snek'

    // Event to handle keypress i/o
    this.screen.on('keypress', (_, key) => {
      if (key.name === 'up' || key.name === 'down' || key.name === 'left' || key.name === 'right') {
        this.currentDirection = key.name
      }
    })

    // Exit the game
    this.screen.key(['escape', 'q', 'C-c'], () => {
      process.exit(0)
    })

    // Create the game container
    this.initialGameBox = {
      parent: this.screen,
      top: 0,
      left: 0,
      width: 50,
      height: 20,
      style: {
        fg: 'black',
        bg: 'black',
      },
    }

    // Create the score container
    this.scoreBox = {
      parent: this.screen,
      top: 1,
      left: 52,
      width: 20,
      height: 5,
      tags: true,
      style: {
        fg: 'white',
        bg: 'magenta',
        border: {
          fg: 'white',
        },
      },
      border: {
        type: 'line',
      },
      content: '{center}{bold}Score{/bold}:{/center}',
    }
    this.gameContainer = this.blessed.box(this.initialGameBox)
    this.scoreContainer = this.blessed.box(this.scoreBox)

    // Snake and dot are represented by pixels
    this.snakePixels = []
    this.dotPixel = {}

    // Start the game in the top left, moving right
    this.initialDirection = 'right'
    this.currentDirection = this.initialDirection
    this.changingDirection = false
  }

  // Draw each snake segment as a pixel
  drawSnake(segment, i) {
    this.snakePixels[i] = this.blessed.box({
      parent: this.gameContainer,
      top: segment.y,
      left: segment.x,
      width: 1,
      height: 1,
      style: {
        fg: 'blue',
        bg: 'blue',
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
        fg: 'green',
        bg: 'green',
      },
    })
  }

  // Keep track of how many dots have been consumed and write to the score box
  setScore(score) {
    this.scoreContainer.setLine(1, `{center}${score}{/center}`)
  }

  // BSOD on game over
  gameOverScreen() {
    this.gameContainer = this.blessed.box({
      ...this.initialGameBox,
      tags: true,
      content: '\n\n\n\n\n\n\n\n\n{center}Game Over!{/}',
      style: { bg: 'blue' },
    })
  }

  // Set to initial screen
  clearScreen() {
    this.gameContainer = this.blessed.box(this.initialGameBox)
  }

  // Set to initial direction
  clearDirection() {
    this.changingDirection = false
  }

  render() {
    this.screen.render()
  }
}

module.exports = { Interface }
