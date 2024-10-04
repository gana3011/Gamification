export class Sprite{
    constructor({position,image,c,framesWidth = {max:1}, framesHeight = {max:1}, scale=1}){
        this.position = position;
        this.image = image;
        this.c = c;
        this.framesWidth = framesWidth.max;
        this.framesHeight = framesHeight.max;
        this.scale= scale;
        this.currentFrames = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.buffer = 22;
    }

    draw() {

        // const cropBox = {
        //   position:{
        //     x:this.currentFrames * (this.image.width / this.framesWidth),
        //     y:0,
        //   },
        //   width:this.image.width / this.framesWidth,
        //   height : this.image.height / this.framesHeight,
        // }
        const spriteWidth = this.image.width / this.framesWidth; 
        const spriteHeight = this.image.height / this.framesHeight; 

        const positionX = Math.floor(this.frame / this.buffer) % 3
        const positionY = Math.floor(this.frame / this.buffer) % 1

        this.frameX = spriteWidth * positionX;
        this.frameY = spriteHeight * positionY;
    
        this.c.drawImage(
          this.image,
          this.frameX , 
          this.frameY , 
          spriteWidth, 
          spriteHeight,
          this.position.x, 
          this.position.y, 
          spriteWidth * this.scale, 
          spriteHeight * this.scale 
        ); 
        
        // if(this.frame % this.buffer == 0){
        // if(this.frameX < this.framesWidth+1) {
        //   this.frameX++;
        //   if(this.frameX == 3) 
        //     {this.frameY ++;
        //     }
        // }
        // else {
        //   this.frameX = 0;
        //   this.frameY = 0;
        // }
        // }

        this.frame++;
      }

      // updateFrames(){

      //   if(this.currentFrames < this.framesWidth - 1)
      //   this.currentFrames ++;
        
      //   else
      //   this.currentFrames = 0;
      // }
}