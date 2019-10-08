var keys = [];
var score = 0;
var door;
var numberkeys = 5;

function preload(){
  //load images
  key = loadImage('assets/key.png');
  doorimg = loadImage('assets/door.png');
  bianco = loadImage('assets/bianco.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(90,90,90);
  //create level
  NuovoLivello(numberkeys);
}

function draw() {
  background(90,90,90);
    var missingkeys;
    for (var i = 0; i < keys.length; i++) {
        keys[i].display();
    }
    fill("black");
    rect(0, 0, windowWidth, windowHeight/6);
    door.display();
    push();
    fill('white');
    textSize(20);
    missingkeys =  numberkeys - score;
    text('chiavi mancanti =' , windowWidth/2 - 100, windowHeight - 10);
    text(missingkeys ,  windowWidth/2 + 60, windowHeight - 10);
    pop();
    push();
    fill('white');
    textSize(20);
    text('clicca le chiavi per prenderle e poi clicca la porta per aprirla', 10, windowHeight - 10);
    pop();
}

function mousePressed() {
  for (var i = 0; i < keys.length; i++) {
    keys[i].clicked();
  }
  door.clicked();
}

function NuovoLivello(lvlkeys){
  background(90,90,90);
  for (var i = 0; i < lvlkeys; i++) {
    keys[i] = new Keys();
  }
  door = new Door();
}

function Keys() {
  var a = 60;

  //define parameters of the keys
  this.x = random(a, windowWidth - a*2);
  this.y = random(windowHeight/6, windowHeight - a*2);
  this.larghezza = a;
  this.chiave = key;

  //define display of the keys
  this.display = function() {
    push();
    translate(-this.larghezza/2, -this.larghezza/2);
    image(this.chiave, this.x, this.y, this.larghezza, this.larghezza);
    pop();
  }

  //define what happens when you click on a key
  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y)
    if (d < a/2) {
      this.chiave = bianco;
      score++;
    }
  }
}

function Door() {
  this.porta = doorimg;
  //define display of the door
  this.display = function() {
    image(this.porta, windowWidth/2 - windowHeight/12, 0, windowHeight/6, windowHeight/6);
  }

  //define what happens when you click on a key
  this.clicked = function() {
    if(mouseX > windowWidth/2 - 65 && mouseX < windowWidth/2 + 65 && mouseY > 0 && mouseY < windowHeight/6 && score >= numberkeys) {
      numberkeys = numberkeys *2;
      score = 0;
      print("ciao");
      NuovoLivello(numberkeys);
    }
  }
}
