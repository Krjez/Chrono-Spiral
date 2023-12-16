// Import the required modules and classes.
import Component from './component.js';
import Renderer from './renderer.js';

// The Physics class extends Component and handles the physics behavior of a game object.
class Physics extends Component {
  // The constructor initializes the physics component with optional initial velocity, acceleration, and gravity.
  constructor(velocity = { x: 0, y: 0 }, acceleration = { x: 0, y: 0 }, gravity = { x: 0, y: 300 }) {
    super(); // Call the parent constructor.
    this.velocity = velocity; // Initialize the velocity.
    this.acceleration = acceleration; // Initialize the acceleration.
    this.gravity = gravity; // Initialize the gravity.
  }

  // The update method handles how the component's state changes over time.
  update(deltaTime) {
    // Update velocity based on acceleration and gravity.
    this.velocity.x += this.acceleration.x * deltaTime;
    this.velocity.y += (this.acceleration.y + this.gravity.y) * deltaTime;
    // Move the game object based on the velocity.
    this.gameObject.x += this.velocity.x * deltaTime;
    this.gameObject.y += this.velocity.y * deltaTime;
  }

  // The isColliding method checks if this game object is colliding with another game object.
  isColliding(otherPhysics) {
    // Get the bounding boxes of both game objects.
    const [left, right, top, bottom] = this.getBoundingBox();
    const [otherLeft, otherRight, otherTop, otherBottom] = otherPhysics.getBoundingBox();

    // Check if the bounding boxes overlap. If they do, return true. If not, return false.
    return left < otherRight && right > otherLeft && top < otherBottom && bottom > otherTop;
  }

  // The getBoundingBox method returns the bounding box of the game object in terms of its left, right, top, and bottom edges.
  getBoundingBox() {
    // Get the Renderer component of the game object to get its width and height.
    const renderer = this.gameObject.getComponent(Renderer);
    // Calculate the left, right, top, and bottom edges of the bounding box.
    const left = this.gameObject.x;
    const right = this.gameObject.x + renderer.width;
    const top = this.gameObject.y;
    const bottom = this.gameObject.y + renderer.height;

    // Return the bounding box.
    return [left, right, top, bottom];
  }

  //Better collision detection for objects standing on top of other objects (mainly meant for player)
  isCollidingBottom(otherPhysics)
  {
    const [left, right, top, bottom] = this.getBoundingBoxBottom();
    const [otherLeft, otherRight, otherTop, otherBottom] = otherPhysics.getBoundingBoxTop();

    return left < otherRight && right > otherLeft && top < otherBottom && bottom > otherTop;
  }

  isCollidingTop(otherPhysics)
  {
    const [left, right, top, bottom] = this.getBoundingBoxTop();
    const [otherLeft, otherRight, otherTop, otherBottom] = otherPhysics.getBoundingBoxBottom();

    return left < otherRight && right > otherLeft && top < otherBottom && bottom > otherTop;
  }

  isCollidingLeft(otherPhysics)
  {
    const [left, right, top, bottom] = this.getBoundingBoxLeft();
    const [otherLeft, otherRight, otherTop, otherBottom] = otherPhysics.getBoundingBoxRight();

    return left < otherRight && right > otherLeft && top < otherBottom && bottom > otherTop;
  }

  isCollidingRight(otherPhysics)
  {
    const [left, right, top, bottom] = this.getBoundingBoxRight();
    const [otherLeft, otherRight, otherTop, otherBottom] = otherPhysics.getBoundingBoxLeft();

    return left < otherRight && right > otherLeft && top < otherBottom && bottom > otherTop;
  }

  isCollidingOmnidirectional(otherPhysics)
  {
    return this.isCollidingBottom(otherPhysics) || this.isCollidingTop(otherPhysics) || this.isCollidingLeft(otherPhysics) || this.isCollidingRight(otherPhysics);
  }

  //Same idea as the in-class variant, but all the boxes are smaller and moved.
  //They are 90% of the original lenght on the side where they are supposed to touch the other object and centered.
  //And they are 20% of the original lenght on the orthogonal (horizontal/vertical) axis and moved to the object's border
  getBoundingBoxBottom()
  {
    const renderer = this.gameObject.getComponent(Renderer);

    const left = this.gameObject.x + (renderer.width * 0.05);
    const right = this.gameObject.x + (renderer.width * 0.95);
    const top = this.gameObject.y + (renderer.height * 0.8);
    const bottom = this.gameObject.y + renderer.height;

    return [left, right, top, bottom];
  }

  getBoundingBoxTop()
  {
    const renderer = this.gameObject.getComponent(Renderer);

    const left = this.gameObject.x + (renderer.width * 0.05);
    const right = this.gameObject.x + (renderer.width * 0.95);
    const top = this.gameObject.y;
    const bottom = this.gameObject.y + (renderer.height * 0.2);

    return [left, right, top, bottom];
  }

  getBoundingBoxLeft()
  {
    const renderer = this.gameObject.getComponent(Renderer);

    const left = this.gameObject.x;
    const right = this.gameObject.x + (renderer.width * 0.2);
    const top = this.gameObject.y + (renderer.height * 0.05);
    const bottom = this.gameObject.y + (renderer.height * 0.95);

    return [left, right, top, bottom];
  }

  getBoundingBoxRight()
  {
    const renderer = this.gameObject.getComponent(Renderer);
    const left = this.gameObject.x + (renderer.width * 0.8);
    const right = this.gameObject.x + renderer.width;
    const top = this.gameObject.y + (renderer.height * 0.05);
    const bottom = this.gameObject.y + (renderer.height * 0.95);
    // Return the box
    return [left, right, top, bottom];
  }

}

// The Physics class is then exported as the default export of this module.
export default Physics;
