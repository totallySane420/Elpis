
/* VARIABLES */
let player = 0;
let ground, platforms, hope, puddles, poop;

let brownCat, whiteCat, gingerCat, blackCat;
let brownSnail, whiteSnail, gingerSnail, blackSnail;
let brownGirl, whiteGirl, gingerGirl, blackGirl;

let groundlvl;

let a1Button;
let a2Button;

let quitButton;

let isJumping;
let isWalking;

let baseScore = 0;
let score = 0;
let hopeUsed = false;
let screen;
let gameState;
let charType;
let resets = 0;

let bgMusic;
let homeMusic = 0;
let gameMusic = 0;

// Manage game states

/* PRELOAD LOADS FILES */
//preload
function preload() {
  // Load homeScreen image
  homeScreenImg = loadImage("assets/homeScreen.jpeg");
  // Load background image
  bg = loadImage('assets/sky.png');
  // Load character images
  brCat = loadImage('assets/brownCatIdle.png');
  whCat = loadImage('assets/whiteCatIdle.png');
  giCat = loadImage('assets/gingerCatIdle.png');
  blCat = loadImage('assets/blackCatIdle.png');
  brSnail = loadImage('assets/brownSnail.png');
  whSnail = loadImage('assets/whiteSnail.png');
  giSnail = loadImage('assets/gingerSnail.png');
  blSnail = loadImage('assets/blackSnail.png');
  brGirl = loadImage('assets/brownGirlIdle.png');
  whGirl = loadImage('assets/whiteGirlIdle.png');
  giGirl = loadImage('assets/gingerGirlIdle.png');
  blGirl = loadImage('assets/blackGirlIdle.png');

  flower2 = loadImage('assets/hope.png');
  
  // Load hope image
  // hope = loadImage('assets/hope.png');
  //Load brick image
  brick = loadImage('assets/brick.png');
  //Load poop image
  poop = loadImage('assets/poop.png');
  //Load bg music
  bgMusicStasis = loadSound('assets/LEASE.mp3');
  bgMusicLvl1 = loadSound('assets/fromTheWindow.mp3');
  bgMusicLvl2 = loadSound('assets/2008ToyotaCorolla.mp3');
}

/* SETUP RUNS ONCE */
//setup
function setup() {
  createCanvas(400, 400);
  
  world.gravity.y = 10;

  //HomeScreen img
  flower = new Sprite(homeScreenImg, -200, -150, "s");
  flower.scale = 0.2;
  
  bgMusicLvl1.volumemultiplier = 0.5;
  
  //Walking animations
  brCatWalk = loadAnimation('assets/brownCatWalk1.png', 'assets/brownCatWalk2.png');
  blCatWalk = loadAnimation('assets/blackCatWalk1.png', 'assets/blackCatWalk2.png');
  giCatWalk = loadAnimation('assets/gingerCatWalk1.png', 'assets/gingerCatWalk2.png');
  whCatWalk = loadAnimation('assets/whiteCatWalk1.png', 'assets/whiteCatWalk2.png');

  brGirlWalk = loadAnimation('assets/brownGirlWalk1.png', 'assets/brownGirlWalk2.png')
  blGirlWalk = loadAnimation('assets/blackGirlWalk1.png', 'assets/blackGirlWalk2.png')
  giGirlWalk = loadAnimation('assets/gingerGirlWalk1.png', 'assets/gingerGirlWalk2.png')
  whGirlWalk = loadAnimation('assets/whiteGirlWalk1.png', 'assets/whiteGirlWalk2.png')
  
  brCatWalk.frameDelay = 20;
  blCatWalk.frameDelay = 20;
  giCatWalk.frameDelay = 20;
  whCatWalk.frameDelay = 20;

  brGirlWalk.frameDelay = 20;
  blGirlWalk.frameDelay = 20;
  giGirlWalk.frameDelay = 20;
  whGirlWalk.frameDelay = 20;
  
  //Options group
  option = new Group();
  option.rotationLock = true;
  option.vel.x = 0;
  option.vel.y = 0;
  option.diameter = 10;
  option.collider = "s";
  option.x = -100;
  option.y = -100;
  option.scale = 0.9;

  //Create cat sprites
  cat = new option.Group();
  
  brownCat = new cat.Sprite();
  brownCat.img = brCat;
  brownCat.addAni("walk", brCatWalk);
  brownCat.addAni("idle", brCat);
  brownCat.addAni("jump", "assets/brownCatJump.png");
  
  blackCat = new cat.Sprite();
  blackCat.img = blCat;
  blackCat.addAni("walk", blCatWalk);
  blackCat.addAni("idle", blCat);
  blackCat.addAni("jump", "assets/blackCatJump.png");
  
  gingerCat = new cat.Sprite();
  gingerCat.img = giCat;
  gingerCat.addAni("walk", giCatWalk);
  gingerCat.addAni("idle", giCat);
  gingerCat.addAni("jump", "assets/gingerCatJump.png");
  
  whiteCat = new cat.Sprite();
  whiteCat.img = whCat;
  whiteCat.addAni("walk", whCatWalk);
  whiteCat.addAni("idle", whCat);
  whiteCat.addAni("jump", "assets/whiteCatJump.png");
  
  //Create girl sprites
  girl = new option.Group();
  girl.scale = 0.7;
  
  brownGirl = new girl.Sprite();
  brownGirl.img = brGirl;
  brownGirl.addAni("walk", brGirlWalk);
  brownGirl.addAni("idle", brGirl);
  brownGirl.addAni("jump", "assets/brownGirlJump.png");
  
  blackGirl = new girl.Sprite();
  blackGirl.img = blGirl;
  blackGirl.addAni("walk", blGirlWalk);
  blackGirl.addAni("idle", blGirl);
  blackGirl.addAni("jump", "assets/blackGirlJump.png");
  
  gingerGirl = new girl.Sprite();
  gingerGirl.img = giGirl;
  gingerGirl.addAni("walk", giGirlWalk);
  gingerGirl.addAni("idle", giGirl);
  gingerGirl.addAni("jump", "assets/gingerGirlJump.png");
  
  whiteGirl = new girl.Sprite();
  whiteGirl.img = whGirl;
  whiteGirl.addAni("walk", whGirlWalk);
  whiteGirl.addAni("idle", whGirl);
  whiteGirl.addAni("jump", "assets/whiteGirlJump.png");
  
  //Create snail sprites
  snail = new option.Group();
  snail.scale = 0.5;
  snail.w = 32;
  snail.h = 32;
  
  brownSnail = new snail.Sprite();
  brownSnail.img = brSnail;
  brownSnail.addAni("walk", brSnail);
  brownSnail.addAni("idle", brSnail);
  brownSnail.addAni("jump", brSnail);
  
  blackSnail = new snail.Sprite();
  blackSnail.img = blSnail;
  blackSnail.addAni("walk", blSnail);
  blackSnail.addAni("idle", blSnail);
  blackSnail.addAni("jump", blSnail);
  
  gingerSnail = new snail.Sprite();
  gingerSnail.img = giSnail;
  gingerSnail.addAni("walk", giSnail);
  gingerSnail.addAni("idle", giSnail);
  gingerSnail.addAni("jump", giSnail);
  
  whiteSnail = new snail.Sprite();
  whiteSnail.img = whSnail;
  whiteSnail.addAni("walk", whSnail);
  whiteSnail.addAni("idle", whSnail);
  whiteSnail.addAni("jump", whSnail);
  
  //Create ground
  ground = new Sprite(1500, 380, 1, 1, "s");
  ground.color = color(188, 158, 130);
  ground.friction = 0;
  ground.image = "assets/brick.png";

  //Ground for level 2
  groundlvl = new Group();
  groundlvl.color = color(188, 158, 130);
  groundlvl.collider = "s";
  groundlvl.image = "assets/brick.png";
  groundlvl.friction = 0;
  
  platforms = new Group();
  platforms.img = "assets/brick.png";
  platforms.color = "blue";
  platforms.collider = "s";
  platforms.friction = 0;

  hope = new Group();
  hope.color = ("#FCFFB2");
  hope.img = flower2;
  hope.scale = 0.4;
  hope.collider = "s";

  puddles = new Group();
  puddles.color = ("#82B8E1");
  puddles.collider = "s";
  puddles.friction = 0;
  puddles.stroke = ("#82B8E1");

  poop = new Group();
  poop.color = "brown";
  poop.img = "assets/poop.png";
  poop.collider = "s";
  poop.friction = 0;
  poop.scale = 0.5;

  a1Button = new Sprite(-200, -200);
  a2Button = new Sprite(-50, -50);


  quitButton = new Sprite(-250, -250);
  
  isJumping = false;

  gameState = 'home';

}
/* DRAW LOOP REPEATS */
//draw
function draw() {
  if (gameState == 'home') {
    loadHomeScreen();
    if (homeMusic == 0){
      stopMusic(bgMusicLvl2)
      gameMusic = 0
      backgroundMusic(bgMusicStasis)
      homeMusic = 1;
    }
  }
  if (gameState == 'switch') {
    levelSwitchScreen();
    if (homeMusic == 0){
      stopMusic(bgMusicLvl1)
      gameMusic = 0
      backgroundMusic(bgMusicStasis)
      homeMusic = 1;
    }
  }
  if (a1Button.mouse.presses() & screen == "home") {
    console.log("Start Game");
    gameState = 'level1'; // Switch to level 1 start state
    player = randomCharacter();
    loadLevel1Screen();
  }
  if (a2Button.mouse.presses() & screen == "home") {
    console.log("Endings");
    showEndings();
  } 
  if (a1Button.mouse.presses() & screen == "switch") {
    console.log("Start level 2");
    loadLevel2Screen();
    gameState = 'level2'; // Switch to level 2 start state
  }
  if (a2Button.mouse.presses() & screen == "switch") {
    console.log("Return Home");
    loadHomeScreen()
    homeMusic = 0;
  }
  if (a1Button.text == "Use hope" & a1Button.mouse.presses() & screen == "pause") {
    console.log("Start level 2 - Easier");
    loadLevel2ScreenE();
    hopeUsed = true;
    gameState = 'level2'; // Switch to level 2 start state
  }
  if (a2Button.mouse.presses() & screen == "pause") {
    console.log("Return Home");
    loadHomeScreen()
    homeMusic = 0;
  }
  if (gameState == 'Pause'){
    if (homeMusic == 0){
      stopMusic(bgMusicLvl2)
      gameMusic = 0
      backgroundMusic(bgMusicStasis)
      homeMusic = 1;
  }
  }
  if (gameState == 'level1') {
    player.overlaps(hope, collect);
    movePlayer();
    level1();
    if (gameMusic == 0){
      stopMusic(bgMusicStasis)
      homeMusic = 0;
      backgroundMusic(bgMusicLvl1)
      gameMusic = 1;
    }
  }
  if (gameState == 'level2'){
    player.overlaps(hope, collect)
    movePlayer2()
    level2()
    if (gameMusic == 0){
      stopMusic(bgMusicStasis)
      homeMusic = 0;
      backgroundMusic(bgMusicLvl2)
      gameMusic = 1;
    }
}

  if ((player.x > 55) & (a1Button.mouse.presses()) & (screen == "level2")){
    player.y = 450;
    console.log("Pause screen");
    gameState = 'Pause'; // Switch to pause state
    loadPauseScreen();
  }
}

/* FUNCTIONS */
//Functions

function randomCharacter(){
  if (player == 0){
    choice = int(random(12));
    if (choice == 0) {
      charType = "cat";
      return brownCat;
    } else if (choice == 1) {
      charType = "cat";
      return blackCat;
    } else if (choice == 2) {
      charType = "cat";
      return gingerCat;
    }
    if (choice == 3) {
      charType = "cat";
      return whiteCat;
    } else if (choice == 4) {
      charType = "snail";
      return brownSnail;
    } else if (choice == 5) {
      charType = "snail";
      return blackSnail;
    }
    if (choice == 6) {
      charType = "snail";
      return gingerSnail;
    } else if (choice == 7) {
      charType = "snail";
      return whiteSnail;
    } else if (choice == 8) {
      charType = "girl";
      return brownGirl;
    }
    if (choice == 9) {
      charType = "girl";
      return blackGirl;
    } else if (choice == 10) {
      charType = "girl";
      return gingerGirl;
    } else if (choice == 11) {
      charType = "girl";
      return whiteGirl;
    }
    return -1;
  }
}

function loadHomeScreen() {
  if (screen == 'home') return; // Prevent calling multiple times
  
  // Remove all sprites from groups
  platforms.removeAll();
  hope.removeAll();
  puddles.removeAll();
  poop.removeAll();

  baseScore = 0;
  score = 0;
  hopeUsed = false;

  background("pink");
  fill(158, 40, 72);
  textAlign(CENTER);
  textSize(30);
  text('Elpis', 185, 40);
  
  flower.pos = { x: 200, y: 180 };
  // Add A1 button
  a1Button.pos = { x: 130, y: height / 2 + 75 };
  a1Button.w = 70;
  a1Button.h = 40;
  a1Button.collider = "s";
  a1Button.color = "plum";
  a1Button.text = "Start Game";

  // Add A2 button
  a2Button.pos = { x: 270, y: height / 2 + 75 };
  a2Button.w = 70;
  a2Button.h = 40;
  a2Button.collider = "s";
  a2Button.color = "plum";
  a2Button.text = "Endings";
  
  screen = "home";
}
function levelSwitchScreen(){
  if (screen == 'switch') return; // Prevent calling multiple times

  // Remove all sprites from groups
  ground.remove();
  groundlvl.removeAll()
  platforms.removeAll();
  hope.removeAll();
  puddles.removeAll();
  poop.removeAll();

  background("pink");
  fill(158, 40, 72);
  textAlign(CENTER);
  textSize(30);
  text("Level Complete!", 185, 40);
  textSize(12);
  text("Are you ready for the next level \nor would you like to return to the homescreen? \nP.S. your progress will be lost if you leave now!", 200, 160);
  
  // Add A1 button
  a1Button.pos = { x: 70, y: 275};
  a1Button.w = 70;
  a1Button.h = 40;
  a1Button.collider = "s";
  a1Button.color = "plum";
  a1Button.text = "Next Level";

  // Add A2 button
  a2Button.pos = { x: 250, y: 275};
  a2Button.w = 70;
  a2Button.h = 40;
  a2Button.collider = "s";
  a2Button.color = "plum";
  a2Button.text = "Quit";

  screen = "switch";
}
function loadLevel1Screen() {
  //Remove buttons
  a1Button.pos = { x: -200, y: -200 };
  a2Button.pos = { x: -50, y: -50 };
  //Remove image
  flower.pos = { x: -2000, y: -2000 };
  if (screen == 'level1') return; // Prevent calling multiple times
  background(bg);

  fill(158, 40, 72);

  platforms.removeAll();
  hope.removeAll();
  puddles.removeAll();
  poop.removeAll();

  player.x = 50;
  player.y = 250;
  player.collider = "d";
  player.rotationLock = true;
  player.vel.x = 0;
  player.vel.y = 0;

  ground.scale.x = 6;
  ground.scale.y = 0.5;
  
  ground.x = 150;
  ground.y = 380;
  ground.w = 600;
  ground.h = 77;

  // Create platforms
  plat1 = new platforms.Sprite(200, 324, 75, 75);
  plat2 = new platforms.Sprite(470, 335, 50, 50);
  plat2.image.offset = 3
  plat2.scale = 0.6;
  if (charType == "girl"){
    plat3 = new platforms.Sprite(1350, 100, 75, 30);
    plat3.img = "assets/brickWorm.png";
    plat3.scale.y = 0.4;
    plat4 = new platforms.Sprite(1500, 220, 50, 30);
    plat4.scale.x = 0.55;
    plat4.scale.y = 0.4;
  }
  else{
    plat3 = new platforms.Sprite(1350, 220, 75, 30);
    plat3.scale.y = 0.4;
    plat4 = new platforms.Sprite(1500, 280, 50, 30);
    plat4.scale.x = 0.55;
    plat4.scale.y = 0.4;
  }

  // Create puddles
  new puddles.Sprite(640, 355, 55, 10);
  new puddles.Sprite(955, 355, 60, 10);
  new puddles.Sprite(1155, 355, 40, 10);

  new hope.Sprite(1060, 335, 30);
  if (charType == "girl"){
    new hope.Sprite(1346, 70, 30);
    new hope.Sprite(1501, 179, 30);
  }
  else{
    new hope.Sprite(1346, 190, 30);
    new hope.Sprite(1501, 239, 30);
  }


  new poop.Sprite(1360, 350, 40, 20);

  screen = "level1";
}
function loadLevel2Screen() {
  //Remove buttons
  a1Button.pos = { x: -200, y: -200 };
  a2Button.pos = { x: -50, y: -50 };
  if (screen == 'level2') return; // Prevent calling multiple times
  background(bg);

  fill(158, 40, 72);
  ground.remove();
  platforms.removeAll();
  hope.removeAll();
  puddles.removeAll();
  poop.removeAll();
  
  a1Button.pos = { x: 25, y: 45};
  a1Button.w = 40;
  a1Button.h = 40;
  a1Button.collider = "s";
  a1Button.color = "plum";
  a1Button.text = "Quit?";
  
  player.x = 50;
  player.y = 250;
  
  player.collider = "d";
  player.rotationLock = true;
  player.vel.x = 0;
  player.vel.y = 0;
  
  ground1 = new groundlvl.Sprite(45, 370, 100, 80);
  ground1.scale.x = 6;
  ground1.scale.y = 1.5;
  
  ground2 = new groundlvl.Sprite(660, 370, 100, 80);
  ground2.scale.x = 3;
  ground2.scale.y = 1.5;
  
  ground3 = new groundlvl.Sprite(980, 370, 100, 80);
  ground3.scale.x = 5;
  ground3.scale.y = 1.5;
  
  ground4 = new groundlvl.Sprite(1700, 280, 100, 80);
  ground4.scale.x = 3;
  ground4.scale.y = 4;
  
  ground5 = new groundlvl.Sprite(2010, 370, 100, 80);
  ground5.scale.x = 5;
  ground5.scale.y = 1.5;
  
  // Create platforms
  plat1 = new platforms.Sprite(355, 240, 80, 50);
  plat2 = new platforms.Sprite(470, 170, 80, 50);
  plat3 = new platforms.Sprite(640, 155, 80, 50);
  plat4 = new platforms.Sprite(765, 90, 80, 50);
  plat5 = new platforms.Sprite(895, 175, 80, 50);
  plat6 = new platforms.Sprite(1010, 90, 80, 50);
  plat7 = new platforms.Sprite(1025, 210, 80, 50);
  plat8 = new platforms.Sprite(1155, 125, 80, 50);
  plat9 = new platforms.Sprite(1245, 270, 80, 50);
  plat10 = new platforms.Sprite(1315, 190, 80, 50);
  plat11 = new platforms.Sprite(1385, 370, 80, 50);
  plat12 = new platforms.Sprite(1465, 255, 80, 50);
  plat13 = new platforms.Sprite(1540, 150, 80, 50);
  plat1.scale.x = 0.7;
  plat1.scale.y = 0.3;
  plat2.scale.x = 0.7;
  plat2.scale.y = 0.3;
  plat3.scale.x = 0.7;
  plat3.scale.y = 0.3;
  plat4.scale.x = 0.7;
  plat4.scale.y = 0.3;
  plat5.scale.x = 0.7;
  plat5.scale.y = 0.3;
  plat6.scale.x = 0.7;
  plat6.scale.y = 0.3;
  plat7.scale.x = 0.7;
  plat7.scale.y = 0.3;
  plat8.scale.x = 0.7;
  plat8.scale.y = 0.3;
  plat9.scale.x = 0.7;
  plat9.scale.y = 0.3;
  plat10.scale.x = 0.7;
  plat10.scale.y = 0.3;
  plat11.scale.x = 0.7;
  plat11.scale.y = 0.3;
  plat12.scale.x = 0.7;
  plat12.scale.y = 0.3;
  plat13.scale.x = 0.7;
  plat13.scale.y = 0.3;
  
  // Create puddles
  new puddles.Sprite(580, 310, 55, 10);
  new puddles.Sprite(1026, 199, 50, 10);
  new puddles.Sprite(1387, 355, 50, 10);
  new puddles.Sprite(1542, 139, 50, 10);

  // Create hope
  new hope.Sprite(355, 210, 30);
  new hope.Sprite(470, 140, 30);
  
  new hope.Sprite(755, 60, 30);
  new hope.Sprite(765, 60, 30);
  new hope.Sprite(775, 60, 30);
  new hope.Sprite(785, 60, 30);

  new hope.Sprite(896, 145, 30);
  new hope.Sprite(1155, 95, 30);

  new hope.Sprite(1370, 340, 30);
  new hope.Sprite(1400, 340, 30);

  // if (charType == "girl"){
  //   new hope.Sprite(1346, 70, 30);
  //   new hope.Sprite(1501, 179, 30);
  // }
  // else{
  //   new hope.Sprite(1346, 190, 30);
  //   new hope.Sprite(1501, 239, 30);
  // }


  new poop.Sprite(660, 136, 40, 20);
  new poop.Sprite(660, 136, 40, 20);
  new poop.Sprite(1335, 170, 40, 20);
  new poop.Sprite(1450, 235, 40, 20);
  
  screen = "level2";
}
function loadLevel2ScreenE() {
  //Remove buttons
  a1Button.pos = { x: -200, y: -200 };
  a2Button.pos = { x: -50, y: -50 };
  if (screen == 'level2E') return; // Prevent calling multiple times
  background(bg);

  fill(158, 40, 72);
  ground.remove();
  platforms.removeAll();
  hope.removeAll();
  puddles.removeAll();
  poop.removeAll();

  player.x = 50;
  player.y = 250;
  player.collider = "d";
  player.rotationLock = true;
  player.vel.x = 0;
  player.vel.y = 0;

  ground1 = new groundlvl.Sprite(45, 370, 100, 80);
  ground1.scale.x = 6;
  ground1.scale.y = 1.5;

  ground2 = new groundlvl.Sprite(660, 370, 100, 80);
  ground2.scale.x = 3;
  ground2.scale.y = 1.5;

  ground3 = new groundlvl.Sprite(980, 370, 100, 80);
  ground3.scale.x = 5;
  ground3.scale.y = 1.5;

  ground4 = new groundlvl.Sprite(1700, 280, 100, 80);
  ground4.scale.x = 3;
  ground4.scale.y = 4;

  ground5 = new groundlvl.Sprite(2010, 370, 100, 80);
  ground5.scale.x = 5;
  ground5.scale.y = 1.5;

  // Create platforms
  plat1 = new platforms.Sprite(355, 240, 80, 50);
  plat2 = new platforms.Sprite(470, 170, 80, 50);
  plat3 = new platforms.Sprite(640, 155, 80, 50);
  plat4 = new platforms.Sprite(765, 90, 80, 50);
  plat5 = new platforms.Sprite(895, 175, 80, 50);
  plat6 = new platforms.Sprite(1010, 90, 80, 50);
  plat7 = new platforms.Sprite(1025, 210, 80, 50);
  plat8 = new platforms.Sprite(1155, 125, 80, 50);
  plat9 = new platforms.Sprite(1245, 270, 80, 50);
  plat10 = new platforms.Sprite(1315, 190, 80, 50);
  plat11 = new platforms.Sprite(1385, 370, 80, 50);
  plat12 = new platforms.Sprite(1465, 255, 80, 50);
  plat13 = new platforms.Sprite(1540, 150, 80, 50);
  plat1.scale.x = 0.7;
  plat1.scale.y = 0.3;
  plat2.scale.x = 0.7;
  plat2.scale.y = 0.3;
  plat3.scale.x = 0.7;
  plat3.scale.y = 0.3;
  plat4.scale.x = 0.7;
  plat4.scale.y = 0.3;
  plat5.scale.x = 0.7;
  plat5.scale.y = 0.3;
  plat6.scale.x = 0.7;
  plat6.scale.y = 0.3;
  plat7.scale.x = 0.7;
  plat7.scale.y = 0.3;
  plat8.scale.x = 0.7;
  plat8.scale.y = 0.3;
  plat9.scale.x = 0.7;
  plat9.scale.y = 0.3;
  plat10.scale.x = 0.7;
  plat10.scale.y = 0.3;
  plat11.scale.x = 0.7;
  plat11.scale.y = 0.3;
  plat12.scale.x = 0.7;
  plat12.scale.y = 0.3;
  plat13.scale.x = 0.7;
  plat13.scale.y = 0.3;

  // Create puddles
  new puddles.Sprite(580, 310, 55, 10);
  new puddles.Sprite(1026, 199, 50, 10);

  // Create hope
  new hope.Sprite(355, 210, 30);
  new hope.Sprite(470, 140, 30);

  new hope.Sprite(755, 60, 30);
  new hope.Sprite(765, 60, 30);
  new hope.Sprite(775, 60, 30);
  new hope.Sprite(785, 60, 30);

  new hope.Sprite(896, 145, 30);
  new hope.Sprite(1155, 95, 30);

  new hope.Sprite(1370, 340, 30);
  new hope.Sprite(1400, 340, 30);

  // if (charType == "girl"){
  //   new hope.Sprite(1346, 70, 30);
  //   new hope.Sprite(1501, 179, 30);
  // }
  // else{
  //   new hope.Sprite(1346, 190, 30);
  //   new hope.Sprite(1501, 239, 30);
  // }
  a1Button.pos = { x: 25, y: 45};
  a1Button.w = 40;
  a1Button.h = 40;
  a1Button.collider = "s";
  a1Button.color = "plum";
  a1Button.text = "Quit?";
  
  screen = "level2";
}
function loadPauseScreen(){
  if (screen == 'pause') return; // Prevent calling multiple times
  gameMusic = 0
  // Remove all sprites from groups
  ground.remove();
  groundlvl.removeAll()
  platforms.removeAll();
  hope.removeAll();
  puddles.removeAll();
  poop.removeAll();

  background("pink");
  fill(158, 40, 72);
  textAlign(CENTER);
  textSize(12);
  text("It seems as though you're having trouble... \nhmmm... \nperhaps we should finally make use of our shiny 'hope'...", 200, 160);

  // Add A1 button
  a1Button.pos = { x: camera.x - 52, y: 275};
  a1Button.w = 70;
  a1Button.h = 40;
  a1Button.collider = "s";
  a1Button.color = "plum";
  a1Button.text = "Use hope";

  // Add A2 button
  a2Button.pos = { x: camera.x + 52, y: 275};
  a2Button.w = 70;
  a2Button.h = 40;
  a2Button.collider = "s";
  a2Button.color = "plum";
  a2Button.text = "Give up";

  screen = "pause";
}

function loadWinScreen(){
  if (screen == 'win') return; // Prevent calling multiple times

  // Remove all sprites from groups
  ground.remove();
  groundlvl.removeAll()
  platforms.removeAll();
  hope.removeAll();
  puddles.removeAll();
  poop.removeAll();

  background("pink");
  fill(158, 40, 72);
  textAlign(CENTER);
  textSize(30);
  text("Game Complete!", 185, 40);
  textSize(20);
  text("You've finally made it to the end!\nElpis is the ancient Greek spirit of hope \nand she always has flowers with her \nShe's so proud of you for collecting so many! \nEven though it was hard (Impossible even!), \nyou didnt lose all hope. Hooray! \nThank you for playing Elpis \nPlay again?", 200, 120)
  a1Button.pos = { x: 200, y: 325};
  a1Button.w = 70;
  a1Button.h = 40;
  a1Button.collider = "s";
  a1Button.color = "plum";
  a1Button.text = "Play again";
}
function loadLoseScreen(){
  if (screen == 'lose') return; // Prevent calling multiple times

  // Remove all sprites from groups
  ground.remove();
  groundlvl.removeAll()
  platforms.removeAll();
  hope.removeAll();
  puddles.removeAll();
  poop.removeAll();

  background("pink");
  fill(158, 40, 72);
  textAlign(CENTER);
  textSize(30);
  text("Game Complete!", 185, 40);
  textSize(20);
  text("Oh my, you made it to the end, but you barely have any hope... \nElpis is the ancient Greek spirit of hope \nand she always has flowers with her\nYou didn't collect enough of her flowers, she's so sad! \nTry again and stay hopeful this time!", 200, 120)
  a1Button.pos = { x: 200, y: 325};
  a1Button.w = 70;
  a1Button.h = 40;
  a1Button.collider = "s";
  a1Button.color = "plum";
  a1Button.text = "Play again";
}

function movePlayer() {
  if ((player.colliding(ground))||(player.colliding(platforms))){
    isJumping = false;
  }
  if ((charType == "cat") || (charType == "girl")){
    if (!isJumping & kb.presses("space")) {
      player.vel.y = -6;
      isJumping = true;
    }
    if (kb.pressing("left")) {
      isWalking = true;
      player.vel.x = -3;
      player.mirror.x = true;
    } 
    else if (kb.pressing("right")) {
      isWalking = true;
      player.vel.x = 3;
      player.mirror.x = false;
    } 
    else {
      isWalking = false;
      player.vel.x = 0;
    }
  }
  else if (charType == "snail"){
    if (!isJumping & kb.presses("space")) {
      player.vel.y = -6;
      isJumping = true;
    }
    if (kb.pressing("left")) {
      isWalking = true;
      player.vel.x = -1.5;
      player.mirror.x = true;
    } 
    else if (kb.pressing("right")) {
      isWalking = true;
      player.vel.x = 1.5;
      player.mirror.x = false;
    } 
    else {
      isWalking = false;
      player.vel.x = 0;
    }
  }
  if (charType == "cat"){
    if ((!isWalking) & (!isJumping)){
      player.w = 25;
      player.h = 31.5;
    }
    if (isWalking){
      player.h = 45
    }
    if (isJumping){
      player.h = 45;
    }
  }
  if (charType == "girl"){
    if ((!isWalking) & (!isJumping)){
      player.w = 20;
      player.h = 115;
    }
    if (isWalking){
      player.h = 90
    }
    if (isJumping){
      player.h = 60;
    }
  }
  if (charType == "snail"){
    if ((!isWalking) & (!isJumping)){
      player.w = 30;
      player.h = 30;
    }
    else if (isWalking){
      player.h = 30
    }
    else if (isJumping){
      player.h = 30;
    }
  }
}
function movePlayer2() {
  if ((player.colliding(ground1))||(player.colliding(ground2))||(player.colliding(ground3))||(player.colliding(ground4))||(player.colliding(ground5))||(player.colliding(platforms))){
    isJumping = false;
  }
  if (hopeUsed){
    if (!isJumping & kb.presses("space")) {
      player.vel.y = -6;
      isJumping = true;
    }
    if (kb.pressing("left")) {
      isWalking = true;
      player.vel.x = -3;
      player.mirror.x = true;
    } 
    else if (kb.pressing("right")) {
      isWalking = true;
      player.vel.x = 3;
      player.mirror.x = false;
    } 
    else {
      isWalking = false;
      player.vel.x = 0;
  }
  }
  else{
    if ((charType == "cat") || (charType == "girl")){
      if (!isJumping & kb.presses("space")) {
        player.vel.y = -6;
        isJumping = true;
      }
      if (kb.pressing("left")) {
        isWalking = true;
        player.vel.x = -3;
        player.mirror.x = true;
      } 
      else if (kb.pressing("right")) {
        isWalking = true;
        player.vel.x = 3;
        player.mirror.x = false;
      } 
      else {
        isWalking = false;
        player.vel.x = 0;
      }
    }
    else if (charType == "snail"){
      if (!isJumping & kb.presses("space")) {
        player.vel.y = -6;
        isJumping = true;
      }
      if (kb.pressing("left")) {
        isWalking = true;
        player.vel.x = -1.5;
        player.mirror.x = true;
      } 
      else if (kb.pressing("right")) {
        isWalking = true;
        player.vel.x = 1.5;
        player.mirror.x = false;
      } 
      else {
        isWalking = false;
        player.vel.x = 0;
      }
    }
  }
  if (charType == "cat"){
    if ((!isWalking) & (!isJumping)){
      player.w = 25;
      player.h = 31.5;
    }
    if (isWalking){
      player.h = 45
    }
    if (isJumping){
      player.h = 45;
    }
  }
  if (charType == "girl"){
    if ((!isWalking) & (!isJumping)){
      player.w = 20;
      player.h = 115;
    }
    if (isWalking){
      player.h = 90
    }
    if (isJumping){
      player.h = 60;
    }
}
}

function reset() {
  if (screen == "level1"){
    screen = "reset";
    loadLevel1Screen();
  }
  else if (screen == "level2"){
    screen = "reset";
    loadLevel2Screen();
    resets ++
    a1Button.x = 25;
    a1Button.y = 45;
  }
  else if (screen == "level2E"){
    screen = "reset";
    loadLevel2ScreenE();
    resets ++
    a1Button.x = 25;
    a1Button.y = 45;
  }
  player.x = 50;
  player.y = 250;

  
  score = 0;
  
}

function level1() {

  gameState = "level1";
  
  background(bg);

  fill(158, 40, 72);
  
  if (screen == "home") {
    loadLevel1Screen();
  }

  if (screen == "level1") {
    if (player.x < 60) {
      fill(0);
      textAlign(LEFT);
      textSize(15);
      text('Use the arrow keys to move left and right', 10, 30);
    }
    if (player.x > 80 && player.x < 130) {
      fill(0);
      textSize(15);
      text('Use the space key to jump', 10, 30);
    }
    if (player.x > 395 && player.x < 495) {
      fill(0);
      textSize(15);
      text("Avoid puddles! They'll reset all your hard work!", 10, 30);
    }
    if (player.x > 830 && player.x < 1000) {
      fill(0);
      textSize(15);
      text("Whoa that flower looks AWESOME! \n Let's pick it up!", 10, 30);
    }
    if (player.x > 1230 && player.x < 1320) {
      fill(0);
      textSize(15);
      text("Ewww it's poop D: \n Lets avoid it, otherwise our flower will wilt! :(", 10, 30);
    }
  }

  if (score > 0) {
    displayScore();
  }

  if (player.collides(puddles)) {
    reset()
  }

  if (player.collides(poop)) {
    if (score > 0){
      score -= 1;
    }
  }

  if (player.x < 20) {
    player.x = 20;
  }

  if (player.x > 1790) {
    player.x = 50;
    player.y = 470;
    gameState = "switch"
    level1Complete();
  }

  if (player.y < 20) {
    player.y = 20;
  }
  camera.x = player.x + 102;
  ground.x = camera.x;
  
  if ((isWalking) & (!isJumping)){
    player.ani = "walk";
  };
  if((!isWalking) & (!isJumping)){
    player.ani = "idle";
  }
  if (isJumping){
    player.ani = "jump";
  }
}
function level2(){

  gameState = "level2";
  
  background(bg);

  fill(158, 40, 72);
  if(charType=="girl"){
    
  }
  if (screen == "switch") {
    loadLevel2Screen();
    player.x = 50;
    player.y = 250;
  }

  if (screen == "level2") {
    if ((player.x > 60 && player.x < 260) & resets == 2) {
      fill(0);
      textSize(15);
      text('Ugh this is so annoying!!!', 100, 30);
    }
    if ((player.x > 60 && player.x < 260) & resets == 4) {
      fill(0);
      textSize(15);
      text("AHH why is this so difficult ;-;", 10, 30);
    }
    if ((player.x > 60 && player.x < 260) & resets==6) {
      fill(0);
      textSize(15);
      text("This is so frustrating...", 100, 30);
    }
    if ((player.x > 60 && player.x < 260) & resets>=10) {
      fill(0);
      textSize(15);
      text("WE SHOULD GIVE UP! >:(((", 100, 30);
    }
  }
  
  if (score > 0) {
    displayScore();
  }

  if (player.collides(puddles)) {
    reset()
  }
  if (player.collides(poop)) {
    if (score > 0){
      score -= 1;
    }
  }

  if (player.x < 20) {
    player.x = 20;
  }

  if (player.x > 2005) {
    player.remove()
    level2Complete();
  }

  if (player.y < 20) {
    player.y = 20;
  }
  if (player.y > 400) {
    reset()
  }

  camera.x = player.x + 102;
  a1Button.x = camera.x - 152;
  
  if ((isWalking) & (!isJumping)){
    player.ani = "walk";
  };
  if((!isWalking) & (!isJumping)){
    player.ani = "idle";
  }
  if (isJumping){
    player.ani = "jump";
  }
}

function collect(player, hope) {
  hope.remove();
  baseScore++;
  score++;
}

function displayScore() {
  if(hopeUsed == false){
    fill(0);
    textAlign(LEFT);
    textSize(12);
    text('??? = ' + score, 342, 25);
  }
  else{
    fill(0);
    textAlign(LEFT);
    textSize(12);
    text('Hope = ' + score, 342, 25);
  }

}

function level1Complete() {
  gameState = "switch"
  levelSwitchScreen()
}
function level2Complete() {
  gameState = "end"
  if (score>=8){
    loadWinScreen();
  }
  else{
    loadLoseScreen();
  }
}

function showEndings() {
  console.log("Show endings screen - function not yet implemented.");
  // Placeholder for showing endings screen
}

function backgroundMusic(bgMusic){
  bgMusic.setVolume(0.05);
  bgMusic.play();
  bgMusic.loop();
}
function stopMusic(bgMusic){
  bgMusic.stop();
}