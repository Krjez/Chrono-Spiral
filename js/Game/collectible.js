// Import the GameObject class from the 'engine' directory
import GameObject from '../engine/gameobject.js';

// Import the Renderer class from the 'engine' directory
import Renderer from '../engine/renderer.js';

// Import the Physics class from the 'engine' directory
import Physics from '../engine/physics.js';

import { Images } from '../engine/resources.js';

// Define a new class, Collectible, which extends (i.e., inherits from) GameObject
class Collectible extends GameObject {
  
  // Define the constructor for this class. The constructor takes five arguments:
  // - x and y coordinates
  // - width and height of the collectible
  //Added - value and image of the collectible
  constructor(x, y, width, height, type) {
    
    // Call the constructor of the superclass (GameObject) with the x and y coordinates
    super(x, y);
    if(type === "coin")
    {
      this.addComponent(new Renderer("gold", width, height, Images.collectibleCoin));
      this.value = 1;
    }
    if(type === "chest")
    {
      this.addComponent(new Renderer("gold", width, height, Images.collectibleChest));
      this.value = 3;
    }
    

    
    // Add a new Physics component to this collectible. The physics component is responsible for handling the physics
    // (like movement, collision detection, etc.). In this case, the collectible doesn't move,
    // so the initial velocity, acceleration, and friction are all set to zero.
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));

    this.tag = 'collectible';

  }
}

// Export the Collectible class as the default export of this module
export default Collectible;
