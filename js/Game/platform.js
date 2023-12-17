import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';

class Platform extends GameObject
{
  constructor(x, y, width, color = 'gray')
  {
    super(x, y);
    this.addComponent(new Renderer(color, width, 20));
    //Platforms don't move, all values will remain zero
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
  }
}
export default Platform;