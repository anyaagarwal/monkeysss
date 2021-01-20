var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running, ground, I_ground,restart;
var banana, bananaImage, obstacle, obstacleImage, gameOverImage, monkey_end,restartImage;
var bananaGroup, obstaclesGroup;
var score, survivalTime;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImage = loadImage("gameOver.PNG");
  monkey_end = loadAnimation("sprite_0.png", "sprite_1.png");
  restartImage = loadImage("restart.png");

}



function setup() {
  createCanvas(400, 400);

  background = createSprite(200, 200, 400, 400);
  background.shapeColor = ("lightGreen");

  monkey = createSprite(37, 330, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  gameOver = createSprite(200, 200, 10, 10);
  gameOver.addImage("over", gameOverImage);
  gameOver.visible = false;
  
  restart=createSprite(200,300,10,10)
  restart.addImage("re",restartImage)
  restart.visible=false;
  restart.scale=0.04;

  ground = createSprite(200, 360, 900, 17);
  ground.shapeColor = ("darkgreen");

  I_ground = createSprite(200, 360, 900, 10);
  I_ground.visible = false;

  bananaGroup = createGroup();
  obstaclesGroup = createGroup();

  survivalTime = 0;
  score = 0;

}


function draw() {
  if (gameState === PLAY) {
    survivalTime = survivalTime + Math.round(getFrameRate() / 60);

    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
      score = score + 1;
    }
    
    if (obstaclesGroup.isTouching(monkey)) {
      gameState = END;
    }
    if (frameCount % 331 === 0) {
      createBanana();
    }

    if (frameCount % 277 === 0) {
      createObstacle();
    }


    if (keyWentDown("space") && monkey.y >= 300) {
      monkey.velocityY = -15;
    }

    monkey.velocityY = monkey.velocityY + 0.8
  }

  if (gameState === END) {
    monkey.collide(I_ground);
    gameOver.visible = true;
    restart.visible=true;
    monkey.velocityY = 0;
    monkey.destroy();
    obstaclesGroup.destroyEach();
    bananaGroup.destroyEach();
    
    if(mousePressedOver(restart)) {
      reset();
    }

  }
  monkey.collide(I_ground);
  drawSprites();
  fill("darkgreen");
  stroke("darkblue")
  textSize(15);
  text("Survival Time: " + survivalTime, 50, 50);
  text("no. of bananas:" + score, 200, 50);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();

  monkey = createSprite(37, 330, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  survivalTime = 0;
  score=0;
}

function createBanana() {
  banana = createSprite(380, 230, 10, 10);
  banana.addImage("banana", bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -13;
  banana.lifetime = 3.07;
  bananaGroup.add(banana);


}

function createObstacle() {
  obstacle = createSprite(380, 315, 10, 10);
  obstacle.addImage("obstacle", obstacleImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -11;
  obstacle.lifetime = 3.06
  obstaclesGroup.add(obstacle);
}