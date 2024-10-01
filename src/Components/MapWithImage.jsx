import React, { useRef, useEffect, useState } from "react";
import boundaries, { Boundary } from "./data/collision";
import { Sprite } from "./utils";
import { map } from "framer-motion/m";

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

  const offset = {
    x:-350,
    y:-700,
  }
 
  const mapPositionRef = useRef({ x: offset.x, y: offset.y });

  const movables = [...boundaries];
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
      x:mapPositionRef.current.x,
      y:mapPositionRef.current.y,
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


  const spriteWidth = player.image.width / player.framesWidth 
  const spriteHeight = player.image.height / player.framesHeight 

  const hitbox = {
    position:{
      x: player.position.x + (spriteWidth * player.scale *0.4),
      y: player.position.y + (spriteHeight * player.scale * 0.26),
    },
    width:spriteWidth * player.scale * 0.22,
    height:spriteHeight * player.scale * 0.48,
  }

  const collision = (rect1, rect2) => {
    return (
      //since moving the entire map, need to add map offset to collision boundaries for proper collison detection
      rect1.position.x + rect1.width >= rect2.position.x + mapPositionRef.current.x &&
      rect1.position.x <= rect2.position.x + rect2.width + mapPositionRef.current.x &&
      rect1.position.y + rect1.height >= rect2.position.y + mapPositionRef.current.y &&
      rect1.position.y <= rect2.position.y + rect2.height + mapPositionRef.current.y
    );
  };
  

  // const test = new Boundary({
  //   position:{
  //     x:400,
  //     y:500
  //   },
  //   c:c,
  // })

  function animate(){
  
    c.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)

    background.position.x = mapPositionRef.current.x;
    background.position.y = mapPositionRef.current.y;

    background.draw();

    hitbox.position.x = player.position.x + (spriteWidth * player.scale * 0.4);
hitbox.position.y = player.position.y + (spriteHeight * player.scale * 0.26);
    

    boundaries.forEach((boundary)=>{
      c.fillStyle='rgba(255,0,0,0.3)';
      c.fillRect(boundary.position.x + mapPositionRef.current.x, boundary.position.y + mapPositionRef.current.y, boundary.width, boundary.height);
      // console.log(`boundary:${boundary.position.x} hitbox:${hitbox.position.x}`);
      if(collision(hitbox,boundary)){
        console.log("collision");
      }
    })

    //  console.log(`boundary:${test.position.x} hitbox:${hitbox.position.x}`);
    // if(collision(hitbox,test)){
    //   console.log("Collision");
    // }

    // hitbox.position.x = player.position.x + spriteWidth * player.scale * 0.4;
    // hitbox.position.y = player.position.y + spriteHeight * player.scale * 0.26;
   
    player.draw();

  c.fillStyle = 'rgba(255, 0, 0, 0.3)';
  c.fillRect(hitbox.position.x , hitbox.position.y, hitbox.width, hitbox.height);
   
    if(keys.current.w.pressed){
      mapPositionRef.current.y +=1.5;
      // test.position.y +=2;
    }
    if(keys.current.s.pressed) {
      mapPositionRef.current.y -=1.5;
      // test.position.y =-2;
    }
    if(keys.current.d.pressed) {
      mapPositionRef.current.x -=1.5;
      // test.position.x -=2;
    }
    if(keys.current.a.pressed) 
    {
      mapPositionRef.current.x +=1.5;
      // test.position.x +=2;
    }
      
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