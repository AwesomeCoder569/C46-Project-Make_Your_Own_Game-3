var apple, appleImg;
var snake;
var edges;
var monster, monsterImg;
var score = 0;
var level = 1;
var gameState = 1; 
var r;

function preload() { 
  appleImg = loadImage("apple.png"); 
  monsterImg = loadImage("monster.png"); 
}

function setup() { 
  createCanvas(600,600); 
  edges = createEdgeSprites(); 
  apple = createSprite(300, 300, 10, 10); 
  apple.addImage(appleImg); apple.scale = 0.15; 
  snake = createSprite(200, 200, 50, 50); snake.shapeColor = "green"; 
  monster = createSprite(200, 200, 30, 30); 
  monster.addImage(monsterImg); 
  monster.scale = 0.3; monster.velocityX = 3; 
  monster.velocityY = 3; 
  monster.visible = false; 
}

function draw() { 
  background(51); 
  textSize(20); 
  text("Score: "+score, 500, 50); 
  text("Level: "+level, 500, 80); 

  if(gameState===1) { 
    snake.visible = true; 
    apple.visible = true; 
  }

  if(keyDown(UP_ARROW)) { 
    snake.y -= 3; 
  } 
  
  if(keyDown(DOWN_ARROW)) { 
    snake.y += 3;
  }

  if(keyDown(LEFT_ARROW)) { 
    snake.x -= 3;
  } 
  
  if(keyDown(RIGHT_ARROW)) { 
    snake.x += 3;
  }

  spawnApple(); 
    
  if(score===30) { 
    gameState = 3;
  }

  if(snake.height > height) { 
    gameState = 2;
  } 
  
  if(gameState===2) { 
    text("Game Over!", 250, 300); 
    text("Press R to Restart", 220, 330); 
    snake.visible = false; 
    apple.visible = false; 
    monster.visible = false; 
  }
  
  if(gameState===3) { 
    replay(); 
  } 

  if(keyDown("R")) { 
    gameState = 1; 
    score = 0; 
    level = 1; 
    snake.height = 50; 
  } 

  drawSprites();
} 
 
function spawnApple() { 
  r = Math.round(random(50, 400));

  if(snake.isTouching(apple)) { 
    apple.x = r; 
    apple.y = r; 
    score+=10; 
    snake.height+=score; 
  }

  if(apple.x > width || apple.x < 0){ 
    apple.x = r; 
    apple.y = r; 
  }
} 

function replay(){ 
  level = 2; 
  score = 0; 
  //snake.height = 50; 
  apple.velocityX = 3; 
  snake.visible = true; 
  apple.visible = true;
}