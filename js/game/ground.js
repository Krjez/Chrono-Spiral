import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";
import Physics from "../engine/physics.js";

//The "solid" ground, not changing between the different times
class Ground extends GameObject
{
    constructor(x, y, width, height, color = "black")
    {
        super(x, y);
        this.addComponent(new Renderer(color, width, height));
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
    }
}
export default Ground;