import Component from "../engine/component.js";
import Physics from "../engine/physics.js";
import Renderer from "../engine/renderer.js";

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
      for (const collectible of collectibles)
      {
        if (player.getComponent(Physics).isCollidingOmnidirectional(collectible.getComponent(Physics)))
        {
          player.score += collectible.value;
          player.emitCollectParticles(collectible);
          console.log(`Score: ${player.score}`);
          player.game.removeGameObject(collectible);
        }
      }
    }

    solidCollisions(player)
    {
      this.platformCollisionNotTop(player);
      this.groundCollisionSides(player);
    }

    groundCollisionSides(player)
    {
      const grounds = player.game.gameObjects.filter((obj) => obj instanceof Ground);
      for (const ground of grounds)
      {
        if (player.getComponent(Physics).isCollidingTop(ground.getComponent(Physics)))
        {
          player.getComponent(Physics).velocity.y = 0;
          player.getComponent(Physics).acceleration.y = 0;
          player.y = ground.y + ground.getComponent(Renderer).height;
          console.log("touched bottom of ground");
        }
        if (player.getComponent(Physics).isCollidingRight(ground.getComponent(Physics)))
        {
          player.getComponent(Physics).velocity.x = 0;
          player.getComponent(Physics).acceleration.x = 0;
          player.x = ground.x - player.getComponent(Renderer).width;
          console.log("touched ground on left");
        }
        if (player.getComponent(Physics).isCollidingLeft(ground.getComponent(Physics)))
        {
          player.getComponent(Physics).velocity.x = 0;
          player.getComponent(Physics).acceleration.x = 0;
          player.x = ground.x + ground.getComponent(Renderer).width;
          console.log("touched ground on right");
        }
      }
    }

    platformCollisionNotTop(player)
    {
      const platforms = player.game.gameObjects.filter((obj) => obj instanceof Platform);
      for (const platform of platforms)
      {
        if (player.getComponent(Physics).isCollidingTop(platform.getComponent(Physics)))
        {
          player.getComponent(Physics).velocity.y = 0;
          player.getComponent(Physics).acceleration.y = 0;
          player.y = platform.y + platform.getComponent(Renderer).height;
          console.log("touched bottom of platform");
        }
        if(player.getComponent(Physics).isCollidingLeft(platform.getComponent(Physics)))
        {
          player.getComponent(Physics).velocity.x = 0;
          player.getComponent(Physics).acceleration.x = 0;
          player.x = platform.x + platform.getComponent(Renderer).width;
          console.log("touched platform on left");
        }
        if(player.getComponent(Physics).isCollidingRight(platform.getComponent(Physics)))
        {
          player.getComponent(Physics).velocity.x = 0;
          player.getComponent(Physics).acceleration.x = 0;
          player.x = platform.x - player.getComponent(Renderer).width;
          console.log("touched platform on right");
        }
      }
    }

    standingOnCollisions(player)
    {
      return this.groundCollision(player) || this.platformCollision(player);
    }

    groundCollision(player)
    {
      this.isOnGround = false;
      const grounds = player.game.gameObjects.filter((obj) => obj instanceof Ground);
      for (const ground of grounds)
      { 
        if (player.getComponent(Physics).isCollidingBottom(ground.getComponent(Physics)))
        {
          this.isOnGround = true;
          player.getComponent(Physics).velocity.y = 0;
          player.getComponent(Physics).acceleration.y = 0;
          player.y = ground.y - player.getComponent(Renderer).height;
        }
      }
      return this.isOnGround;
    }

    platformCollision(player)
    {
      this.isOnPlatform = false;
      const platforms = player.game.gameObjects.filter((obj) => obj instanceof Platform);
      for (const platform of platforms)
      {
        if (player.getComponent(Physics).isCollidingBottom(platform.getComponent(Physics)))
        {
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