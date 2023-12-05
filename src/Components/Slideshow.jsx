import React, { useState, useEffect } from "react";
import "../App.css";

import pixel2 from "../Elements/pixelbg2.jpeg";
import sky from "../Elements/darksky.jpeg";
import dawn from "../Elements/dawn.jpeg";

const imageArray = [pixel2, sky, dawn]; // Replace with your images

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (currentImageIndex) => (currentImageIndex + 1) % imageArray.length
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      <img
        src={imageArray[currentImageIndex]}
        alt="Slideshow"
        className="slide-image"
      />
    </div>
  );
};

export default Slideshow;
