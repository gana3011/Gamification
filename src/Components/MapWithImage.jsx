import React, { useRef, useEffect } from "react";
import boundaries from "./data/collision";
import { Sprite } from "./utils";

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 570;
const MOVEMENT_SPEED = 3;

const MapWithImage = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef();

  const keys = useRef({
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    s: { pressed: false },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const image = new Image();
    image.src = "src/assets/fantasy final.png";

    const playerImg = new Image();
    playerImg.src = "src/assets/_up idle.png";

    const offset = {
      x: -350,
      y: -700,
    };

    const background = new Sprite({
      position: {
        x: offset.x,
        y: offset.y,
      },
      image: image,
      c: c,
    });

    const player = new Sprite({
      position: {
        x: 400,
        y: 460
      },
      image: playerImg,
      c: c,
      framesWidth: { max: 4 },
      framesHeight: { max: 2 },
      scale: 2
    });

    const movables = [...boundaries];

    function animate() {
      c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      background.draw();

      boundaries.forEach(boundary => {
        c.fillStyle = 'rgba(255, 0, 0, 0.2)';
        c.fillRect(
          boundary.position.x + offset.x,
          boundary.position.y + offset.y,
          boundary.width,
          boundary.height
        );
      });
      
      player.draw();

      if (keys.current.w.pressed) {
        background.position.y += MOVEMENT_SPEED;
        movables.forEach((movable) => {
          movable.position.y += MOVEMENT_SPEED;
        });
      }
      if (keys.current.s.pressed) {
        background.position.y -= MOVEMENT_SPEED;
        movables.forEach((movable) => {
          movable.position.y -= MOVEMENT_SPEED;
        });
      }
      if (keys.current.a.pressed) {
        background.position.x += MOVEMENT_SPEED;
        movables.forEach((movable) => {
          movable.position.x += MOVEMENT_SPEED;
        });
      }
      if (keys.current.d.pressed) {
        background.position.x -= MOVEMENT_SPEED;
        movables.forEach((movable) => {
          movable.position.x -= MOVEMENT_SPEED;
        });
      }

      requestRef.current = requestAnimationFrame(animate);
    }

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "w":
        case "ArrowUp":
          keys.current.w.pressed = true;
          break;
        case "s":
        case "ArrowDown":
          keys.current.s.pressed = true;
          break;
        case "a":
        case "ArrowLeft":
          keys.current.a.pressed = true;
          break;
        case "d":
        case "ArrowRight":
          keys.current.d.pressed = true;
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case "w":
        case "ArrowUp":
          keys.current.w.pressed = false;
          break;
        case "s":
        case "ArrowDown":
          keys.current.s.pressed = false;
          break;
        case "a":
        case "ArrowLeft":
          keys.current.a.pressed = false;
          break;
        case "d":
        case "ArrowRight":
          keys.current.d.pressed = false;
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
    }
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default MapWithImage;