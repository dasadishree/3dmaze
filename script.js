// Define the maze as a 2D array
let maze = [
    // Define your maze layout here
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 2, 1]
  ];

  let blockSize = 50;
  let playerX = 1, playerY = 1;
  // Flag to check if the game is won
  let gameWon = false;

  

function setup() {
    createCanvas(750, 600, WEBGL);
    noStroke();
  
    txt = createDiv('');
    txt.position(width / 4, height / 4);
    txt.style('font-size', '40px');
    txt.style('font-weight', 'bold');
    txt.style('color', 'green');
    txt.style('width', '400px');
    txt.html("You found hope! Even though you are afraid of the darkness, you still can always find hope. There will always be a light that you can follow.");
    txt.hide(); // txt.show() will bring it back
}

function draw() {
    background(0);
    
    if(gameWon) {
        textSize(30);
        fill(255)
        textAlign(CENTER, CENTER);
        text("You Win!", width/2, height/2);
        txt.show();
        return;
    }

    let camX = (playerX - maze[0].length / 2) * blockSize;
    let camY = (playerY - maze.length / 2) * blockSize;
    let camZ = (height / 2) / tan(PI / 6);

    camera(camX, camY, camZ, camX, camY, 0, 0, 1, 0);

    ambientLight(20, 20, 20);

    let lightX = (playerX - maze[0].length / 2) * blockSize;
    let lightY = (playerY - maze.length / 2) * blockSize;
    pointLight(255, 255, 255, lightX, lightY, 100);
    
    emissiveMaterial(0, 50, 0);
    translate(0,0,50);

    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[0].length; x++) {
          push();
          translate((x - maze[0].length / 2) * blockSize, (y - maze.length / 2) * blockSize, 0);
          if (maze[y][x] === 1) {
            box(blockSize);
          } else if (maze[y][x] === 2) {
            fill(255, 0, 0);
            box(blockSize);
            fill(255);
          }
          pop();
        }
      }
      
      push();
      translate((playerX - maze[0].length / 2) * blockSize, (playerY - maze.length / 2) * blockSize, blockSize / 2);
      box(blockSize * 0.5);
      pop();
    }
    
function keyPressed() {
    let nextX = playerX;
    let nextY = playerY;

    // Check for keyboard inputs and adjust the next position of the player
    if (keyIsDown(LEFT_ARROW)) {
      nextX--; // Move player left by decreasing the X coordinate
    }
    if (keyIsDown(RIGHT_ARROW)) {
      nextX++; // Move player right by increasing the X coordinate
    }
    if (keyIsDown(UP_ARROW)) {
      nextY--; // Move player up by decreasing the Y coordinate
    }
    if (keyIsDown(DOWN_ARROW)) {
      nextY++; // Move player down by increasing the Y coordinate
    }

    // Check if the next position is within the maze and update player position
    if (maze[nextY][nextX] === 0) {
      // The position is an open path (0) - move player to this new position
      playerX = nextX;
      playerY = nextY;
    } else if (maze[nextY][nextX] === 2) {
      // The position is the goal (2) - mark the game as won
      playerX = nextX;
      playerY = nextY;
      gameWon = true; // Set gameWon to true to trigger winning condition
    }
  }
    
