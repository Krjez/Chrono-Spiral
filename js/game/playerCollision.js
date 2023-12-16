import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";
import Physics from "../engine/physics.js";
import Ground from "./ground.js";
import Platform from "./platform.js";



class PlayerCollision extends GameObject
{
    constructor(x, y)
    {
        super(x, y);
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
        this.addComponent(new Renderer(50, 50));
        

    }

    update()
    {

    }

    groundCollision()
    {
     console.log("vd");

      this.isOnGround = false;
      const grounds = this.game.gameObjects.filter((obj) => obj instanceof Ground);
      for (const ground of grounds) {
        if (this.getComponent(Physics).isColliding(ground.getComponent(Physics))) {
          this.isOnGround = true;
      this.y = ground.y - this.renderer.height;
        }
      }
      return this.isOnGround;
    }





    

}
export default PlayerCollision;