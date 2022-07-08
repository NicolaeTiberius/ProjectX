//let p5 = require("p5"); 

//Player object for current level is 
function setup() {
  createCanvas(800, 500);
  textAlign(CENTER);
  background(250);

  var playerColor = color(255, 0, 0);
}


var lives = 10;
var score = 0;

//timer for using controls. for example. when you go to a new level, the control timer will be set to 0 and not allow controls until it hits 30
var controlTimer = 110;

//assume you are off the ground at the start to prevent jumping before you touch a ground
var offGround = 10;

//prevents jumping just a few frames after the inital jump
var timeSinceJump = 1111;

//for future use
var slope;

var level = 1;
//self-explanatory
var gravity = 0.8;
var Player = {
  x: 385,
  y: 400,
  w: 30,
  h: 30,
  ySpeed: 0,
  xSpeed: 0
}

//the jump
Player.jump = function () {
  //only execute if the player has been on the ground VERY recently
  if (offGround < 3 && timeSinceJump > 2) {
    //fiddle with this to change the jump height
    this.ySpeed = 16;
    timeSinceJump = 0;
  }
}
Player.walk = function (dir) {
  this.xSpeed += dir;
}

//checks platform collision in the x-direction
Player.walkedInPlatform = function () {
  for (var i = 0; i < platformLevelData[level - 1].length; i++) {
    //check if they are in a wall, if so, move the f**k out!
    slope = 0;
    while (slope < 20 && platformLevelData[level - 1][i].checkCollision()) {
      this.y -= 0.2;
      slope++;
    }
    if (slope === 20) {

      this.x -= this.xSpeed;
      this.y += slope * 0.2;
    }
  }
}
//updates the position of the player based on current speeds
Player.update = function () {


  if (this.ySpeed < 4 || keys[UP_ARROW] || keys[87]) {//to make higher jumps the longer the up arrow is pressed
    this.ySpeed -= gravity;
  } else {
    this.ySpeed -= gravity * 2;
  }
  //so I just flip the y! Smart right?
  this.y -= this.ySpeed;

  this.xSpeed *= 0.8;
  this.x += this.xSpeed;

  if (this.y > height + 100) {
    lives--;
    Player.x = playerLevelData[level - 1][0];
    Player.y = playerLevelData[level - 1][1];
    Player.w = playerLevelData[level - 1][2];
    Player.h = playerLevelData[level - 1][3];
    Player.xSpeed = playerLevelData[level - 1][4];
    Player.ySpeed = playerLevelData[level - 1][5];
  }
}
Player.draw = function () {
  noStroke();
  fill(11, 39, 253); //colour of shape
  rect(this.x, this.y, this.w, this.h, this.w / 10);
  fill(254, 254, 255); //colour of his face 

  //jump costumes
  if (this.ySpeed > 0.5) {
    //jump looking right
    if (this.xSpeed > 0.8) {

      //eyes
      rect(this.x + this.w * 0.3, this.y + this.h * 0.22, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.75, this.y + this.h * 0.22, this.w * 0.15, this.h * 0.15);

      //mouth
      rect(this.x + this.w * 0.40, this.y + this.h * 0.54, this.w * 0.4, this.h * 0.25);
    } else if (this.xSpeed < -0.8) {//jump looking left

      //eyes
      rect(this.x + this.w * 0.1, this.y + this.h * 0.22, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.55, this.y + this.h * 0.22, this.w * 0.15, this.h * 0.15);

      //mouth
      rect(this.x + this.w * 0.20, this.y + this.h * 0.54, this.w * 0.4, this.h * 0.25);
    } else {//jump regular

      //eyes
      rect(this.x + this.w * 0.2, this.y + this.h * 0.22, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.65, this.y + this.h * 0.22, this.w * 0.15, this.h * 0.15);

      //mouth
      rect(this.x + this.w * 0.30, this.y + this.h * 0.54, this.w * 0.4, this.h * 0.25);
    }
  } else if (this.ySpeed < -3.3) {//falling
    //falling looking right
    if (this.xSpeed > 0.8) {

      //eyes
      rect(this.x + this.w * 0.3, this.y + this.h * 0.43, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.75, this.y + this.h * 0.43, this.w * 0.15, this.h * 0.15);


      rect(this.x + this.w * 0.40, this.y + this.h * 0.73, this.w * 0.4, this.h * 0.25);
    } else if (this.xSpeed < -0.8) {//falling looking left


      rect(this.x + this.w * 0.1, this.y + this.h * 0.43, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.55, this.y + this.h * 0.43, this.w * 0.15, this.h * 0.15);


      rect(this.x + this.w * 0.20, this.y + this.h * 0.73, this.w * 0.4, this.h * 0.25);
    } else {


      rect(this.x + this.w * 0.2, this.y + this.h * 0.43, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.65, this.y + this.h * 0.43, this.w * 0.15, this.h * 0.15);


      rect(this.x + this.w * 0.30, this.y + this.h * 0.73, this.w * 0.4, this.h * 0.25);
    }
  } else {

    if (this.xSpeed > 0.8) {

      //eyes
      rect(this.x + this.w * 0.3, this.y + this.h / 3, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.75, this.y + this.h / 3, this.w * 0.15, this.h * 0.15);

      //mouth
      rect(this.x + this.w * 0.40, this.y + this.h * 2 / 3, this.w * 0.4, this.h * 0.25);
    } else if (this.xSpeed < -0.8) {//looking left
      //eyes
      rect(this.x + this.w * 0.1, this.y + this.h / 3, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.55, this.y + this.h / 3, this.w * 0.15, this.h * 0.15);

      //mouth
      rect(this.x + this.w * 0.20, this.y + this.h * 2 / 3, this.w * 0.4, this.h * 0.25);
    } else {//regular
      //eyes
      rect(this.x + this.w * 0.2, this.y + this.h / 3, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.65, this.y + this.h / 3, this.w * 0.15, this.h * 0.15);

      //mouth
      rect(this.x + this.w * 0.30, this.y + this.h * 2 / 3, this.w * 0.4, this.h * 0.25);
    }
  }
}
// above is animation of his face when he moves

var Portal = {
  x: 0,
  y: 0,
  r: 0
};

Portal.draw = function () {
  fill(7, 217, 63);
  ellipse(this.x, this.y, this.r * 2, this.r * 2);

  strokeWeight(2);
  for (var i = 0; i < this.r; i++) {
    stroke(random(0), random(0), random(0));
    var xp = 123412;
    var yp = 123412;

    while (dist(this.x, this.y, xp, yp) > this.r) {
      xp = random(this.x - this.r, this.x + this.r);
      yp = random(this.y - this.r, this.y + this.r);
    }
    point(xp, yp);
  }
}

Portal.checkCollision = function () {
  return circlerect(this.x, this.y, this.r, Player.x, Player.y, Player.w, Player.h);
}
//current keys that are being held down
var keys = [];
function keyPressed() {

  keys[keyCode] = true;
}
function keyReleased() {
  keys[keyCode] = false;
}

//handles rect and rect collisions
function rectrect(x1, y1, w1, h1, x2, y2, w2, h2) {

  x1 += w1 / 2;
  y1 += h1 / 2;
  x2 += w2 / 2;
  y2 += h2 / 2;

  return Math.abs(x1 - x2) <= w1 / 2 + w2 / 2 && Math.abs(y1 - y2) <= h1 / 2 + h2 / 2;
}

function circlerect(x1, y1, r1, x2, y2, w2, h2) {
  var distX = Math.abs(x1 - x2 - w2 / 2);
  var distY = Math.abs(y1 - y2 - h2 / 2);

  if (distX > (w2 / 2 + r1)) { return false; }
  if (distY > (h2 / 2 + r1)) { return false; }

  if (distX <= (w2 / 2)) { return true; }
  if (distY <= (h2 / 2)) { return true; }

  var dx = distX - w2 / 2;
  var dy = distY - h2 / 2;
  return (dx * dx + dy * dy <= (r1 * r1));
}
//platform prototype
function Platform(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.draw = function () {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
  this.checkCollision = function () {
    return rectrect(Player.x, Player.y, Player.w, Player.h, this.x, this.y, this.w, this.h)
  }
}


var platformLevelData = [
  [//level 1

    new Platform(250, 450, 300, 20),
    new Platform(320, 300, 160, 15),
    new Platform(350, 220, 100, 10)


  ],
  [//level 2

    new Platform(350, 450, 300, 20),
    new Platform(520, 300, 160, 15),
    new Platform(750, 220, 100, 10)
  ],
  [

    new Platform(10, 300, 30, 10),
    new Platform(160, 300, 30, 10),
    new Platform(320, 300, 30, 10),
    new Platform(480, 300, 30, 10),
    new Platform(640, 300, 30, 10),
    new Platform(800, 300, 30, 10),
    new Platform(960, 300, 30, 10),
    new Platform(1120, 300, 30, 10)

  ],
  [

    new Platform(0, 480, 20, 10),
    new Platform(0, 380, 20, 10),
    new Platform(0, 280, 20, 10),
    new Platform(0, 180, 20, 10),
    new Platform(100, 80, 40, 10),
    new Platform(380, 480, 20, 10)

  ],
  [

    new Platform(-100, 450, 200, 30),
    new Platform(-125, 300, 250, 10)

  ]

];

var playerLevelData = [
  [385, 400, 30, 30, 0, 0],//level 1
  [385, 400, 30, 30, 0, 0],//2
  [10, 280, 30, 30, 0, 0],//3
  [0, 460, 30, 30, 0, 0],//4
  [0, 420, 30, 30, 0, 0]//5
];

var portalLevelData = [
  [300, 50, 40],//level 1
  [900, 50, 40],//2
  [1300, 200, 10],//3
  [600, 520, 40],//4
  [0, 100, 30]//5
];
function win() {
  background(245);
  textSize(width / 16)
  text("You beat all levels.", width / 2, 300);
  noLoop();
  return;
}
function lose() {
  background(245);
  textSize(width / 16)
  text("You ran out of lives.", width / 2, 300);
  noLoop();
  return;
}
//adjusts player and portal values when going to the next level
function nextLevel() {
  if (level > platformLevelData.length) {
    win();
  }
  Player.x = playerLevelData[level - 1][0];
  Player.y = playerLevelData[level - 1][1];
  Player.w = playerLevelData[level - 1][2];
  Player.h = playerLevelData[level - 1][3];
  Player.xSpeed = playerLevelData[level - 1][4];
  Player.ySpeed = playerLevelData[level - 1][5];
  Portal.x = portalLevelData[level - 1][0];
  Portal.y = portalLevelData[level - 1][1];
  Portal.r = portalLevelData[level - 1][2];
  controlTimer = 0;
}

//readies things up for level 1
nextLevel();

//overrides the value assignment in the next level function because you should be able to move immediately on the first level
var controlTimer = 110;
//main game loop
function draw() {

  //for horizontal scrolling
  push();
  background(245);

  //only allows controls if a certain amount of time has passed on the timer (on a new level, etc)
  if (controlTimer > 29) {
    //handles player input
    if (keys[UP_ARROW] || keys[87]) {
      Player.jump();
    }
    if (keys[LEFT_ARROW] || keys[65]) {
      Player.walk(-1);
    }
    if (keys[RIGHT_ARROW] || keys[68]) {
      Player.walk(1);
    }
  } else {
    textSize(12);
    text("Controls currently locked", 80, 15)
    controlTimer++;
  }
  //updates the player's position (before drawing obviously, you don't want a 1 frame delay between input and output)
  Player.update();

  //checks if the update of player position caused a collision with a platform, if so, move it out
  Player.walkedInPlatform();
  translate(-Player.x + width / 2, 0);

  //increases the amount of frames that the player has been off the ground
  offGround++;
  timeSinceJump++;
  //If the player is found to be touching the ground (only caused by vertical movements)
  for (var i = 0; i < platformLevelData[level - 1].length; i++) {
    //handles platform collisions.
    if (platformLevelData[level - 1][i].checkCollision()) {
      while (platformLevelData[level - 1][i].checkCollision()) {
        if (Player.ySpeed > 0) {

          //ceiling detection
          Player.y += 0.2;
        } else {

          //floor detection
          offGround = 0;
          //make this value higher for better performance but it makes things a lot less accurate should be a factor of gravity or else weird sh*t is gonna happen
          Player.y -= 0.2;
        }
      }

      //touching a ground stops all y speeds
      Player.ySpeed = 0;
    }

    //draws the platform
    platformLevelData[level - 1][i].draw();
  }
  Player.draw();
  Portal.draw();
  pop();

  textSize(30);
  text("Lives: " + lives, width - 70, 30);

  textSize(20);
  text("Score:" + score, width - 700,40)

  //checks if lives are all out
  if (lives < 1) {
    lose();
  }
  //checks collision with portal, if there is collision, move player to the next level
  if (Portal.checkCollision()) {
    level++;
    nextLevel();
  }
}