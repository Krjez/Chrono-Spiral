import Component from "../engine/component.js";
import Player from "./player.js";
import Ground from "./ground.js";

class PlayerCollision extends Component
{
    constructor()
    {
        super();
        this.player = this.game.gameObjects.find((obj) => obj instanceof Player);
        

    }

    update(deltaTime)
    {
        const grounds = this.game.gameObjects.filter((obj) => obj instanceof Ground);
        
    
    }

    collideGround()
    {
        
    }



    

}
export default PlayerCollision;