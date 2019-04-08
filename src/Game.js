/**
 * @class Game
 *
 * Track the state of the snake, dot, and score
 */
class Game {
  constructor(ui) {
    // The snake is an array of x/y coordinates
    this.snake = [
      { x: 5, y: 0 },
      { x: 4, y: 0 },
      { x: 3, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ]
    this.score = 0
    this.ui = ui // i/o

    this.dot = {} // the first random dot will be generated before the game begins

    // Start the game in the top left, moving right
    this.initialDirection = 'right'
    this.currentDirection = this.initialDirection
    this.changingDirection = false
    this.vx = 0 // horizontal velocity
    this.vy = 0 // vertical velocity

    // Bind handlers to UI
    this.ui.bindHandlers(this.changeDirection.bind(this), this.quit.bind(this))
  }

  changeDirection(_, key) {
    if (key.name === 'up' || key.name === 'w') {
      this.currentDirection = 'up'
    }
    if (key.name === 'down' || key.name === 's') {
      this.currentDirection = 'down'
    }
    if (key.name === 'left' || key.name === 'a') {
      this.currentDirection = 'left'
    }
    if (key.name === 'right' || key.name === 'd') {
      this.currentDirection = 'right'
    }
  }

  moveSnake() {
    const goingUp = this.vy === -1
    const goingDown = this.vy === 1
    const goingLeft = this.vx === -1
    const goingRight = this.vx === 1

    if (this.changingDirection) {
      return
    }

    this.changingDirection = true

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

    // Move the head forward by one pixel based on velocity
    const head = { x: this.snake[0].x + this.vx, y: this.snake[0].y + this.vy }
    this.snake.unshift(head)

    // If the snake lands on a dot, increase the score and generate a new dot
    if (this.snake[0].x === this.dot.x && this.snake[0].y === this.dot.y) {
      this.score++
      this.ui.drawScore(this.score)
      this.generateDot()
    } else {
      // Otherwise, slither
      this.snake.pop()
    }
  }

  renderSnake() {
    // Render each snake segment as a pixel
    this.snake.forEach((segment, i) => {
      this.ui.drawSnakeSegment(segment, i)
    })
  }

  generateRandomPixelCoords(min, max) {
    // Get a random coordinate from 0 to max container height/width
    return Math.round(Math.random() * (max - min) + min)
  }

  generateDot() {
    // Generate a dot at a random x/y coordinate
    this.dot.x = this.generateRandomPixelCoords(0, this.ui.gameContainer.width - 1)
    this.dot.y = this.generateRandomPixelCoords(0, this.ui.gameContainer.height - 1)

    // If the pixel is on a snake, regenerate the dot
    this.snake.forEach(segment => {
      if (segment.x === this.x && segment.y === this.y) {
        this.generateDot()
      }
    })
  }

  renderDot() {
    // Render the dot as a pixel
    this.ui.drawDot(this.dot)
  }

  // Set to initial direction
  clearDirection() {
    this.changingDirection = false
  }

  gameOver() {
    // If the snake collides with itself, end the game
    const collide = this.snake
      .filter((segment, i) => i > 0)
      .some((segment, i) => {
        segment.x === this.snake[0].x && segment.y === this.snake[0].y
      })

    return (
      collide ||
      // right wall
      this.snake[0].x === this.ui.gameContainer.width - 1 ||
      // left wall
      this.snake[0].x === -1 ||
      // top wall
      this.snake[0].y === this.ui.gameContainer.height - 1 ||
      // bottom wall
      this.snake[0].y === -1
    )
  }

  quit() {
    process.exit(0)
  }
}

module.exports = { Game }
