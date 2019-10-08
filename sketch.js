var keys = [];
var score = 0;

function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  NuovoLivello();
}

function draw() {
  push();
  texture(floor);
  rect(0,0, windowWidth, windowHeight);
  pop();

  for (var i = 0; i < keys.length; i++) {
        keys[i].display();
    }
}

function mousePressed() {
  for (var i = 0; i < keys.length; i++) {
    keys[i].clicked();
  }
}

function NuovoLivello(){
  var lvlkeys = 0;
  if(score === 0){
    lvlkeys = 5;
  } else if(score === 5){
    lvlkeys = 10;
  } else if(score === 15){
    lvlkeys = 30;
  }

  for (var i = 0; i < lvlkeys; i++) {
    keys[i] = new Keys();
  }
}

function Keys() {
  var a = 40;
  this.colorbody = color("black");

  //define parameters of the keys
  this.x = random(a, windowWidth - a);
  this.y = random(windowHeight/6, windowHeight - a);
  this.larghezza = a;

  //define display of the keys
  this.display = function() {
    noStroke();
    fill(this.colorbody);
    ellipse(this.x, this.y, this.larghezza, this.larghezza); //body
  }

  //define what happens when you click on a key
  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y)
    if (d < a/2) {
      this.colorbody = color(0, 0);
      score++;
    }
  }
}
