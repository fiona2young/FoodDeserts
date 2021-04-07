/************************************************
Food Deserts
  by Fiona Young
Overview
Uses the p5.2DAdventure.js class by Scott Kildall

Notes: 
(1) To be refined with more assets linked and interactions
************************************************/


//Global Variables
 // adventure manager 
var adventureManager;

 // p5.play
var playerSprite;
var playerAnimation;


// Preload code
function preload() {
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv');
  
  spriteCamBstand = loadAnimation('assets/camB_stand-01.png', 'assets/camB_stand-14.png');
}


// Setup code
function setup() {
  createCanvas(1280, 720);

  // create a sprite and add the 3 animations
  playerSprite = createSprite(width/9, height/1.45);
  spriteCamBstand.frameDelay = 8;
  playerSprite.addAnimation('CamBstand', spriteCamBstand);
  

  // use this to track movement from room to room in adventureManager.draw()
  adventureManager.setPlayerSprite(playerSprite);


  // load the images, go through state and interation tables, etc
  adventureManager.setup();
}


// Draw code
function draw() {
  // draws background rooms
  adventureManager.draw();

  // No avatar for Splash screen or Instructions screen
  if( adventureManager.getStateName() !== "Splash" && 
      adventureManager.getStateName() !== "Instructions" ) {
      
    // responds to keydowns
    moveSprite();

    // this is a function of p5.js, not of this sketch
    drawSprite(playerSprite);
  } 
}


// pass to adventure manager, this do the draw / undraw events
function keyPressed() {
  // toggle fullscreen mode
  if( key === 'f' ) {
    fs = fullscreen();
    fullscreen(!fs);
    return;
  }
  adventureManager.keyPressed(key);
}

function keyTyped() {
  if( key === 'z' ) {
    adventureManager.keyTyped(z);
  }
}

function mouseReleased() {
  adventureManager.mouseReleased();
}

    
//-------------- SPRITE MOVEMENT  ---------------//
function moveSprite() {
  if(keyIsDown(RIGHT_ARROW))
    playerSprite.velocity.x = 6;
  else if(keyIsDown(LEFT_ARROW))
    playerSprite.velocity.x = -6;
  else
    playerSprite.velocity.x = 0;

  if(keyIsDown(DOWN_ARROW))
    playerSprite.velocity.y = 6;
  else if(keyIsDown(UP_ARROW))
    playerSprite.velocity.y = -6;
  else
    playerSprite.velocity.y = 0;
}
    

//-------------- SUBCLASSES ---------------//


 // Call super() to call the super class's function as needed
class InstructionsScreen extends PNGRoom {

  // AdventureManager calls preload() one time, during startup
  preload() {
    // These are out variables in the InstructionsScreen class
    this.textBoxWidth = (width/6)*4;
    this.textBoxHeight = (height/6)*4; 

    // hard-coded, but this could be loaded from a file if we wanted to be more elegant
//    this.instructionsText = "Food deserts are areas that lack accessable methods of attaining affordable and healthy foods. They are important for everyone to understand. Use 'Z' to interact with things and the arrow keys to move!";
  }

//  // call the PNGRoom superclass's draw function to draw the background image
//  // and draw our instructions on top of this
//  draw() {
//    // this calls PNGRoom.draw()
//    super.draw();
//      
//    // text draw settings
//    fill(255);
//    textAlign(CENTER);
//    textSize(24);
//
//    // Draw text in a box
//    text(this.instructionsText, width/6, height/6, this.textBoxWidth, this.textBoxHeight );
//  }
}
