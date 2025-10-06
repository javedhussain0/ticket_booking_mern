import Navbar from "./Components/common/Navbar.jsx";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Auth.jsx";
import Services from "./Pages/Services.jsx";
import { useState } from "react";
import Flight from "./Components/Flight.jsx";
import Hotel from "./Components/Hotel.jsx";
import Train from "./Components/Train.jsx";
import About from "./Pages/About.jsx";
import SignUp from "./Components/loginInfo/SignUp.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";

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
      <AuthProvider>
        <BrowserRouter>
          <Container>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/services"
                element={
                  <ProtectedRoute>
                    <Services />
                  </ProtectedRoute>
                }
              />
               <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/services/flight"
                element={
                  <ProtectedRoute>
                    <Flight />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/services/hotel"
                element={
                  <ProtectedRoute>
                    <Hotel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/services/train"
                element={
                  <ProtectedRoute>
                    <Train />
                  </ProtectedRoute>
                }
              />

              <Route path="/auth" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>

            {openAuth && (
              <Login openAuth={openAuth} setOpenAuth={setOpenAuth} />
            )}
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
