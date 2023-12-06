import React, { useState, useEffect } from "react";
import "../App.css";

import gameboy from "../Elements/gameboy.png";
import Nintendo from "../Elements/Nintendo.png";
import PS2 from "../Elements/PS2.png";
import Xbox from "../Elements/Xbox.png";
import PS3 from "../Elements/PS3.png";

const imageArray = [gameboy, Nintendo, PS2, Xbox, PS3]; // Replace with your images

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (currentImageIndex) => (currentImageIndex + 1) % imageArray.length
      );
    }, 1000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      <img
        src={imageArray[currentImageIndex]}
        alt="Slideshow"
        className="slides-show"
      />
    </div>
  );
};
export default Slideshow;
