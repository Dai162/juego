// Función para actualizar la pantalla
function updateScreen () {
    basic.clearScreen()
    // Dibuja al jugador en la última fila
    led.plot(playerPosition, 4)
    for (let i = 0; i <= obstacles.length - 1; i++) {
        // Dibuja cada obstáculo
        led.plot(obstacles[i][0], obstacles[i][1])
    }
}
// Puntaje del jugador
// Función para generar un nuevo obstáculo
function generateObstacle () {
    obstaclePosition = Math.randomRange(0, 4)
    // Añade un obstáculo en la fila superior
    obstacles.push([obstaclePosition, 0])
}
let score = 0
let obstacle: number[] = []
let obstaclePosition = 0
let obstacles: number[][] = []
let playerPosition = 0
// Posición inicial del jugador
playerPosition = 2
// Arreglo de obstáculos (filas y columnas)
// Duración del juego en ciclos
let gameTime = 50
// Bucle principal del juego
// Mover obstáculos hacia abajo y verificar colisión
basic.forever(function () {
    let newObstacles: number[][] = []
    // Generar obstáculos aleatoriamente
    if (Math.randomRange(0, 2) == 0) {
        generateObstacle()
    }
    // Mover el jugador
    if (input.buttonIsPressed(Button.A)) {
        // Mueve a la izquierda
        playerPosition = Math.max(0, playerPosition - 1)
    } else if (input.buttonIsPressed(Button.B)) {
        // Mueve a la derecha
        playerPosition = Math.min(4, playerPosition + 1)
    }
    for (let j = 0; j <= obstacles.length - 1; j++) {
        obstacle = obstacles[j]
        if (obstacle[1] < 4) {
            // Mueve el obstáculo hacia abajo
            newObstacles.push([obstacle[0], obstacle[1] + 1])
        } else if (obstacle[0] == playerPosition) {
            basic.clearScreen()
            basic.showString("Game Over! Score: " + score)
            // Reinicia el juego
            control.reset()
        }
    }
    // Actualiza los obstáculos
    obstacles = newObstacles
    // Actualizar pantalla y puntaje
    updateScreen()
    score += 1
    gameTime += 0 - 1
    // Control de velocidad del juego
    basic.pause(300)
    // Termina el juego cuando se acaba el tiempo
    if (gameTime <= 0) {
        basic.clearScreen()
        basic.showString("You Win! Score: " + score)
        control.reset()
    }
})
