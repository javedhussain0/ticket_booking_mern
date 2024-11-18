
import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";

const ScrollTextAnimation = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Update the scroll position
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: "200vh", // To allow scrolling
        position: "relative",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          position: "fixed", // Keep the text visible
          top: `calc(50% + ${scrollPosition / 2}px)`, // Moves text based on scroll
          left: "50%",
          transform: "translate(-50%, -50%)",
          transition: "top 0.1s ease-out", // Smooth animation
          color: "#1976d2",
        }}
      >
        Scroll and Watch Me Move!
      </Typography>
    </Box>
  );
};

export default ScrollTextAnimation;
