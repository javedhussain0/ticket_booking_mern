import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Avatar,
  Drawer,
  useTheme,
  Divider,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { useUserStore } from "../../stores/userStore";
import LogoImg from "../../assets/icons/Logo.png";

const Nav = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUserStore();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "About", path: "/about" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "#003580", // Dark blue background
          color: "#ffffff", // White text
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          zIndex: 1000,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1.2 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <img
              src={LogoImg}
              alt="Logo"
            style={{ height: 40, cursor: "pointer",background: "#003580"  }}
              onClick={() => navigate("/")}
            />
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ cursor: "pointer", color: "#ffffff" }}
              onClick={() => navigate("/")}
            >
              Ticket Booking
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                onClick={() => navigate(link.path)}
                sx={{
                  color: "#ffffff",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)"
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            {isLoggedIn ? (
              <Avatar
                src={user?.profilePic}
                sx={{
                  cursor: "pointer",
                  border: `2px solid rgba(255,255,255,0.5)`,
                  "&:hover": { borderColor: "#ffffff" },
                }}
                onClick={() => navigate("/profile")}
              />
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/signUp")}
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 2.5,
                    color: "#ffffff",
                    borderColor: "#ffffff",
                    "&:hover": { 
                      background: "rgba(255,255,255,0.1)",
                      borderColor: "#ffffff"
                    },
                    display: { xs: "none", sm: "block" }
                  }}
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    background: "#ffffff",
                    color: "#003580",
                    "&:hover": { 
                      background: "rgba(255,255,255,0.9)",
                      color: "#003580"
                    },
                    display: { xs: "none", sm: "block" }
                  }}
                >
                  Sign In
                </Button>
              </>
            )}

            {/* Hamburger for Mobile */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { xs: "block", md: "none" }, ml: 1, color: "#ffffff" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, p: 2, bgcolor: "#003580", height: "100%", color: "#ffffff" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={700} color="#ffffff">
              Menu
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#ffffff" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.3)" }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                fullWidth
                onClick={() => {
                  navigate(link.path);
                  setDrawerOpen(false);
                }}
                sx={{
                  justifyContent: "flex-start",
                  color: "#ffffff",
                  fontWeight: 600,
                  textTransform: "none",
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)"
                  }
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {!isLoggedIn && (
            <Box mt={4} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ 
                  background: "#ffffff", 
                  color: "#003580",
                  "&:hover": { 
                    background: "rgba(255,255,255,0.9)",
                    color: "#003580"
                  }
                }}
                onClick={() => {
                  navigate("/login");
                  setDrawerOpen(false);
                }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ 
                  borderColor: "#ffffff", 
                  color: "#ffffff",
                  "&:hover": { 
                    borderColor: "#ffffff",
                    backgroundColor: "rgba(255,255,255,0.1)"
                  }
                }}
                onClick={() => {
                  navigate("/signUp");
                  setDrawerOpen(false);
                }}
              >
                Register
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Nav;