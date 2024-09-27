import React, { useRef, useEffect, useState } from "react";
import boundaries, { Boundary } from "./data/collision";
import { Sprite } from "./utils";

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 570;


const MapWithImage = () => {

  const canvasRef = useRef(null);
  const requestRef = useRef();

  const keys = useRef({
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    s: { pressed: false },
  });

  useEffect(()=>{
   const canvas = canvasRef.current;
   const c = canvas.getContext("2d");
   canvas.width = CANVAS_WIDTH;
   canvas.height = CANVAS_HEIGHT;

  const image = new Image();
  image.src = "src/assets/fantasy final.png"

  const playerImg = new Image();
  playerImg.src = "src/assets/_up idle.png";


  const background = new Sprite({
    position:{
      x:-350,
      y:-700,
    },
    image:image,
    c:c,
  })

  const player = new Sprite({
    position:{
      x:400,
      y:460
    },
    image:playerImg,
    c:c,
    framesWidth:{max:4},
    framesHeight:{max:2},
    scale:2
  })

  const test = new Boundary({
    position:{
      x:300,
      y:500
    },
    c:c,
  })

 
  function animate(){
    
    c.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    
    background.draw();
    test.draw();
    
    player.draw();
    const spriteWidth = player.image.width / player.framesWidth 
    const spriteHeight = player.image.height / player.framesHeight 

 
  c.fillStyle = 'rgba(255, 0, 0, 0.3)';
  c.fillRect(
    player.position.x + (spriteWidth * player.scale * 0.4), 
    player.position.y + (spriteHeight * player.scale * 0.25), 
    spriteWidth * player.scale * 0.22, 
    spriteHeight * player.scale * 0.5 
  );
   

  if (
      player.position.x + (spriteWidth * player.scale*0.38) >= test.position.x &&
      player.position.x + (spriteWidth * player.scale * 0.4) <= test.position.x + test.width &&
      player.position.y <= test.position.y + test.height &&
      player.position.y + (spriteHeight * player.scale) >= test.position.y
    ) {
      console.log("Collision");
    }

    if(keys.current.w.pressed) {background.position.y += 3; test.position.y +=3}
    if(keys.current.s.pressed) {background.position.y -= 3; test.position.y -=3}
    if(keys.current.d.pressed) {background.position.x -= 3; test.position.x -=3}
    if(keys.current.a.pressed) {background.position.x += 3; test.position.x +=3}
    // console.log("boundary:"+(test.position.x));
    // console.log("player:"+(playerImg.width/5+playerPos.x))

    requestRef.current = requestAnimationFrame(animate);
  }

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "w":
        keys.current.w.pressed = true;
        break;

      case "s":
        keys.current.s.pressed = true;

        break;

      case "a":
        keys.current.a.pressed = true;

        break;

      case "d":
        keys.current.d.pressed = true;

        break;

      default:
        break;
    }
  };

  const handleKeyUp = (e) => {
    switch (e.key) {
      case "w":
        keys.current.w.pressed = false;
        break;

      case "s":
        keys.current.s.pressed = false;
        break;

      case "a":
        keys.current.a.pressed = false;
        break;

      case "d":
        keys.current.d.pressed = false;
        break;

      default:
        break;
    }
  };

  image.onload = animate;
  
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  
  return () =>{
    cancelAnimationFrame(requestRef.current);
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  }

  },[])
  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default MapWithImage;
