export class Sprite {
  constructor({
    position,
    image,
    c,
    framesWidth = { max: 1 },
    framesHeight = { max: 1 },
    scale = 1,
    maxFrame,
    buffer = 37, 
    sprites
  }) {
    this.position = position;
    this.image = image;
    this.c = c;
    this.sprites = sprites
    this.framesWidth = framesWidth.max;
    this.framesHeight = framesHeight.max;
    this.scale = scale;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.buffer = buffer;
    this.minFrame = 0;
    this.maxFrame = maxFrame;
    this.bufferCounter = 0; 
    
  }

  draw() {
    const spriteWidth = this.image.width / this.framesWidth;
    const spriteHeight = this.image.height / this.framesHeight;

    this.c.drawImage(
      this.image,
      this.frameX * spriteWidth, 
      this.frameY * spriteHeight, 
      spriteWidth,
      spriteHeight,
      this.position.x,
      this.position.y,
      spriteWidth * this.scale,
      spriteHeight * this.scale
    );

    this.updateFrames();
  }

  updateFrames() {
    this.bufferCounter++;
    if (this.bufferCounter % this.buffer === 0) {
      this.frame = (this.frame < this.maxFrame) ? this.frame + 1 : this.minFrame;

      //formula to calculate frame x and frame y
      this.frameX = this.frame % this.framesWidth;
      this.frameY = Math.floor(this.frame / this.framesWidth);

      // Reset bufferCounter after updating the frame
      this.bufferCounter = 0;
    }
  }
}
