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

  const offset = {
    x: -350,
    y: -700,
  };

  const mapPositionRef = useRef({ x: offset.x, y: offset.y });


  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const image = new Image();
    image.src = "src/assets/fantasy final.png";

    const playerImg = new Image();
    playerImg.src = "src/assets/_up idle.png";

    const background = new Sprite({
      position: {
        x: mapPositionRef.current.x,
        y: mapPositionRef.current.y,
      },
      image: image,
      c: c,
    });

    const player = new Sprite({
      position: {
        x: 400,
        y: 460,
      },
      image: playerImg,
      c: c,
      framesWidth: { max: 4 },
      framesHeight: { max: 2 },
      scale: 2,
    });

    const spriteWidth = player.image.width / player.framesWidth;
    const spriteHeight = player.image.height / player.framesHeight;

    const hitbox = {
      position: {
        x: player.position.x + spriteWidth * player.scale * 0.4,
        y: player.position.y + spriteHeight * player.scale * 0.26,
      },
      width: spriteWidth * player.scale * 0.22,
      height: spriteHeight * player.scale * 0.48,
    };

    const collision = (rect1, rect2) => {
      return (
        //since moving the entire map, need to add map offset to collision boundaries for proper collison detection
        rect1.position.x + rect1.width >=
          rect2.position.x + mapPositionRef.current.x &&
        rect1.position.x <=
          rect2.position.x + rect2.width + mapPositionRef.current.x &&
        rect1.position.y + rect1.height >=
          rect2.position.y + mapPositionRef.current.y &&
        rect1.position.y <=
          rect2.position.y + rect2.height + mapPositionRef.current.y
      );
    };


    function animate() {
      c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      background.position.x = mapPositionRef.current.x;
      background.position.y = mapPositionRef.current.y;

      background.draw();

      hitbox.position.x = player.position.x + spriteWidth * player.scale * 0.4;
      hitbox.position.y =
        player.position.y + spriteHeight * player.scale * 0.26;

      boundaries.forEach((boundary) => {
        c.fillStyle = "rgba(255,0,0,0.3 )";
        c.fillRect(
          boundary.position.x + mapPositionRef.current.x,
          boundary.position.y + mapPositionRef.current.y,
          boundary.width,
          boundary.height
        );
      });

      player.draw();

      c.fillStyle = "rgba(255, 0, 0, 0.3)";
      c.fillRect(
        hitbox.position.x,
        hitbox.position.y,
        hitbox.width,
        hitbox.height
      );

      let moving = true;
      if (keys.current.w.pressed) {
        //predicting collision
        for (let i = 0; i < boundaries.length; i++) {
          let boundary = boundaries[i];
          if (
            collision(hitbox, {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y +1.8,
              },
            })
          ) {
            moving = false;
            console.log("collision");
            break;
          }
        }

        if (moving) mapPositionRef.current.y +=1.8;
      }
      if (keys.current.s.pressed) {
        //predicting collision
        for (let i = 0; i < boundaries.length; i++) {
          let boundary = boundaries[i];
          if (
            collision(hitbox, {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y -1.8,
              },
            })
          ) {
            moving = false;
            console.log("collision");
            break;
          }
        }

        if (moving) mapPositionRef.current.y -=1.8;
      }
      if (keys.current.d.pressed) {
        //predicting collision
        for (let i = 0; i < boundaries.length; i++) {
          let boundary = boundaries[i];
          if (
            collision(hitbox, {
              ...boundary,
              position: {
                x: boundary.position.x -1.8,
                y: boundary.position.y,
              },
            })
          ) {
            moving = false;
            console.log("collision");
            break;
          }
        }

        if (moving) mapPositionRef.current.x -=1.8;
      }
      if (keys.current.a.pressed) {
        //predicting collision
        for (let i = 0; i < boundaries.length; i++) {
          let boundary = boundaries[i];
          if (
            collision(hitbox, {
              ...boundary,
              position: {
                x: boundary.position.x +1.8,
                y: boundary.position.y,
              },
            })
          ) {
            moving = false;
            break;
          }
        }

        if (moving) mapPositionRef.current.x +=1.8;
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

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default MapWithImage;
