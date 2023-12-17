import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import {Images} from '../engine/resources.js';

class Background  extends GameObject
{
    constructor(x, y, width, height, color = 'red')
    {
    super(x, y);
    this.addComponent(new Renderer(color, width, height, Images.background));
    }
}
export default Background;