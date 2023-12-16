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



    standingOnCollision(player)
    {
      return this.groundCollision(player) || this.platformCollision(player);
    }

    groundCollision(player)
    {
      this.isOnGround = false;
      const grounds = player.game.gameObjects.filter((obj) => obj instanceof Ground);
      for (const ground of grounds) {
        if (player.getComponent(Physics).isColliding(ground.getComponent(Physics))) {
          this.isOnGround = true;
          player.getComponent(Physics).velocity.y = 0;
          player.getComponent(Physics).acceleration.y = 0;
          player.y = ground.y - player.renderer.height;
        }
      }
      return this.isOnGround;
    }

    platformCollision(player)
    {
      this.isOnPlatform = false;
      const platforms = player.game.gameObjects.filter((obj) => obj instanceof Platform);
      for (const platform of platforms) {
        if (player.getComponent(Physics).isColliding(platform.getComponent(Physics))) {
          this.isOnPlatform = true;
          player.getComponent(Physics).velocity.y = 0;
          player.getComponent(Physics).acceleration.y = 0;
          player.y = platform.y - player.renderer.height;
        }
      }
      return this.isOnPlatform;
    }





    

}
export default PlayerCollision;