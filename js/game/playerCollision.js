import Ground from "./ground.js";
import Physics from "../engine/physics.js";

class PlayerCollision
{

    collideGround(deltaTime)
    {
        const physics = this.getComponent(Physics);

        const grounds = this.game.gameObjects.filter((obj) => obj instanceof Ground);
        for (const ground of grounds)
        {
            if (physics.isColliding(ground.getComponent(Physics))) {
                if (!this.isJumping) {
                physics.velocity.y = 0;
                physics.acceleration.y = 0;
                this.y = ground.y - this.renderer.height;
                this.isOnPlatform = true;
                }
            }
        }
    }



    

}
export default PlayerCollision;