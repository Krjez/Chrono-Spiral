import Component from "../engine/component.js";
import Physics from "../engine/physics.js";
import Renderer from "../engine/renderer.js";
import Collectible from "./collectible.js";
import ParticleSystem from '../engine/particleSystem.js';
import Enemy from "./enemy.js";
import Ground from "./ground.js";
import Platform from "./platform.js";


class PlayerCollision extends Component
{
    constructor()
    {
      super();
    }

    //All collisions that need to be handled on each frame during the specific "time"
    continuousCollisions(player, time)
    {
      this.collectibleCollision(player, time);
      this.enemyCollision(player, time);
      this.platformCollisionNotTop(player, time);
      this.groundCollisionNotTop(player);
    }

    //Checks if player can jump, while simultaneously handles collisions where player stands on top of platform/ground
    standingOnCollisions(player, time)
    {
      return this.groundCollisionOnTop(player) || this.platformCollisionOnTop(player, time);
    }

    collectibleCollision(player, time)
    {
      const collectibles = player.game.gameObjects.filter((obj) => obj instanceof Collectible);
      for (const collectible of collectibles)
      {
        if (collectible.time == time && player.getComponent(Physics).isCollidingOmnidirectional(collectible.getComponent(Physics)))
        {
          player.score += collectible.value;
          this.emitCollectParticles(player, collectible);
          player.game.removeGameObject(collectible);
        }
      }
    }

    emitCollectParticles(player, collectible)
    {
      // Create a particle system at the (changed:) collectibles's position when it is is collected
      const particleSystem = new ParticleSystem(collectible.x, collectible.y, 'yellow', 20, 1, 0.5);
      player.game.addGameObject(particleSystem);
    }

    enemyCollision(player, time)
    {
      const enemies = player.game.gameObjects.filter((obj) => obj instanceof Enemy);
      for (const enemy of enemies)
      {//enemy.time == time && 
        if (player.getComponent(Physics).isCollidingOmnidirectional(enemy.getComponent(Physics)))
        {
          this.collidedWithEnemy(player);
        }
      }
    }

    collidedWithEnemy(player)
    {
      // Checks collision with an enemy and reduce player's life if not invulnerable
      if (!player.isInvulnerable) {
        player.lives--;
        player.isInvulnerable = true;
        // Make player vulnerable again after 2 seconds
        setTimeout(() => {
          player.isInvulnerable = false;
        }, 2000);
        this.emitEnemyHitParticles(player);
      }
    }

    emitEnemyHitParticles(player)
    {
      // Create a particle system at the (changed:) collectibles's position when it is is collected
      const particleSystem = new ParticleSystem(player.x + player.getComponent(Renderer).width/2, player.y + player.getComponent(Renderer).height/2, 'red', 20, 1, 0.5);
      player.game.addGameObject(particleSystem);
      setTimeout(() => {
        player.game.removeGameObject(particleSystem);
      }, 300);
    }

    groundCollisionNotTop(player)
    {
      const grounds = player.game.gameObjects.filter((obj) => obj instanceof Ground);
      for (const ground of grounds)
      {
        if (player.getComponent(Physics).isCollidingTop(ground.getComponent(Physics)))
        {
          player.getComponent(Physics).velocity.y = 0;
          player.getComponent(Physics).acceleration.y = 0;
          player.y = ground.y + ground.getComponent(Renderer).height;
        }
        if (player.getComponent(Physics).isCollidingRight(ground.getComponent(Physics)))
        {
          player.getComponent(Physics).velocity.x = 0;
          player.getComponent(Physics).acceleration.x = 0;
          player.x = ground.x - player.getComponent(Renderer).width;
        }
        if (player.getComponent(Physics).isCollidingLeft(ground.getComponent(Physics)))
        {
          player.getComponent(Physics).velocity.x = 0;
          player.getComponent(Physics).acceleration.x = 0;
          player.x = ground.x + ground.getComponent(Renderer).width;
        }
      }
    }

    platformCollisionNotTop(player, time)
    {
      const platforms = player.game.gameObjects.filter((obj) => obj instanceof Platform);
      for (const platform of platforms)
      {
        if (platform.time == time && player.getComponent(Physics).isCollidingTop(platform.getComponent(Physics)))
        {
          player.getComponent(Physics).velocity.y = 0;
          player.getComponent(Physics).acceleration.y = 0;
          player.y = platform.y + platform.getComponent(Renderer).height;
        }
        if(platform.time == time && player.getComponent(Physics).isCollidingLeft(platform.getComponent(Physics)))
        {
          player.getComponent(Physics).velocity.x = 0;
          player.getComponent(Physics).acceleration.x = 0;
          player.x = platform.x + platform.getComponent(Renderer).width;
        }
        if(platform.time == time && player.getComponent(Physics).isCollidingRight(platform.getComponent(Physics)))
        {
          player.getComponent(Physics).velocity.x = 0;
          player.getComponent(Physics).acceleration.x = 0;
          player.x = platform.x - player.getComponent(Renderer).width;
        }
      }
    }

    groundCollisionOnTop(player)
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

    platformCollisionOnTop(player, time)
    {
      this.isOnPlatform = false;
      const platforms = player.game.gameObjects.filter((obj) => obj instanceof Platform);
      for (const platform of platforms)
      {
        if (platform.time == time && player.getComponent(Physics).isCollidingBottom(platform.getComponent(Physics)))
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