import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { Images } from '../engine/resources.js';
import PlayerCollision from './playerCollision.js';

class Player extends GameObject
{
  constructor(x, y)
  {
    super(x, y); // Call parent's constructor
    this.renderer = new Renderer('blue', 60, 100, Images.playerIdle); // Add renderer
    this.addComponent(this.renderer);
    //Adds playerCollision. Component for handling all player-based collisions
    this.playerCollision = new PlayerCollision();
    this.addComponent(this.playerCollision);
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 })); // Add physics
    this.addComponent(new Input()); // Add input for handling user input
    

    // Initialize all the player specific properties
    this.direction = 1;
    this.lives = 3;
    this.score = 0;
    this.isStandingOnSomething = false; //TODO recheck full
    this.isJumping = false;
    this.jumpForce = 300;
    this.jumpTime = 0.3;
    this.jumpTimer = 0;
    this.isInvulnerable = false;

    //Time Lock (teleport) - Spacebar ability
    this.isTimeLockOn = false;
    this.timeLockSaved = [];
    this.timeLockBuffer = 0;
    this.timeLockOnCooldown = false;

    //Shattered Time - Q "back" in time ability
    //Shattered Time - E "forward" in time ability
    this.shatteredTimeOnCooldown = false;
    this.shatteredTimeBuffer = 0;

    //Key of Chronology - R ultimate ability
  }

  // The update function runs every frame and contains game logic
  update(deltaTime)
  {
    const physics = this.getComponent(Physics); // Get physics component
    const input = this.getComponent(Input); // Get input component    

    //All collisions necessary to update every frame - almost all gameObjects
    this.playerCollision.continuousCollisions(this, this.game.time);

    //Check if the player is standing on something, doesn't trigger when launching a jump
    if(!this.isJumping)
    {
      this.isStandingOnSomething = this.playerCollision.standingOnCollisions(this, this.game.time);
    }

    //Sideways movement (A,D) and the "passive ability" Feather Fall (S)
    this.handlePlayerMovement(physics, input);

    //Jumping movement after (W) press, updating the jump
    this.handlePlayerJump(input, deltaTime);

    //Player abilities - Time Lock (Spacebar), Shattered Time (Q,E) and Key of Chronology (R)
    this.handlePlayerAbilities(input);
    
    //Handles check for amount of lives, all collectibles, reseting etc.
    this.handlePlayerStates();
    
    //Calls the parent update (update on gameObjects)
    super.update(deltaTime);
  }

  handlePlayerMovement(physics, input)
  {
    if (input.isKeyDown("KeyD"))
    {
      physics.velocity.x = 150;
      this.direction = 1;
    }
    else if (input.isKeyDown("KeyA"))
    {
      physics.velocity.x = -150;
      this.direction = -1;
    }
    else
    {
      physics.velocity.x = 0;
    }
    //Falling down can be slowed down to a certain degree - "Feather Fall"
    if(input.isKeyDown("KeyS") && !this.isOnPlatform && physics.velocity.y > 50)
    {
      physics.velocity.y -= 5;
    }
  }

  handlePlayerJump(input, deltaTime)
  {
    // Handle player jumping
    if (input.isKeyDown("KeyW") && this.isStandingOnSomething)
    {
      this.startJump();
      console.log("jump start");
    }

    if (this.isJumping) {
      this.updateJump(deltaTime);
    }
  }

  handlePlayerAbilities(input)
  {
    //Time Lock
    if(input.isKeyDown("Space") && !this.timeLockOnCooldown && !this.timeLockBuffer > 0)
    {
      this.timeLockBuffer = 30;
      if(!this.isTimeLockOn)
      {
       this.startTimeLock();
      }
      else
      {
        this.timeLockActivation();
      }
    }

    //Shattered Time
    if(input.isKeyDown("KeyQ") && this.game.time > 1 && !this.shatteredTimeBuffer > 0 && !this.shatteredTimeOnCooldown)
    {
      this.game.time -= 1;
      this.shatteredTimeBuffer = 10;
      this.shatteredTimeOnCooldown = true;
      setTimeout(() => {
        this.shatteredTimeOnCooldown = false;
      }, 10000);
    }
    if(input.isKeyDown("KeyE") && this.game.time < 3 && !this.shatteredTimeBuffer > 0 && !this.shatteredTimeOnCooldown)
    {
      this.game.time += 1;
      this.shatteredTimeBuffer = 10;
      this.shatteredTimeOnCooldown = true;
      setTimeout(() => {
        this.shatteredTimeOnCooldown = false;
      }, 10000);
    }

    //TODO Key of Chronology


    this.abilitiesCountdowns();
    
  }

  handlePlayerStates()
  {
    // Check if player has fallen off the bottom of the ground borders
    if (this.y > 1000)
    {
      this.resetPlayerState();
    }

    // Check if player has no lives left
    if (this.lives <= 0)
    {
      location.reload();
    }

    // Check if player has collected all collectibles
    if (this.score >= 7)
    {
      console.log('You win!');
      location.reload();
    }
  }

  startJump()
  {
    // Initiate a jump if the player is on a platform
    if (this.isStandingOnSomething) { 
      this.isJumping = true;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce;
      this.isStandingOnSomething = false;
    }
  }
  
  updateJump(deltaTime)
  {
    // Updates the jump progress over time
    this.jumpTimer -= deltaTime;
    if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
      this.isJumping = false;
    }
  }

  //Saves the position to which player can return
  startTimeLock()
  {
    this.isTimeLockOn = true;
    this.timeLockSaved = [this.x, this.y, this.direction, this.getComponent(Physics).velocity.x, this.getComponent(Physics).velocity.y];
    //TODO display?
  }

  //Returns player to the saved position and starts cooldown
  timeLockActivation()
  {
    this.isTimeLockOn = false;
    this.x = this.timeLockSaved[0];
    this.y = this.timeLockSaved[1];
    this.direction = this.timeLockSaved[2];
    this.getComponent(Physics).velocity.x = this.timeLockSaved[3];
    this.getComponent(Physics).velocity.y = this.timeLockSaved[4];

    this.timeLockOnCooldown = true;
    setTimeout(() => {
      this.timeLockOnCooldown = false;
    }, 5000);
    //5 seconds cooldown
  }

  abilitiesCountdowns()
  {
    if(this.timeLockBuffer > 0)
    {
      this.timeLockBuffer -= 1;
    }
    if(this.shatteredTimeBuffer > 0)
    {
      this.shatteredTimeBuffer -= 1;
    }
  }

  resetPlayerState()
  {
    // Reset the player's state, repositioning it and nullifying movement
    this.x = 400;
    this.y = 650;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.direction = 1;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpTimer = 0;
    this.isTimeLockOn = false;
    this.timeLockSaved = [];
  }

  resetGame()
  {
    // Reset the game state, which includes the player's state
    this.lives = 3;
    this.score = 0;
    this.resetPlayerState();
  }
}

export default Player;
