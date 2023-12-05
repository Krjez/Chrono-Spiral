import Component from './component.js';

class Animator extends Component
{
    constructor(color = 'white', width = 50, height = 50, image = {}) {
        super();
        this.color = color; // Initialize the color.
        this.width = width; // Initialize the width.
        this.height = height; // Initialize the height.
        this.image = image; // Initialize the image.
      }
    
      update(deltaTime) {
      }
      
      draw(ctx) {
      }
}