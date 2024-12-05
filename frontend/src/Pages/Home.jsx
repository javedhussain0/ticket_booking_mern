import React from 'react'
import { Box, Typography } from "@mui/material";
import ImageSlider  from "../Components/ImageSlider"



const Home = () => {
  return (
    <Box sx={{ position: "relative",  marginTop : "15px" ,overflow: "hidden", height: "70vh" }}>
      <ImageSlider />
      
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
        Discover amazing  services
        </Typography>
        
        
      </Box>
    </Box>
  )
}

export default Home
