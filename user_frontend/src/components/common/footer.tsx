import React from "react";
import {
  Typography,
  Container,
  Box,
  Button,
  TextField,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const handleSubscribe = () => {
    alert("Thank you for subscribing!");
  };

  return (
    <Box sx={{ bgcolor: "grey.900", color: "white", mt: 8, py: 6 }}>
      <Container>
       
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 4,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
        
          <Box sx={{ flex: "1 1 220px", minWidth: "220px" }}>
            <Typography variant="h6" gutterBottom>
              Ticket Booking
            </Typography>
            <Typography variant="body2" color="grey.400">
              Your one-stop platform for booking tickets to your favorite events.
            </Typography>
          </Box>

          <Box sx={{ flex: "1 1 220px", minWidth: "220px" }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            {["Dashboard", "About", "FAQ"].map((link) => (
              <MuiLink
                key={link}
                component={Link}
                to={`/${link.toLowerCase().replace(/\s/g, "")}`}
                underline="hover"
                color="grey.400"
                sx={{
                  display: "block",
                  mt: 1,
                  fontSize: "0.9rem",
                  "&:hover": { color: "#fdd835" },
                }}
              >
                {link}
              </MuiLink>
            ))}
          </Box>

          <Box sx={{ flex: "1 1 220px", minWidth: "220px" }}>
            <Typography variant="h6" gutterBottom>
              Newsletter
            </Typography>
            <TextField
              fullWidth
              placeholder="Your email"
              variant="filled"
              type="email"
              sx={{
                bgcolor: "grey.800",
                borderRadius: 1,
                input: { color: "white" },
                mt: 1,
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubscribe();
                }
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSubscribe}
            >
              Subscribe
            </Button>
          </Box>
        </Box>

        <Box textAlign="center" mt={4} color="grey.500" fontSize="0.9rem">
          © {new Date().getFullYear()} Ticket Booking. All rights reserved.
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
