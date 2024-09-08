import React, { useEffect } from "react";
import { useState } from "react";

const TextArray = ({onEnd}) => {
  const [index, setIndex] = useState(0);

  const texts = [
    "You are working intensely on your coding project",
    "You don't even notice the flow of time outside, You are only concentrated on your laptop screen",
    "After completing the module you set out to do, you look outside the window...",
    "You realise you are stranded in a forest",
    "Confused you walk a few steps...You hear a rustle",
    "Suddenly a unrecongnisable monster appear before you",
    "You are panicked and confused......SUDDENLY",
  ];

  const handleClick = () => {
    setIndex(prevIndex => {
        const newIndex = prevIndex + 1;
        if (newIndex >= texts.length) {
            onEnd();
            console.log(prevIndex)
            return prevIndex;
        }
          return newIndex;
    });
};

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div>
      <div className="story-text">{texts[index]}</div>
    </div>
  );
};

export default TextArray;
