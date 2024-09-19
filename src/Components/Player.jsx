import React, { useEffect } from "react";

const Player = ({ canvasRef, isImageLoaded }) => {
  useEffect(() => {

    if (!isImageLoaded) return;

    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");

    const playerImg = new Image();
    playerImg.src = "src/assets/_up idle.png";

    playerImg.onload = () => {
      const scale = 2;
      const width = playerImg.width * scale;
      const height = playerImg.height * scale;
      c.drawImage(
        playerImg,
        0,
        0,
        playerImg.width / 5,
        playerImg.height / 2,
        canvas.width / 2 - width / 5,
        460,
        width / 5,
        height / 2
      );
    };

    window.addEventListener("keydown", (e) => {
      console.log(e.key);
    });

    return () => {
      window.removeEventListener("keydown", (e) => {
        console.log(e.key);
      });
    };
  }, [canvasRef, isImageLoaded]);

  return null;
};

export default Player;
