import React from "react";
import Navbar from "./Components/Navbar";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Login from "./Pages/Auth.jsx";
import { useState } from "react";


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
            <Route path="/about" exact element={<About />} />
            <Route path="/auth" exact element={<Login />} />
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
