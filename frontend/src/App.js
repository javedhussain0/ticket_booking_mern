import React from "react";
import Navbar from "./Components/Navbar";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Auth.jsx";
import Services from "./Pages/Services.jsx";
import { useState } from "react";
import Flight from "./Components/Flight.jsx"
import Hotel from "./Components/Hotel.jsx"
import Train from "./Components/Train.jsx"
import Movie from "./Components/Movie.jsx"
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const App = () => {
  const [openAuth, setOpenAuth] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth" exact element={<Login />} />
            <Route path="/services" exact element={<Services />} />
            <Route path="/services/flight" exact element={<Flight />} />
            <Route path="/services/hotel" exact element={<Hotel/>} />
            <Route path="/services/train" exact element={<Train/>} />
            <Route path="/services/movie" exact element={<Movie/>} />

            
          </Routes>
          {openAuth && (
            <Login openAuth={openAuth} setOpenAuth={setOpenAuth} />
          )}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
