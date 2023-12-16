import Component from "../engine/component.js";
import Physics from "../engine/physics.js";
import Renderer from "../engine/renderer.js";

import Player from "./player.js";
import Ground from "./ground.js";
import Platform from "./platform.js";
import Collectible from "./collectible.js";



class PlayerCollision extends Component
{
    constructor()
    {
      super();
    }




    collectibleCollision(player)
    {
      const collectibles = player.game.gameObjects.filter((obj) => obj instanceof Collectible);
      for (const collectible of collectibles) {
        if (player.getComponent(Physics).isCollidingOmnidirectional(collectible.getComponent(Physics))) {
          player.score += collectible.value;
          player.emitCollectParticles(collectible);
          console.log(`Score: ${player.score}`);
          player.game.removeGameObject(collectible);
        }
      }
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
        if (player.getComponent(Physics).isCollidingBottom(ground.getComponent(Physics))) {
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
        if (player.getComponent(Physics).isCollidingTop(platform.getComponent(Physics))) {
          this.isOnPlatform = true;
          player.getComponent(Physics).velocity.y = 0;
          player.getComponent(Physics).acceleration.y = 0;
          //player.y = platform.y - player.renderer.height;
          player.y = platform.y + platform.getComponent(Renderer).height;
        }
      }
      return this.isOnPlatform;
    }





    

}
export default PlayerCollision;