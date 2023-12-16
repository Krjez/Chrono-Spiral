import Component from "../engine/component.js";
import Physics from "../engine/physics.js";

import Player from "./player.js";
import Ground from "./ground.js";
import Platform from "./platform.js";




class PlayerCollision extends Component
{
    constructor()
    {
      super();
        

    }

    groundCollision(player)
    {
      this.isOnGround = false;
      const grounds = player.game.gameObjects.filter((obj) => obj instanceof Ground);
      for (const ground of grounds) {
        if (player.getComponent(Physics).isColliding(ground.getComponent(Physics))) {
          this.isOnGround = true;
          console.log("on ground");
          player.getComponent(Physics).x = 0;
        }
      }
      return this.isOnGround;
    }





    

}
export default PlayerCollision;