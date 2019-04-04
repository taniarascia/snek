/**
 * @class Game
 *
 *  Track the state of the snake, dot, and score
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
    this.vx = 0 // horizontal velocity
    this.vy = 0 // vertical velocity
    this.dot = {} // the first random dot will be generated before the game begins
  }

  moveSnake() {
    let goingUp = this.vy === -1
    let goingDown = this.vy === 1
    let goingLeft = this.vx === -1
    let goingRight = this.vx === 1

    if (this.ui.changingDirection) {
      return
    }

    this.ui.changingDirection = true

    if (this.ui.currentDirection === 'up' && !goingDown) {
      this.vy = -1
      this.vx = 0
    }

    if (this.ui.currentDirection === 'down' && !goingUp) {
      this.vy = 1
      this.vx = 0
    }

    if (this.ui.currentDirection === 'right' && !goingLeft) {
      this.vx = 1
      this.vy = 0
    }

    if (this.ui.currentDirection === 'left' && !goingRight) {
      this.vx = -1
      this.vy = 0
    }

    // Move the head forward by one pixel based on velocity
    const head = { x: this.snake[0].x + this.vx, y: this.snake[0].y + this.vy }
    this.snake.unshift(head)

    // If the snake lands on a dot, increase the score and generate a new dot
    if (this.snake[0].x === this.dot.x && this.snake[0].y === this.dot.y) {
      this.score++
      this.ui.setScore(this.score)
      this.generateDot()
    } else {
      // Otherwise, slither
      this.snake.pop()
    }
  }

  renderSnake() {
    // Render each snake segment as a pixel
    this.snake.forEach((segment, i) => {
      this.ui.drawSnake(segment, i)
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

  gameOver() {
    let collide = false

    // If the snake collides with itself, end the game
    this.snake.forEach((segment, i) => {
      collide = segment.x === this.snake[0].x && segment.y === this.snake[0].y
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
}

module.exports = { Game }
