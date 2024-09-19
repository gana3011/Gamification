import React, { useRef, useEffect, useState } from 'react';
import Player from './Player';

const Map = () => {
  const canvasRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [mapPosition, setMapPosition] = useState({ x: -350, y: -700 });


  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext('2d');
    canvas.width = 1024;
    canvas.height = 570;

    const img = new Image();
    img.src = 'src/assets/fantasy final.png'

    img.onload = () =>{
      c.drawImage(img, mapPosition.x, mapPosition.y);
        setIsImageLoaded(true);
    }

    return () => {
    };

  }, []); 

  return (
    <div>
      <canvas ref={canvasRef} />
      <Player canvasRef={canvasRef} isImageLoaded={isImageLoaded} />
    </div>
  );
};

export default Map;
