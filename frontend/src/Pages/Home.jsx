import React from "react";
import ImageSlider from "../Components/ImageSlider";
import { styled } from "styled-components";
import ProductCategoryCard from "../Components/cards/ProductCategoryCard";
import { category } from "../utils/data";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const HeroWrapper = styled.div`
  position: relative;
  margin-top: 15px;
  overflow: hidden;
  height: 70vh;

  @media (max-width: 768px) {
    height: 50vh; // Adjust for smaller screens
  }
`;

const Section = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  font-family: "Arial", sans-serif;
  display: flex;
  justify-content: ${(props) => (props.center ? "center" : "space-between")};
  align-items: center;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;

  @media (max-width: 750px) {
    gap: 14px;
  }
`;

const Home = () => {
  return (
    <Container>
      <HeroWrapper>
        <ImageSlider />
      </HeroWrapper>

      <Section>
        <Title center={true}>Explore Our Services</Title>
        <CardWrapper>
          {category.map((item, index) => (
            <ProductCategoryCard key={index} category={item} />
          ))}
        </CardWrapper>
      </Section>
      {/* <>Footer</> */}
      <Box
        sx={{
          backgroundColor: "#121212",
          color: "#ffffff",
          padding: "30px 20px",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              Online Ticket Booking
            </Typography>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              What We Do
            </Typography>
            <Typography variant="body2">Features</Typography>
            <Typography variant="body2">Blog</Typography>
            <Typography variant="body2">Security</Typography>
            <Typography variant="body2">For Business</Typography>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              Who We Are
            </Typography>
            <Typography variant="body2">About Us</Typography>
            <Typography variant="body2">Careers</Typography>
            <Typography variant="body2">Brand Center</Typography>
            <Typography variant="body2">Privacy</Typography>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              Use Our Service
            </Typography>
            <Typography variant="body2">Mobile App</Typography>
            <Typography variant="body2">Desktop</Typography>
            <Typography variant="body2">Support</Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              Need Help?
            </Typography>
            <Typography variant="body2" href="">
              Contact Us
            </Typography>
            <Typography variant="body2">Help Center</Typography>
            <Typography variant="body2">Apps</Typography>
            <Typography variant="body2">Security Advisories</Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            marginTop: "20px",
            borderTop: "1px solid #333",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body2" sx={{ color: "#999" }}>
            2024 © Online Ticket Booking Service | Made by Javed Hussain
          </Typography>

          <Box>
            <IconButton
              href="https://gmailjavedhussain03226@gmail.com"
              sx={{ color: "#999" }}
            >
              <EmailIcon />
            </IconButton>
            <IconButton
              href="https://wa.me/8279797684"
              sx={{ color: "#25D366" }}
            >
              <WhatsAppIcon />
            </IconButton>
            <IconButton
              href="https://facebook.com/profile.php?id=100042511994576"
              sx={{ color: "#1877F2" }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://instagram.com/aftababbas_"
              sx={{ color: "#E4405F" }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://youtube.com/@javedhussain6887"
              sx={{ color: "#FF0000" }}
            >
              <YouTubeIcon />
            </IconButton>
          </Box>

          <Select
            value="English"
            sx={{
              color: "#fff",
              backgroundColor: "#333",
              borderRadius: "20px",
              padding: "5px 10px",
              "& .MuiSelect-icon": { color: "#fff" },
            }}
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Hindi">Hindi</MenuItem>
          </Select>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
