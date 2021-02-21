var balloon, balloonImg1, balloonImg2, balloonImg3, backgroundImg;
var localDatabase, position;

function preload(){
  backgroundImg = loadImage("Hot Air Ballon-01.png");
  balloonImg1 = loadAnimation("Hot Air Ballon-02.png");
  balloonImg2 = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png");
  balloonImg3 = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png");
}

function setup(){
    createCanvas(1000,1000);
    //we are connecting firebase's database to our program--- this will open real time database
    localDatabase=firebase.database();
    balloon = createSprite(10,200,10,10);
    balloon.scale = 0.4;
    balloon.addAnimation("position1", balloonImg1);
    balloon.addAnimation("position2", balloonImg2);
    balloon.addAnimation("position3", balloonImg3);
    //ref -- refer the location from where the data needs to be read
    var balloonPositionRef=localDatabase.ref("balloon/position");
    //on -- continous listening/reading
    //value= {x:200, y:200} 
    balloonPositionRef.on ("value",readData,showError);
}

function draw(){
    background(backgroundImg);
    if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    textSize(30);
    text("PRESS THE ARROW KEYS TO MOVE",200,40);
    drawSprites();
  }
}

function writePosition(x,y){
    //ball.x=190+(-1)=189                       
    //ball.x = ball.x + x;
    //ball.y = ball.y + y;
    localDatabase.ref("balloon/position").set({
        //x, y these are your database variables
        x:position.x+x,
        y:position.y+y
    })
}
//data = "value"= {x:200,y:200}
function readData(data){
//data.val -- it will fetch teh x and y values
// position.x- u will get x value
//position.y - u will get y value
position = data.val();
balloon.x= position.x;
balloon.y=position.y;
}

function showError(){
    console.log ("error");
}

/*ball 
---position
---x:200
y:200

this.body.position.x --- ball.position.x----ball/position/x*/