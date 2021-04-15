/************************************************
Food Deserts
  by Fiona Young
Overview
Uses the p5.2DAdventure.js class by Scott Kildall

Notes: 
(1) To be refined with more assets linked and interactions
************************************************/


//Global Variables
 // managers
var adventureManager;
var clickablesManager;
var clickables;

 // p5.play
var Cam;
var sizeChange;

 // indexes into the clickable array (constants)
const playGameIndex = 0;


// Preload code
function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv', 'data/clickableLayout.csv');
  
  spriteCamBstand = loadAnimation('assets/camB_stand-01.png', 'assets/camB_stand-14.png');
  spriteCamBwalk = loadAnimation('assets/camB_walk-01.png', 'assets/camB_walk-04.png');
  spriteCamSstand = loadAnimation('assets/camS_stand-01.png', 'assets/camS_stand-14.png');
  spriteCamSwalk = loadAnimation('assets/camS_walk-01.png', 'assets/camS_walk-04.png');
}


// Setup code
function setup() {
  createCanvas(1280, 720);
    
  // setup the clickables
  clickables = clickablesManager.setup();

  // create a sprite and the animations
  Cam = createSprite(width/9, height/1.45);
  spriteCamBstand.frameDelay = 6;
  spriteCamBwalk.frameDelay = 4;
  spriteCamSstand.frameDelay = 6;
  spriteCamSwalk.frameDelay = 4;
  Cam.addAnimation('CamBstand', spriteCamBstand);
  Cam.addAnimation('CamBwalk', spriteCamBwalk);
  Cam.addAnimation('CamSstand', spriteCamSstand);
  Cam.addAnimation('CamSwalk', spriteCamSwalk);

  // use this to track movement from room to room in adventureManager.draw()
  adventureManager.setPlayerSprite(Cam);
    
  // managing button visibility
  adventureManager.setClickableManager(clickablesManager);
    
  // load the images, go through state and interation tables, etc
  adventureManager.setup();
    
  // setup additional info about p5.clickables
  setupClickables();
}


// Draw code
function draw() {
  // draw background rooms
  adventureManager.draw();

  // draw p5.clickables
  clickablesManager.draw();
    
  // no avatar for select screens
  if( adventureManager.getStateName() !== "Splash" && 
      adventureManager.getStateName() !== "Instructions" ) {
      
    // responds to keydowns
    moveSprite();

    // this is a function of p5.js, not of this sketch
    drawSprite(Cam);
  } 
}

// pass to adventure manager to draw/undraw events
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

   
//-------------- SPRITE MOVEMENT  ---------------//

function moveSprite() {
  if(keyIsDown(RIGHT_ARROW)) {
    if(adventureManager.getStateName() == "Learning" && 
      adventureManager.getStateName() == "LearningC" && 
      adventureManager.getStateName() == "Learning2" && 
      adventureManager.getStateName() == "Learning2C" && 
      adventureManager.getStateName() == "SolutionSelect" && 
      adventureManager.getStateName() == "Resources" && 
      adventureManager.getStateName() == "End" )
        {
          Cam.changeAnimation('CamBwalk');
          Cam.mirrorX(1);
          Cam.velocity.x = 4;
        }
    else {
      Cam.changeAnimation('CamSwalk');
      Cam.mirrorX(1);
      Cam.velocity.x = 4;
    }
  }
  else if(keyIsDown(LEFT_ARROW)) {
    if(adventureManager.getStateName() == "Learning" && 
      adventureManager.getStateName() == "LearningC" && 
      adventureManager.getStateName() == "Learning2" && 
      adventureManager.getStateName() == "Learning2C" && 
      adventureManager.getStateName() == "SolutionSelect" && 
      adventureManager.getStateName() == "Resources" && 
      adventureManager.getStateName() == "End" )
        {
          Cam.changeAnimation('CamBwalk');
          Cam.mirrorX(-1);
          Cam.velocity.x = -4;
        }
    else {
      Cam.changeAnimation('CamSwalk');
      Cam.mirrorX(-1);
      Cam.velocity.x = 4;
    }
  }
  else if(keyIsDown(DOWN_ARROW)) {
    if(adventureManager.getStateName() == "Learning" && 
      adventureManager.getStateName() == "LearningC" && 
      adventureManager.getStateName() == "Learning2" && 
      adventureManager.getStateName() == "Learning2C" && 
      adventureManager.getStateName() == "SolutionSelect" && 
      adventureManager.getStateName() == "Resources" && 
      adventureManager.getStateName() == "End" )
        {
          Cam.changeAnimation('CamBstand');
          Cam.mirrorX(0);
        }
    else {
      Cam.changeAnimation('CamSwalk');
      Cam.mirrorX(1);
      Cam.velocity.x = 4;
    }
  }
  else if(keyIsDown(UP_ARROW)) {
    if(adventureManager.getStateName() == "Learning" && 
      adventureManager.getStateName() == "LearningC" && 
      adventureManager.getStateName() == "Learning2" && 
      adventureManager.getStateName() == "Learning2C" && 
      adventureManager.getStateName() == "SolutionSelect" && 
      adventureManager.getStateName() == "Resources" && 
      adventureManager.getStateName() == "End" )
        {
          Cam.changeAnimation('CamBstand');
          Cam.velocity.y = -0;
        }
    else {
      Cam.changeAnimation('CamSwalk');
      Cam.mirrorX(1);
      Cam.velocity.x = 4;
    }
  }
  else {
    if(adventureManager.getStateName() == "Learning" && 
      adventureManager.getStateName() == "LearningC" && 
      adventureManager.getStateName() == "Learning2" && 
      adventureManager.getStateName() == "Learning2C" && 
      adventureManager.getStateName() == "SolutionSelect" && 
      adventureManager.getStateName() == "Resources" && 
      adventureManager.getStateName() == "End" )
        {
          Cam.changeAnimation('CamBstand');
          Cam.velocity.x = 0;
          Cam.velocity.y = 0;
        }
    else {
      Cam.changeAnimation('CamSstand');
      Cam.velocity.x = 0;
      Cam.velocity.y = 0;
    }
  }
}
 

//-------------- CLICKABLES ---------------//

function setupClickables() {
  // same effects for all clickables
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].onPress = clickableButtonPressed; 
  }
}

// cursor change when mouse over
clickableButtonHover = function () {
  cursor(HAND);
}

// leave as is when mouse off
clickableButtonOnOutside = function () {
  this.color = "#F7F7F7";
}

clickableButtonPressed = function() {
  // trigger state change
  adventureManager.clickablePressed(this.name); 
}


//-------------- SUBCLASSES ---------------//

 // Call super() to call the super class's function as needed
class InstructionsScreen extends PNGRoom {

  // AdventureManager calls preload() one time, during startup
  preload() {
    // These are out variables in the InstructionsScreen class
    this.textBoxWidth = (width/6)*4;
    this.textBoxHeight = (height/6)*4; 
  }

}
