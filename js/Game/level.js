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
    const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
    this.addGameObject(player);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Set the game's camera target to the player
    this.camera.target = player;

    // Define the platform's width and the gap between platforms
    const platformWidth = 200;
    const gap = 100;

    // Create platforms and add them to the game
    const platforms = [
      new Platform(300, this.canvas.height - 150, 70, 20),
      new Platform(600, this.canvas.height - 300, 150, 20),
     // new Platform(2 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20)
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    const grounds = [
      new Ground(0, this.canvas.height - 50, 2000, 30),
      new Ground(600, this.canvas.height - 80, 50, 300)
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
    this.addGameObject(new Collectible(250, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(450, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(650, this.canvas.height - 100, 20, 20));
  }
  
}

// Export the Level class as the default export of this module
export default Level;
