// Importing necessary components and resources
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { Images } from '../engine/resources.js';
import Enemy from './enemy.js';
import PlayerCollision from './playerCollision.js';

import ParticleSystem from '../engine/particleSystem.js';

// Defining a class Player that extends GameObject
class Player extends GameObject {
  // Constructor initializes the game object and add necessary components
  constructor(x, y) {
    super(x, y); // Call parent's constructor
    this.renderer = new Renderer('blue', 66, 112, Images.playerIdle); // Add renderer
    this.addComponent(this.renderer);
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 })); // Add physics
    this.addComponent(new Input()); // Add input for handling user input
    this.addComponent(new PlayerCollision());

    // Initialize all the player specific properties
    this.direction = -1;
    this.lives = 3;
    this.score = 0;
    this.isStandingOnSomething = false; //TODO recheck full
    this.isJumping = false;
    this.jumpForce = 350;
    this.jumpTime = 0.3;
    this.jumpTimer = 0;
    this.isInvulnerable = false;

    //Time Lock (teleport) - Spacebar ability
    this.isTimeLockOn = false;
    this.timeLockBuffer = 0;
    this.timeLockSaved = [];
    this.timeLockCooldown = 0;

    //Shattered Time - Q "back" in time ability

    //Shattered Time - E "forward" in time ability


    //Key of Chronology - R ultimate ability
  }

  // The update function runs every frame and contains game logic
  update(deltaTime) {
    const physics = this.getComponent(Physics); // Get physics component
    const input = this.getComponent(Input); // Get input component

    const playerCollision = this.getComponent(PlayerCollision);
    
    // Handle player movement
    if (input.isKeyDown("KeyD"))
    {
      physics.velocity.x = 150;
      this.direction = -1;
    }
    else if (input.isKeyDown("KeyA"))
    {
      physics.velocity.x = -150;
      this.direction = 1;
    }
    else
    {
      physics.velocity.x = 0;
    }

    // Handle player jumping
    if (input.isKeyDown("KeyW") && this.isStandingOnSomething)
    {
      this.startJump();
      console.log("jump start");
    }

    //Faster falling down - concept for later
    if(input.isKeyDown("KeyS") && !this.isOnPlatform)
    {
      physics.velocity.y += 20;
    }

    if (this.isJumping) {
      this.updateJump(deltaTime);
    }

    if(input.isKeyDown("Space") && !this.timeLockBuffer > 0 && !this.timeLockCooldown > 0)
    {
      this.timeLockBuffer = 30;
      //small delay so the functions won't call each other repeatedly in consecutive frames as player holds space for longer than 1 frame
      if(!this.isTimeLockOn)
      {
       this.startTimeLock();
      }
      else
      {
        this.timeLockActivation();
      }
    }

    //TODO cleanup better
    if(this.timeLockBuffer > 0)
    {
      this.timeLockBuffer -= 1;
    }

    if(this.timeLockCooldown > 0)
    {
      this.timeLockCooldown -= 1;
    }
    
    

    playerCollision.collectibleCollision(this);
  
    // Handle collisions with enemies
    const enemies = this.game.gameObjects.filter((obj) => obj instanceof Enemy);
    for (const enemy of enemies) {
      if (physics.isColliding(enemy.getComponent(Physics))) {
        this.collidedWithEnemy();
      }
    }
  
    //All collisions with static objects - platforms, ground, walls etc
    playerCollision.solidCollisions(this);

    //Check if the player is standing on something
    if(!this.isJumping)
    {
      this.isStandingOnSomething = playerCollision.standingOnCollisions(this);
    }

    // Check if player has fallen off the bottom of the ground borders
    if (this.y > 1300) {
      this.resetPlayerState();
    }

    // Check if player has no lives left
    if (this.lives <= 0) {
      location.reload();
    }

    // Check if player has collected all collectibles
    if (this.score >= 3) {
      console.log('You win!');
      location.reload();
    }

    super.update(deltaTime);
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

    this.timeLockCooldown = 150;
  }



  collidedWithEnemy() {
    // Checks collision with an enemy and reduce player's life if not invulnerable
    if (!this.isInvulnerable) {
      this.lives--;
      this.isInvulnerable = true;
      // Make player vulnerable again after 2 seconds
      setTimeout(() => {
        this.isInvulnerable = false;
      }, 2000);
    }
  }

  emitCollectParticles() {
    // Create a particle system at the player's position when a collectible is collected
    const particleSystem = new ParticleSystem(this.x, this.y, 'yellow', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }

  resetPlayerState() {
    // Reset the player's state, repositioning it and nullifying movement
    this.x = 300;
    this.y = 900;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.direction = -1;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpTimer = 0;
  }

  resetGame() {
    // Reset the game state, which includes the player's state
    this.lives = 3;
    this.score = 0;
    this.resetPlayerState();
  }
}

export default Player;
