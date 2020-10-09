
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage,ground;
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("run",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300,400,600,10);
  
  obstacleGroup = new Group();
  foodGroup = new Group();
}


function draw() {
  background("white");
  if (gameState === PLAY){
    if (keyDown("space")){
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 1;
    survivalTime = Math.round(frameCount/90);
    if (obstacleGroup.isTouching(monkey)){
      gameState = END;     
    }
    if (foodGroup.isTouching(monkey)){
      score = score + 1;
      foodGroup.destroyEach();
    }
    create_obstacle();
    create_food();
  }
  if (gameState === END){
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  
  }
  
  
  
  monkey.collide(ground);
  drawSprites();
  fill("black");
  textSize(16);
  text("Survival Time: " + survivalTime,400,50);
  text("Bananas: " + score,50, 50);
  
}
function create_food(){
  if(frameCount % 180 === 0){
     banana = createSprite(500,Math.round(random(150,200)),20,20);
     banana.addImage(bananaImage);
     banana.scale = 0.1;
     banana.velocityX = -6;
     banana.lifetime = 80;
     foodGroup.add(banana);
  }
}
function create_obstacle(){
  if(frameCount % 100 === 0){
     obstacle = createSprite(500,375,20,20);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.1;
     obstacle.velocityX = -6;
     obstacle.lifetime = 80;
     obstacleGroup.add(obstacle);
  }
}