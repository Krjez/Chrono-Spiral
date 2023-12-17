// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  playerIdle: new Image(), // The Image instance for the player.
  playerJump: new Image(), //Testing WIP
  collectibleCoin: new Image(),
  collectibleChest: new Image(),
  enemyGolem: new Image(),
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: './resources/audio/jump.mp3', // The file path of the jump sound.
  collect: './resources/audio/collect.mp3', // The file path of the collect sound.
  // Add more audio file paths as needed
};

// Set the source of the player image.
Images.playerIdle.src = "./resources/images/player/idle.png"; // Update the image path
//Images.playerJump.src = "./resources/images/player/jump/jump.png";

//Collectibles images
Images.collectibleCoin.src = "./resources/images/collectibles/coin.png";
Images.collectibleChest.src = "./resources/images/collectibles/chest.png";

// Set the source of the enemy image.
Images.enemyGolem.src = './resources/images/enemy/golem.png'; // Update the image path

// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };
