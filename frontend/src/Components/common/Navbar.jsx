import { useState, useEffect } from "react";
import styled from "styled-components";
import LogoImg from "../../utils/Image/Logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { Avatar, Menu, MenuItem, Divider, Button } from "@mui/material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px black;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
`;

const Logo = styled.img`
  height: 70px;
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navlink = styled(NavLink)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = async () => {
    await signOut(auth);
    setAnchorEl(null);
    navigate("/");
  };

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo>
          <Logo src={LogoImg} alt="logo" />
        </NavLogo>

        <MobileIcon>
          <FaBars style={{ color: "black" }} />
        </MobileIcon>

        <NavItems>
          <Navlink to="/">Home</Navlink>
          <Navlink to="/services">Services</Navlink>
          <Navlink to="/about">About</Navlink>
        </NavItems>

        <ButtonContainer>
          {user ? (
            <>
              <Avatar
                src={user?.photoURL || ""}
                onClick={handleAvatarClick}
                sx={{
                  cursor: "pointer",
                  bgcolor: "#1976d2",
                  color: "white",
                }}
              >
                {user?.displayName
                  ? user.displayName[0].toUpperCase()
                  : user?.email[0].toUpperCase()}
              </Avatar>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem disabled>
                  {user?.displayName || "No Name"}
                </MenuItem>
                <MenuItem disabled>{user?.email}</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => navigate("/auth")}
              >
                Login
              </Button>
             
            </>
          )}
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
