import Game from '../engine/game.js';
import Player from './player.js';
//import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Ground from './ground.js';
import Collectible from './collectible.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);
    
    // Create a player object and add it to the game
   // const player = new Player(this.canvas.width / 2, this.canvas.height / 2);
    const player = new Player(300, 900);
    this.addGameObject(player);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Set the game's camera target to the player
    this.camera.target = player;

    // Create platforms and add them to the game
    const platforms = [
      new Platform(500, 950, 70, 20),
      new Platform(800, 800, 150, 20),
      new Platform(200, 700, 150, 30)
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    //The whole level is bordered by "grounds", inside area is 3000x1000 pixels
    //Inside area top-left corner is in 100x100, bottom-right in 3100x1100
    const grounds = [
      //bottom of the level
      new Ground(0, 1100, 3200, 50),
      //top of the level
      new Ground(0, 50, 3200, 50),
      //left side wall
      new Ground(50, 0, 50, 1200),
      //right side wall
      new Ground(3100, 0, 50, 1200)
    ];
    for(const ground of grounds)
    {
      this.addGameObject(ground);
    }

    // Create enemies and add them to the game
    //this.addGameObject(new Enemy(50, this.canvas.height - 90));
    //this.addGameObject(new Enemy(platformWidth + gap + 50, this.canvas.height - 90));
    //this.addGameObject(new Enemy(2 * (platformWidth + gap) + 50, this.canvas.height - 90));

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(270, 650, 20, 20));
    this.addGameObject(new Collectible(600, 800, 20, 20));
    this.addGameObject(new Collectible(1000, 1000, 20, 20));
  }
  
}

// Export the Level class as the default export of this module
export default Level;
