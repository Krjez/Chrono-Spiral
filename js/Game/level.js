import Game from '../engine/game.js';
import Background from './background.js';
import Player from './player.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Ground from './ground.js';
import Collectible from './collectible.js';
import Enemy from './enemy.js';

class Level extends Game
{
  constructor(canvasId)
  {
    //Calls the constructor of the superclass (Game) with the canvas ID
    super(canvasId);

    this.addGameObject(new Background(50, 50, 1600, 800, "red"));
    
    //The whole level is bordered by "grounds", inside area is 1500x700 pixels
    //Inside area top-left corner is in 100x100, bottom-right in 1600x800
    //bottom of the level
    this.addGameObject(new Ground(0, 800, 1700, 50));
    //top of the level
    this.addGameObject(new Ground(0, 50, 1700, 50));
    //left side wall
    this.addGameObject(new Ground(50, 0, 50, 900));
    //right side wall
    this.addGameObject(new Ground(1600, 0, 50, 900));

    //Platforms across the level with array usage
    const platforms =
    [
      new Platform(220, 480, 80, 2),
      new Platform(560, 590, 400, 1),
      new Platform(200, 700, 150, 1),
      new Platform(1150, 630, 180, 2),
      new Platform(1300, 500, 150, 3)
    ];
    for (const platform of platforms)
    {
      this.addGameObject(platform);
    }

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(240, 420, "coin", 1));
    this.addGameObject(new Collectible(750, 560, "chest", 3));
    this.addGameObject(new Collectible(1000, 450, "coin", 2));
    this.addGameObject(new Collectible(1400, 250, "coin", 1));
    this.addGameObject(new Collectible(600, 220, "coin", 2));

    //Create enemies and add them to the game
    this.addGameObject(new Enemy(550, 500, "golem"));
    this.addGameObject(new Enemy(300, 450, "reaper"));

    //Creates a player and adds him to the game, defined as const to point camera at him few lines down
    const player = new Player(400, 650);
    this.addGameObject(player);
   
    // Add the player UI object to the game. Added as last - rendered always in front
    this.addGameObject(new PlayerUI(10, 10));

    // Set the game's camera target to the player
    this.camera.target = player;
  }
  
}

export default Level;
