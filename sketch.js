
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var survivalTime=0;
var gameState = "play";
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);
  
  monkey = createSprite(50,378,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  
  
  ground = createSprite(250,400,900,10);
  ground.velocityX = -4;
  ground.shapeColor = "white";
  
   FoodGroup = new Group();
   obstacleGroup = new Group();
}


function draw() {
  background("white");
if(gameState ==="play"){
  food();
  obstacles();
  

  textSize(20);
  fill("black");
  text("Score:"+score,350,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.round(frameCount/8)
  text("Survival Time:" + survivalTime, 100,50);
  
  if(ground.x<0){
    ground.x = 250;
  }
  monkey.collide(ground);
  
  if(keyDown("space")){
    monkey.velocityY = -11;
    
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score +2;
  }
   if(monkey.isTouching(obstacleGroup)){
     monkey.scale = 0.09;       
    
  }
  
    switch(score){
      case 10:monkey.scale = 0.12;
          break;
      case 20:monkey.scale = 0.14;
          break;
      case 30:monkey.scale = 0.16;
          break;
      case 40:monkey.scale =0.18;
          break;
     default: break;
    }
  
  
  
  drawSprites();
 }
  if(gameState ==="end"){
    background("black");
    textSize(35)
    text("GameOver",150,50);
    
    
  }
}


function food(){
  
  if(World.frameCount%80===0){
    banana = createSprite(500,250,10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.y = Math.round(random(180,260));
    banana.velocityX = -5;
    banana.lifetime = 100;
    FoodGroup.add(banana);
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth +1;
  }
}


function obstacles(){
  if(World.frameCount%150===0){
    obstacle = createSprite(380,400,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.14;
    obstacle.velocityX = -5
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle)
    obstacle.collide(ground);
    obstacle.depth = monkey.depth;
    
    
  }
}


