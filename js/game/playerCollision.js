import Component from "../engine/component.js";
import Player from "./player.js";
import Renderer from "../engine/renderer.js";
import Ground from "./ground.js";
import GameObject from "../engine/gameobject.js";
import Game from "../engine/game.js";


class PlayerCollision extends Component
{
    constructor(player = Player)
    {
        super();
        this.player = player;
        

    }

    groundCollision()
    {
      const isStandingOnSomething = false;
      const grounds = Game.gameObjects.filter((obj) => obj instanceof Ground);
      for (const ground of grounds) {
        if (physics.isColliding(ground.getComponent(Physics))) {
          if (!this.isJumping) {
            physics.velocity.y = 0;
            physics.acceleration.y = 0;
            this.y = ground.y - this.renderer.height;
            this.isStandingOnSomething = true;
          }
        }
      }
      return 
    }

    isColliding(otherObject)
    {
        // Get the bounding boxes of both game objects.
        const [playerLeft, playerRight, playerTop, playerBottom] = this.getBoundingBox(player);
        const [otherLeft, otherRight, otherTop, otherBottom] = otherObject.getBoundingBox(otherObject);
    
        // Check if the bounding boxes overlap. If they do, return true. If not, return false.
        return playerLeft < otherRight && playerRight > otherLeft && playerTop < otherBottom && playerBottom > otherTop;
      }


    getBoundingBox(obj) {
        // Get the Renderer component of the player to get its width and height.
        const renderer = obj.gameObject.getComponent(Renderer);
        // Calculate the left, right, top, and bottom edges of the player's bounding box.
        const left = obj.gameObject.x;
        const right = obj.gameObject.x + renderer.width;
        const top = obj.gameObject.y;
        const bottom = obj.gameObject.y + renderer.height;
    
        // Return the bounding box.
        return [left, right, top, bottom];
      }





    

}
export default PlayerCollision;