class Game {
  constructor(ui) {
    this.initialState = {
      body: [
        { x: 5, y: 0 },
        { x: 4, y: 0 },
        { x: 3, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
      ],
      currentDirection: 'right',
    }

    const { currentDirection, body } = this.initialState

    this.ui = ui
    this.body = body
    this.currentDirection = currentDirection
    this.vx = 0 // horizontal velocity
    this.vy = 0 // vertical velocity
    this.x = -1 // dot x
    this.y = -1 // dot y
  }

  moveSnake() {
    let goingUp = this.vy === -1
    let goingDown = this.vy === 1
    let goingLeft = this.vx === -1
    let goingRight = this.vx === 1

    if (this.currentDirection === 'up' && !goingDown) {
      this.vy = -1
      this.vx = 0
    }

    if (this.currentDirection === 'down' && !goingUp) {
      this.vy = 1
      this.vx = 0
    }

    if (this.currentDirection === 'right' && !goingLeft) {
      this.vx = 1
      this.vy = 0
    }

    if (this.currentDirection === 'left' && !goingRight) {
      this.vx = -1
      this.vy = 0
    }

    const head = { x: this.body[0].x + this.vx, y: this.body[0].y + this.vy }
    this.body.unshift(head)

    if (this.body[0].x === this.x && this.body[0].y === this.y) {
      this.generateDot()
    } else {
      this.body.pop()
    }
  }

  drawSnake() {
    this.body.forEach((segment, i) => {
      this.ui.drawSnake(segment, i)
    })
  }

  generateRandomPixelCoords(min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }

  generateDot() {
    this.x = this.generateRandomPixelCoords(0, this.ui.container.width - 1)
    this.y = this.generateRandomPixelCoords(0, this.ui.container.height - 1)

    this.body.forEach(segment => {
      if (segment.x === this.x && segment.y === this.y) {
        this.generateDot()
      }
    })
  }

  drawDot() {
    const dot = { x: this.x, y: this.y }

    this.ui.drawDot(dot)
  }

  gameOver() {
    let collide = false
    // write collide logic

    return (
      collide ||
      this.body[0].x === this.ui.container.width - 1 || // right wall
      this.body[0].x === -1 || // left wall
      this.body[0].y === this.ui.container.height - 1 || // top wall
      this.body[0].y === -1 // bottom wall
    )
  }
}

module.exports = { Game }
