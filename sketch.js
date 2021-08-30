  
var towerImg, tower,sunnyImg, park,park2;
var doorImg, door, doorsGroup, cupImg, cup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg,sad,saddy, happy, revive;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var infiniteButton;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  sunnyImg = loadImage("sun.jpg");
  cupImg = loadImage("trophy.png");
  sad = loadImage("sadGhost.png");
  revive  = loadImage("opponent8.png")
}

function setup() {
  createCanvas(600,600);
  //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  
  ghost.setCollider("circle",0,0,120)
  ghost.debug = false;
}


function draw() {
  background(255);
  console.log(frameCount )
      
  
  if (gameState === "play") {
    if(keyDown("left")){
  
      // write a code to move left when left arrow is pressed
      ghost.x -= 4;
    }
    if(keyDown("right")){
  
    
      // write a code to move right when right arrow is pressed
      ghost.x += 4;
    }
    if(keyDown("space")){
  
   
      // write a code to move up when space arrow is pressed
      ghost.velocityY = -10;
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
   
      //write a condition for infinte scrolling tower
      if(tower.y > 400){
        tower.y = 300;
      }
      spawnDoors();

  
      //write a code to make climbersGroup collide with ghost change the ghost velocity  
      if(climbersGroup.isTouching(ghost)){
        ghost.velocityY = 0;
        spookySound.play();

      }

//write a code to make invisibleBlockGroup collide with ghost destroy the ghost and make gamestate to end.
if(invisibleBlockGroup.isTouching(ghost)){
  gameState = "end";
}


  drawSprites();
}
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  if(ghost.y > 600){
    tower.visible = false;
    park = createSprite(300,300);
    park.addImage("park",sunnyImg);
    park.scale =2;
    tower.visible = false;
    saddy = createSprite(200,200,50,50);
    saddy.scale = 0.7;
    saddy.addImage("StillDeadGhost", sad);
    doorsGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    climbersGroup.destroyEach();
  }

  reviveCup();
}

function spawnDoors()
 {
  //write code here to spawn the clouds
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //add the random function
    door.x = Math.round(random(150,450));
    climber.x = door.x;
    invisibleBlock.x = door.x; 
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //change the depth of the ghost and door
    door.depth = ghost.depth;
    ghost.depth += 1;
     

    
    //assign lifetime to the obstacle.lifetime = 300; here  obstacle are door, climber and invisible block
    door.lifetime = 650;
    climber.lifetime = 650;
    invisibleBlock.lifetime = 650;

    //add each obstacle to the group obstaclesGroup.add(obstacle);here  obstacle are door, climber and invisible block
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug = false;
  }

  
  
  
}

function reviveCup (){
  if(frameCount > 1500 ){
    cup = createSprite(300,100,10,10);
    cup.addImage(cupImg);
    cup.scale= 0.08;
    cup.lifetime = 100
    if(ghost.isTouching(cup)){ 
      tower.visible = false;
      ghost.destroy(); 
      park2 = createSprite(300,300);
      park2.addImage("park",sunnyImg);
      park2.scale =2;
      happy = createSprite(200,200,50,50);
      happy.scale = 0.3;
      happy.addImage("cycler", revive);
      doorsGroup.destroyEach();
      invisibleBlockGroup.visible = false; 
      climbersGroup.destroyEach();
    }
    
  }
  if(frameCount > 1550){
    cup.visible = false;


  }
}