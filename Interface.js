class Interface {
  constructor(screen, blessed, changeDirectionIMPROVE) {
    this.blessed = blessed
    this.screen = screen
    this.initialContainer = {
      parent: this.screen,
      top: 'top',
      left: 'left',
      width: 50,
      height: 20,
      style: {
        fg: 'black',
        bg: 'black',
      },
    }

    this.pixels = []
    this.dot = {}
    this.container = this.blessed.box(this.initialContainer)

    this.screen.title = 'no step on snek'
    this.screen.on('keypress', changeDirectionIMPROVE)
    this.screen.key(['escape', 'q', 'C-c'], () => {
      process.exit(0)
    })
  }

  drawSnake(segment, i) {
    this.pixels[i] = this.blessed.box({
      parent: this.container,
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

  drawDot(dot) {
    this.dot = this.blessed.box({
      parent: this.container,
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

  clearScreen() {
    this.container = this.blessed.box(this.initialContainer)
  }

  gameOverScreen() {
    this.container = this.blessed.box({
      ...this.initialContainer,
      tags: true,
      top: 'center',
      content: '\n\n\n\n\n\n\n\n\n{center}Game Over!{/}', // I don't care
      style: { bg: 'blue' },
    })
  }

  render() {
    this.screen.render()
  }
}

module.exports = { Interface }
