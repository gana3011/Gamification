import React, { useRef, useEffect, useState } from "react";
import boundaries, { Boundary } from "./data/collision";
import { Sprite } from "./utils";
import Quest from "./Quest";


const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 670;

const Map = ({selectedQuest, setSelectedQuest,isCodeEditor,setIsCodeEditor,navigate}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef();

  const keys = useRef({
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    s: { pressed: false },
  });

  const offset = {
    x: -360,
    y: -700,
  };

  const mapPositionRef = useRef({ x: offset.x, y: offset.y });

  const [marker, setMarker] = useState(false);


  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const image = new Image();
    image.src = "src/assets/fantasy final.png";

    const playerUpIdle = new Image();
    playerUpIdle.src = "src/assets/_up idle.png";

    const playerDownIdle = new Image();
    playerDownIdle.src = "src/assets/_down idle.png";

    const playerLeftIdle = new Image();
    playerLeftIdle.src = "src/assets/_side idle.png";

    const playerRightIdle = new Image();
    playerRightIdle.src = "src/assets/right_side_idle_flipped.png";

    const playerUpImg = new Image();
    playerUpImg.src = "src/assets/_up walk.png";

    const playerDownImg = new Image();
    playerDownImg.src = "src/assets/_down walk.png";

    const playerLeftImg = new Image();
    playerLeftImg.src = "src/assets/_side walk.png";

    const playerRightImg = new Image();
    playerRightImg.src = "src/assets/right_side_walk_flipped.png";
 


    // const background = new Sprite({
    //   position: {
    //     x: mapPositionRef.current.x,
    //     y: mapPositionRef.current.y,
    //   },
    //   image: image,
    //   c: c,
    // });

    

    const player = new Sprite({
      position: {
        x: 390,
        y: 460,
      },
      image: playerUpIdle,
      c: c,
      framesWidth: { max: 4 },
      framesHeight: { max: 2 },
      scale: 2,
      maxFrame : 4,
      sprites:{
        up:{
          image : playerUpImg ,
          maxFrame: 5,
        },

        down:{
          image : playerDownImg,
          maxFrame: 5,
        },

        left:{
          image : playerLeftImg,
          maxFrame: 5,
        },

        right:{
          image : playerRightImg,
          maxFrame : 3,
        },
        
        upIdle:{
          image: playerUpIdle,
          maxFrame : 4,
        },

        downIdle:{
          image: playerDownIdle,
          maxFrame : 4,
        },

        leftIdle:{
          image: playerLeftIdle,
          maxFrame : 4,
        },

        rightIdle:{
          image:playerRightIdle,
          maxFrame:3,
        }


      }
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

      // background.position.x = mapPositionRef.current.x;
      // background.position.y = mapPositionRef.current.y;

      c.drawImage(image, mapPositionRef.current.x, mapPositionRef.current.y);
      

      hitbox.position.x = player.position.x + spriteWidth * player.scale * 0.4;
      hitbox.position.y =
        player.position.y + spriteHeight * player.scale * 0.26;

      boundaries.forEach((boundary) => {
        c.fillStyle = "rgba(0,0,0,0 )";
        c.fillRect(
          boundary.position.x + mapPositionRef.current.x,
          boundary.position.y + mapPositionRef.current.y,
          boundary.width,
          boundary.height
        );
      });

      player.draw();
      // player.updateFrames();
  

      c.fillStyle = "rgba(0, 0, 0, 0)";
      c.fillRect(
        hitbox.position.x,
        hitbox.position.y,
        hitbox.width,
        hitbox.height
      );

      // if(!marker && (mapPositionRef.current.x === -970.500000000231 || mapPositionRef.current.x === -502.6000000000244 || mapPositionRef.current.x === 216.60000000000088 || mapPositionRef.current.y === 204.80000000001388 )){
      //   setMarker(true);
      // }

      // else{
      //   setMarker(false);
      // }

      if(!marker && ( mapPositionRef.current.x === 216.60000000000088 )){
          setMarker(true);
          setSelectedQuest('reverse-spell');
        }

      else if(!marker && ( mapPositionRef.current.x === -970.2000000000231)){
        setMarker(true);
        setSelectedQuest('sort-ingredients');
      } 

      else{
        setMarker(false);
      }
      

      let moving = true;
      if (keys.current.w.pressed) {

        player.image = player.sprites.up.image;
        player.maxFrame = player.sprites.up.maxFrame;

        //predicting collision
        for (let i = 0; i < boundaries.length; i++) {
          let boundary = boundaries[i];
          if (
            collision(hitbox, {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y +0.6,
              },
            })
          )
          {
            moving = false;
            break;
          }
        }

        if (moving) mapPositionRef.current.y +=0.6;
      }

      // else{
      //   player.image = player.sprites.upIdle.image;
      //   player.maxFrame = player.sprites.upIdle.maxFrame
      // }

      if (keys.current.s.pressed) {
 
        player.image = player.sprites.down.image;
        player.maxFrame = player.sprites.down.maxFrame;

        //predicting collision
        for (let i = 0; i < boundaries.length; i++) {
          let boundary = boundaries[i];
          if (
            collision(hitbox, {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y -0.6,
              },
            })
          ) {
            moving = false;
            break;
          }
        }

        if (moving) mapPositionRef.current.y -=0.6;
      }


      if (keys.current.d.pressed) {

        player.image = player.sprites.right.image;
        player.maxFrame = player.sprites.right.maxFrame;
        //predicting collision
        for (let i = 0; i < boundaries.length; i++) {
          let boundary = boundaries[i];
          if (
            collision(hitbox, {
              ...boundary,
              position: {
                x: boundary.position.x -0.6,
                y: boundary.position.y,
              },
            })
          ) {
            moving = false;
            break;
          }
        }

        if (moving) mapPositionRef.current.x -=0.6;
      }
      if (keys.current.a.pressed) {

        player.image = player.sprites.left.image;
        player.maxFrame = player.sprites.left.maxFrame;
        //predicting collision
        for (let i = 0; i < boundaries.length; i++) {
          let boundary = boundaries[i];
          if (
            collision(hitbox, {
              ...boundary,
              position: {
                x: boundary.position.x +0.6,
                y: boundary.position.y,
              },
            })
          ) {
            moving = false;
            break;
          }
        }

        if (moving) mapPositionRef.current.x +=0.6;
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
          setTimeout(() => {
            player.image = player.sprites.upIdle.image;
            player.maxFrame = player.sprites.upIdle.maxFrame;
          }, 50);
          break;

        case "s":
          keys.current.s.pressed = false;
          setTimeout(()=>{
            player.image = player.sprites.downIdle.image;
            player.maxFrame = player.sprites.downIdle.maxFrame;
          },50)

          break;

        case "a":
          keys.current.a.pressed = false;
          setTimeout(()=>{
            player.image = player.sprites.leftIdle.image;
            player.maxFrame = player.sprites.leftIdle.maxFrame;
          },50)
          
          break;

        case "d":
          keys.current.d.pressed = false;
          setTimeout(()=>{
            player.image = player.sprites.rightIdle.image;
            player.maxFrame = player.sprites.rightIdle.maxFrame;
          },50)
          
          break;

        default:
          break;
      }
    };

    image.onload = playerUpIdle.onload = animate;

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // useEffect(() => {
  //   // This will log whenever the marker value changes
  //   console.log("Marker updated:", marker);
  // }, [marker]);

  return (
    <div>
      <canvas ref={canvasRef} />
      {marker && (
        <div>
          <Quest selectedQuest={selectedQuest} isCodeEditor={isCodeEditor} setIsCodeEditor={setIsCodeEditor} navigate={navigate} />
        </div>
      )}
    </div>
  );
};

export default Map;
