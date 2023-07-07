var PLAY = 1;
var END = 0;

var mountain, mountainIMG;
var plane, planeImg, planeAnimation;
var bulletGroup, bullet, bulletIMG;

var obstacleGroup, obstacle, obstacleIMG;
var fighterJetGroup, fighterJet, fighterJetIMG;
var spaceship, spaceshipIMG;

var counter = 0
var gameState= "stage1"

var score;
var gameOverImg, restartImg;

var stage2Bg;
var stage3Bg;

function preload(){
 mountainIMG = loadAnimation("hero-image.png");
 planeImg= loadAnimation('plane1.png');
 obstacleIMG = loadImage('obstacle.png');
 fighterJetIMG = loadImage('villan.png');
 spaceshipIMG = loadImage('spaceship.png');
 bulletIMG = loadImage('bullet.png');
 
 restartImg = loadImage('restart.png');
 gameOverImg = loadImage('gameOver.png');
 stage2Bg = loadAnimation("bg2.avif");
 stage3Bg = loadAnimation("bg3.avif");
}

function setup(){
  createCanvas(600,300);

  

  mountain = createSprite(250,120,600,300);
  mountain.addAnimation("stage1",mountainIMG);
  mountain.addAnimation("stage2",stage2Bg);
  mountain.addAnimation("stage3",stage3Bg);
  mountain.velocityX = -3;

  plane = createSprite(65,140,10,10);
  plane.addAnimation("stationary",planeImg);
  plane.scale= 1.5;

  spaceship = createSprite(550,140,10,10);
  spaceship.addImage(spaceshipIMG);
  spaceship.scale = 0.2

  gameOver = createSprite(295,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.4

  restart = createSprite(300,183);
  restart.addImage(restartImg);

  gameOver.visible = false;
  restart.visible = false;
  spaceship.visible = false;

  plane.setCollider("rectangle",0,0,plane.width,plane.height);
  plane.debug = true;
  

  obstacleGroup = createGroup();
  fighterJetGroup = createGroup();
  bulletGroup = createGroup();
}

function draw(){
  background(0);
  if(mountain.x<0){
     mountain.x=mountain.width/2;  
     counter+=1
  }
  
  if(gameState =="stage1"){
    if(keyDown(UP_ARROW)){
      plane.velocityY= -3
    }
    
    plane.velocityY =plane.velocityY + 0.5

    if(obstacleGroup.isTouching(plane)){
      gameState = "end";
    }
    
  if (counter==5){
    gameState= "stage2"
  }
  if (counter==10){
    gameState= "stage3"
  }

  drawObstacles();
  }
  else if(gameState=="stage2"){
    mountain.changeAnimation('stage2');
    
    if(fighterJetGroup.isTouching(plane)){
      gameState = "end2"
    }
    if(keyDown(UP_ARROW)){
      plane.velocityY= -3
    }
    
    plane.velocityY =plane.velocityY + 0.5

    drawFighterJets()}

    else if(gameState=="stage3"){
      mountain.changeAnimation('stage3');
      mountain.velocityX=0;
      spaceship.visible = true;
      plane.velocityX = 0;
      plane.velocityY = 0;
      if(keyDown(UP_ARROW)){
        plane.velocityY = plane.velocityY - 3
      }
      if(keyDown(DOWN_ARROW)){
        plane.velocityY = plane.velocityY + 3
      }

      if(keyDown("space")){
        shootBullet();
      }
    }

    else if(gameState === "end2"){
      gameOver.visible = true;
      restart.visible = true;
      fighterJetGroup.destroyEach();
      plane.velocityX = 0;
      plane.velocityY = 0;
      mountain.velocityX = 0;
    }
    
   else if(gameState === "end"){
      gameOver.visible = true;
      restart.visible = true;
      obstacleGroup.destroyEach();
      plane.velocityX = 0;
      plane.velocityY = 0;
      mountain.velocityX = 0;
    }
  else if(gameState==="win"){
      gameOver.visible = true;
      restart.visible = true;
      obstacleGroup.destroyEach();
      plane.velocityX = 0;
      plane.velocityY = 0;
      mountain.velocityX = 0;
      
    }

drawSprites();
}

function drawObstacles(){
  if (frameCount % 60 ===0){
    obstacle = createSprite(500,random(20,600),10,40);
    obstacle.addImage(obstacleIMG);
    obstacle.scale = 0.5;
    obstacle.velocityX= -3;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);}
  }

function drawFighterJets(){
  if (frameCount % 75 ===0){
    fighterJet = createSprite(500,random(20,600),10,40);
    fighterJet.addImage(fighterJetIMG);
    fighterJet.scale = 0.2;
    fighterJet.velocityX= -3;
    fighterJet.lifetime = 300;
    fighterJetGroup.add(fighterJet);}
  }

  function shootBullet(){
   bullet = createSprite(150, width/4, 50,20)
   bullet.y = plane.y-20;
   bullet.addImage(bulletIMG);
   bullet.scale = 0.08;
   bullet.velocityX = 6;
   bullet.lifetime = 100
   bulletGroup.add(bullet)

  }

