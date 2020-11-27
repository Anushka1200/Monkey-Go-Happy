var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var survivalTime = 0;
var restart,restartImage;
var gameState=PLAY;
var PLAY ;
var END =0 ;




function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  restartImage = loadImage("Restart_button.png.jpg");
 
}



function setup() {
  createCanvas(600,400);
  monkey = createSprite(80,315,10,10);
   monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,1200,5);
  ground.shapeColor= "brown";
  ground.x = ground.width/2;
  console.log(ground.x);
  ground.velocityX = -6;
  
  restart = createSprite(300,180,10,10);
  restart.addAnimation("Restart_button.png.jpg",restartImage);
  restart.scale = 0.4;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background("lightgreen");
  monkey.collide(ground);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,100,50);
  
  if(gameState===PLAY){
        if(FoodGroup.isTouching(monkey)){
    score = score+1;
    FoodGroup.destroyEach();
  }
   restart.visible = false;
  
     if(ground.x <0){
    ground.x = ground.width/2;
  }
    if(keyDown("space")&& monkey.y >=100){
   monkey.velocityY =-10;
 }
  monkey.velocityY = monkey.velocityY +0.8;
    
    spawnBanana();
  spawnObstacles();
  }
  
   if(obstacleGroup.isTouching(monkey)){    
        gameState = END;
        
      
    }
  if(gameState===END){
      restart.visible = true;
   ground.velocityX =0;
    monkey.velocityX= 0;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
     obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
   
    
  }
   if(mousePressedOver(restart)){
      reset();
   }
  drawSprites();
}

function reset(){
  gameState = PLAY;
obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
 
  score =0;

}
   
 
 
  
  
 

function spawnBanana(){
 if (frameCount % 160 === 0) {
     banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
   banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
   banana.scale=0.1;
   banana.lifetime = 200;
   FoodGroup.add(banana);
}
}

function spawnObstacles(){
  if(frameCount % 300 ===0){
    obstacle = createSprite(600,330,10,10);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}


