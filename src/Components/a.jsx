import React, { useRef, useEffect, useState } from "react";
// import Player from "./Player";
import boundaries from "./data/collision";

const Map = () => {
  const canvasRef = useRef(null);
  const offset = {
    x: -350,
    y: -700,
  };
  const mapPositionRef = useRef({ x: offset.x, y: offset.y });
  const playerPositionRef = useRef({ x: 512, y: 460 });
  const keys = useRef({
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    s: { pressed: false },
  });
  const requestRef = useRef();

  const movables = [...boundaries];

  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 570;

    const img = new Image();
    img.src = "src/assets/fantasy final.png";

    const playerImg = new Image();
    playerImg.src = "src/assets/_up idle.png";

  
      function isCollision({ boundary }) {
        // Adjust boundary positions relative to the map's current position
        const adjustedBoundaryX = boundary.position.x + mapPositionRef.current.x + offset.x;
        const adjustedBoundaryY = boundary.position.y + mapPositionRef.current.y + offset.y;
      
        // Check if the player overlaps with the boundary (collision detection)
        return (
          playerPositionRef.current.x < adjustedBoundaryX + boundary.width &&
          playerPositionRef.current.x + 51.2 > adjustedBoundaryX && // Assuming player width is 51.2 (adjust as necessary)
          playerPositionRef.current.y < adjustedBoundaryY + boundary.height &&
          playerPositionRef.current.y + 64 > adjustedBoundaryY // Assuming player height is 64 (adjust as necessary)
        );
      }
      
    

    function animate() {
      c.clearRect(0, 0, canvas.width, canvas.height);
      c.drawImage(img, mapPositionRef.current.x, mapPositionRef.current.y);

      boundaries.forEach((boundary) => {
        let adjustedX = boundary.position.x + offset.x;
        let adjustedY =  boundary.position.y + offset.y;
        c.fillStyle = "red";
        c.fillRect(
          adjustedX,
         adjustedY,
          boundary.width,
          boundary.height
        );
        if (
          isCollision(boundary)
        ) {
          console.log("collision");
        }
      });

      const scale = 2;
      const width = playerImg.width * scale;
      const height = playerImg.height * scale;
      c.drawImage(
        playerImg,
        0,
        0,
        playerImg.width / 5,
        playerImg.height / 2,
        playerPositionRef.current.x - width / 5,
        playerPositionRef.current.y,
        width / 5,
        height / 2
      );

      if (keys.current.w.pressed) {
        mapPositionRef.current.y += 1;
        movables.forEach((movable) => {
          movable.position.y += 1;
        });
      }
      if (keys.current.s.pressed) {
        mapPositionRef.current.y -= 1;
        movables.forEach((movable) => {
          movable.position.y -= 1;
        });
      }
      if (keys.current.a.pressed) {
        mapPositionRef.current.x += 1;
        movables.forEach((movable) => {
          movable.position.x += 1;
        });
      }
      if (keys.current.d.pressed) {
        mapPositionRef.current.x -= 1;
        movables.forEach((movable) => {
          movable.position.x -= 1;
        });
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

    img.onload = playerImg.onload = animate;

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
      {/* <Player canvasRef={canvasRef} isImageLoaded={isImageLoaded} /> */}
    </div>
  );
};

export default Map;
