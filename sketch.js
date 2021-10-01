var database;
var position;

var balloon, background;
var balloonImage1,balloonImage2,backgroundImage;
function preload(){
   backgroundImg = loadImage("cityImage.png");
   balloonimage1 = loadImage("hotairballoon1.png")
   balloonImage2 = loadAnimation("hotairballoon1.png", "hotairballoon2.png", "hotairballoon3.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1500,700);

  balloon = createSprite(250,650, 150, 150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale = 0.4;

  var balloonposition= database.ref("balloon/height");
  balloonposition.on("value",readposition, showError);
}

function draw() {

background(backgroundImg);

  if(keyDown(LEFT_ARROW)){
    updateheight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateheight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateheight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(DOWN_ARROW)){
    updateheight(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }  
  drawSprites();
}
  
  function updateheight(x,y){
    database.ref("balloon/height").set({
      "x" : height.x + x ,
      "y" : height.y + y 
    })
  }

  function readposition(data){
    height = data.val();
    balloon.x = height.x;
    balloon.y = height.y;
  }

  function showError(){
    console.log("Error in writing to the database");
  }