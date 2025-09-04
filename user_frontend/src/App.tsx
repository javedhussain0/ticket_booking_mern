import styled from "styled-components";
import { 
  BrowserRouter, 
  Route, 
  Routes 
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard"
import About from "./pages/About";
import Profile from "./pages/Profile/profile"
import Login from "./pages/Auth/Login"
import Nav from "./components/common/Nav"
import Footer from "./components/common/footer"

const AppContainer = styled.div``;

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
      <Nav/>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Login />} />
      
      
        </Routes>
      <Footer/>

      </BrowserRouter>
    </AppContainer>
    
  );
}

export default App;
