import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import { Images } from '../engine/resources.js';

class Collectible extends GameObject
{
  
  //Type decides the size, value and image of the collectible
  constructor(x, y, type)
  {
    super(x, y);
    //Coin collectible of value 1, small
    if(type === "coin")
    {
      this.addComponent(new Renderer("gold", 20, 20, Images.collectibleCoin));
      this.value = 1;
    }
    //Chest collectible of value 3, medium
    if(type === "chest")
    {
      this.addComponent(new Renderer("gold", 30, 30, Images.collectibleChest));
      this.value = 3;
    }
    
    //The collectibles do not move
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
  }
}

export default Collectible;