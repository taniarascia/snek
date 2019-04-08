/**
 * @class Game
 *
 * The Game class tracks the state of three things:
 *
 * 1. The snake, including its direction, velocity, and location
 * 2. The dot
 * 3. The score
 *
 * The i/o of the game is handled by a separate UserInterface class, which is responsible for
 * detecting all event handlers (key press), creating the screen, and drawing elements to the
 * screen.
 */
class Game {
  constructor(ui) {
    // User interface class for all i/o operations
    this.ui = ui

    // The snake is an array of x/y coordinates
    this.snake = [
      { x: 5, y: 0 },
      { x: 4, y: 0 },
      { x: 3, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ]
    this.dot = {} // the first random dot will be generated before the game begins
    this.score = 0

    // Start the game in the top left, moving right
    this.currentDirection = 'right'
    this.vx = 0 // horizontal velocity
    this.vy = 0 // vertical velocity
    this.timer = null

    // Bind handlers to UI
    this.ui.bindHandlers(
      this.changeDirection.bind(this),
      this.quit.bind(this),
      this.start.bind(this)
    )
  }

  changeDirection(_, key) {
    if (key.name === 'up' || key.name === 'w') {
      this.currentDirection = 'up'
    } else if (key.name === 'down' || key.name === 's') {
      this.currentDirection = 'down'
    } else if (key.name === 'left' || key.name === 'a') {
      this.currentDirection = 'left'
    } else if (key.name === 'right' || key.name === 'd') {
      this.currentDirection = 'right'
    }
  }

  moveSnake() {
    const goingUp = this.vy === -1
    const goingDown = this.vy === 1
    const goingLeft = this.vx === -1
    const goingRight = this.vx === 1

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
      this.ui.updateScore(this.score)
      this.generateDot()
    } else {
      // Otherwise, slither
      this.snake.pop()
    }
  }

  drawSnake() {
    // Render each snake segment as a pixel
    this.snake.forEach(segment => {
      this.ui.draw(segment, 'green')
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

  drawDot() {
    // Render the dot as a pixel
    this.ui.draw(this.dot, 'red')
  }

  // Set to initial direction and clear the screen
  clear() {
    this.ui.clearScreen()
  }

  gameOver() {
    // If the snake collides with itself, end the game
    const collide = this.snake
      // Filter out the head
      .filter((_, i) => i > 0)
      // If head collides with any segment, collision
      .some(segment => segment.x === this.snake[0].x && segment.y === this.snake[0].y)

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

  showGameOverScreen() {
    this.ui.gameOverScreen()
    this.ui.render()
  }

  tick() {
    if (this.gameOver()) {
      clearInterval(this.timer)
      this.timer = null
      this.showGameOverScreen()

      return
    }

    this.clear()
    this.drawDot()
    this.moveSnake()
    this.drawSnake()

    this.ui.render()
  }

  reset() {}

  start() {
    if (!this.timer) {
      // Generate the first dot before the game begins
      this.generateDot()
      this.timer = setInterval(this.tick.bind(this), 50)
    }
  }

  quit() {
    process.exit(0)
  }
}

module.exports = { Game }
