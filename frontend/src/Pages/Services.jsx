import React from "react";
import styled from "styled-components";
import { AppBar, Toolbar, Typography, Box,Grid, Button } from "@mui/material";
import TrainIcon from "@mui/icons-material/Train";
import HotelIcon from "@mui/icons-material/Hotel";
import FlightIcon from "@mui/icons-material/Flight";
import { useNavigate } from "react-router-dom";


const PageContainer = styled.div`
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 2rem;
`;

const ServiceCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin: 0.5rem 0;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0 1rem 0;
`;

const BookButton = styled(Button)`
  width: 100%;
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
`;

 

const ServicePage = () => {
  const navigate = useNavigate();
  const services = [
    {
      title: "Train Reservation",
      description: "Book your train tickets easily and conveniently.",
      icon: <TrainIcon fontSize="large" color="primary" />,
      path : "/services/train"
    },
    
    {
      title: "Hotel Booking",
      description: "Reserve the best hotels at competitive prices.",
      icon: <HotelIcon fontSize="large" color="success" />,
      path : "/services/hotel"

    },
    {
      title: "Flight Booking",
      description: "Get the best deals on flight bookings worldwide.",
      icon: <FlightIcon fontSize="large" color="error" />,
      path : "/services/flight"

    },
  ];

  return (
    <PageContainer>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Ticket Booking System
          </Typography>
        </Toolbar>
      </AppBar>

      <Content>
        <Typography variant="h4" align="center" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={6}>
          {services.map((service, index) => (
            <Grid item xs={6} sm={6} md={6} key={index}>
              <ServiceCard>
                <IconWrapper>{service.icon}</IconWrapper>
                <Title>{service.title}</Title>
                <Description >{service.description}</Description>
                <BookButton onClick={()=>navigate(service.path)} variant="contained">Book Now</BookButton>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
      </Content>
      
      <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#f5f5f5",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Online Ticket Booking Service © {new Date().getFullYear()} | Made by Javed Hussain
      </Typography>
    </Box>
    </PageContainer>
  );
};

export default ServicePage;

