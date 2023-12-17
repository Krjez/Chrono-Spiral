// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  background: new Image(),
  playerIdle: new Image(), // The Image instance for the player.
  playerJump: new Image(), //Testing WIP
  collectibleCoin: new Image(),
  collectibleChest: new Image(),
  enemyGolem: new Image(),
  enemyReaper: new Image()
};

Images.background.src = "./resources/images/background/background.png";

//Sets the source of the player image.
Images.playerIdle.src = "./resources/images/player/idle.png";
//Images.playerJump.src = "./resources/images/player/jump/jump.png";

//Collectibles images path
Images.collectibleCoin.src = "./resources/images/collectibles/coin.png";
Images.collectibleChest.src = "./resources/images/collectibles/chest.png";

//Enemy images path set
Images.enemyGolem.src = "./resources/images/enemy/golem.png";
Images.enemyReaper.src = "./resources/images/enemy/reaper.png";

// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images };
