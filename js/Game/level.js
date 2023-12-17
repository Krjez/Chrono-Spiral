import Game from '../engine/game.js';
import Player from './player.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Ground from './ground.js';
import Collectible from './collectible.js';
import Enemy from './enemy.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);
    
    // Create a player object and add it to the game
   // const player = new Player(this.canvas.width / 2, this.canvas.height / 2);
    const player = new Player(300, 650);
    this.addGameObject(player);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Set the game's camera target to the player
    this.camera.target = player;

    // Create platforms and add them to the game
    const platforms = [
      new Platform(220, 480, 80, 20),
      new Platform(560, 590, 100, 20),
      new Platform(200, 700, 150, 20)
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    //The whole level is bordered by "grounds", inside area is 1500x700 pixels
    //Inside area top-left corner is in 100x100, bottom-right in 1600x800
    const grounds = [
      //bottom of the level
      new Ground(0, 800, 1700, 50),
      //top of the level
      new Ground(0, 50, 1700, 50),
      //left side wall
      new Ground(50, 0, 50, 900),
      //right side wall
      new Ground(1600, 0, 50, 900)
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
    this.addGameObject(new Collectible(240, 420, 20, 20, "coin"));
    this.addGameObject(new Collectible(600, 500, 20, 20, "chest"));
    this.addGameObject(new Collectible(1000, 450, 20, 20, "coin"));
  }
  
}

// Export the Level class as the default export of this module
export default Level;
