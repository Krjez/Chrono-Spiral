import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import {Images} from '../engine/resources.js';

class Enemy extends GameObject {

  constructor(x, y, type)
  {
    super(x, y);
    //Enemy golem - big slow monster, hard-hitting
    if(type === "golem")
    {
      this.addComponent(new Renderer('green', 90, 90, Images.enemyGolem));
      this.addComponent(new Physics({ x: 50, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
      this.type = type;
      this.movementDistance = 0;
      this.movementLimit = 300;
    }
    //Grim Reaper - smaller, flying, can move through platforms, will follow player in vicinity
    if(type == "reaper")
    {
      this.addComponent(new Renderer('green', 30, 60, Images.enemyReaper));
      this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
      this.type = type;
      this.movementDistance = 0;
      this.movementLimit = 100;
    }
    //Variables related to enemy's movement
    this.direction = 1;
    this.movingRight = true;
    this.followsPlayer = false;
  }

  //Runs every frame (deltaTime is the time from last frame)
  update(deltaTime)
  {
    if(this.type === "golem")
    {
      this.golemMovement(deltaTime);
    }
    if(this.type === "reaper")
    {
      this.reaperMovement(deltaTime);
    }
    //Calls parent (gameObject) update
    super.update(deltaTime);
  }

  golemMovement(deltaTime)
  {
    const physics = this.getComponent(Physics);
    if(this.movingRight)
    {
      //Moving right until hits limit
      if(this.movementDistance < this.movementLimit)
      {
        //Updates the distance travelled over time
        this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
      }
      else
      {
        this.movingRight = false;
        this.movementDistance = 0;
        physics.velocity.x = -physics.velocity.x;
        this.direction = -1;
        console.log("limit, shoulda move left now");
      }
    }
    else
    {
      if (this.movementDistance < this.movementLimit)
      {
        this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
      }
      else
      {
        this.movingRight = true;
        this.movementDistance = 0;
        physics.velocity.x = -physics.velocity.x;
        this.direction = 1;
        console.log("limit, shoulda move right now");
      }
    }
  }

  reaperMovement(deltaTime)
  {

  }
}

// Export the Enemy class as the default export of this module
export default Enemy;
