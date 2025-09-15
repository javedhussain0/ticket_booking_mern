import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import heroImg from "../../utils/Image/Hero-img.png"
import heroImg1 from "../../utils/Image/Hero-img2.jpg"
import heroImg2 from "../../utils/Image/Hero-img-3.png"

const images = [
  heroImg,
  heroImg1,
  heroImg2
  
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${images[currentIndex]})`,
        transition: "background-image 1s ease-in-out",
      }}
    />
  );
};

export default ImageSlider;
