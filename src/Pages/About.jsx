import React from "react";
import styled from "styled-components";
import {
  Box,
  Typography,
  List,
  ListItem,
  Link,
  Container,
} from "@mui/material";
import Spline from "@splinetool/react-spline";
import LogoImg from "../utils/Image/Logo.png";

const LeftContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
`;
const Left = styled.div`

 flex: 1;
  position: relative;
  @media screen and (max-width: 768px) {
    display: none;


`;

const Right = styled.div`
  position: relative;
  flex: 0.9;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex: 1;
  }
`;
const Logo = styled.img`
  height: 100px;
  witdth: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const About = () => {
  return (
    <LeftContainer>
      <Left>
      <Spline
        scene="https://prod.spline.design/uJrFcwesqGzdS0gG/scene.splinecode" 
      />
      </Left>
      <Right>
        <Container>
          <Box
            sx={{
              textAlign: "center",
              py: 4,
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Logo src={LogoImg}></Logo>

            <Typography variant="h4" gutterBottom color="primary">
              About Our Ticket Booking System
            </Typography>
            <Typography variant="body1" paragraph>
              Welcome to our Ticket Booking System! We aim to simplify ticket
              booking for events, movies, and travel with a user-friendly
              platform.
            </Typography>

            <Typography variant="h5" gutterBottom color="secondary">
              Why Choose Us?
            </Typography>
            <List>
              <ListItem>Real-time ticket availability and booking.</ListItem>
              <ListItem>Secure payment options.</ListItem>
              <ListItem>24/7 customer support to assist you.</ListItem>
            </List>

            <Typography variant="h5" gutterBottom color="secondary">
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              Our mission is to make booking tickets fast, secure, and
              hassle-free, bringing convenience right to your fingertips.
            </Typography>

            <Typography variant="h5" gutterBottom color="secondary">
              Contact Us
            </Typography>
            <Typography variant="body1">
              If you have any questions, feel free to{" "}
              <Link href="/contact" underline="hover" color="primary">
                contact us
              </Link>
              .
            </Typography>
          </Box>
        </Container>
      </Right>
    </LeftContainer>
  );
};

export default About;
