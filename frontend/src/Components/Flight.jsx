import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Flight = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [tripType, setTripType] = useState("one-way");
  const [travelers, setTravelers] = useState(1);
  const [flights, setFlights] = useState([]);

  // Mock search flight handler
  const handleSearchFlights = () => {
    // Replace this mock data with API integration if needed
    const mockFlights = [
      { id: 1, airline: "Airline A", from, to, price: "$120", departure: departureDate },
      { id: 2, airline: "Airline B", from, to, price: "$150", departure: departureDate },
      { id: 3, airline: "Airline C", from, to, price: "$200", departure: departureDate },
    ];
    setFlights(mockFlights);
  };

  const handleBookFlight = (flight) => {
    alert(`Flight booked with ${flight.airline} for ${flight.price}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: 3, maxWidth: 800, margin: "auto" }}>
        <Typography variant="h4" gutterBottom align="center">
          Flight Booking Page
        </Typography>

        {/* Flight Booking Form */}
        <Box sx={{ marginBottom: 4 }}>
          <TextField
            label="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            fullWidth
            margin="normal"
          />
          <DatePicker
            label="Departure Date"
            value={departureDate}
            onChange={(newValue) => setDepartureDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
          {tripType === "round-trip" && (
            <DatePicker
              label="Return Date"
              value={returnDate}
              onChange={(newValue) => setReturnDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
          )}
          <FormControl fullWidth margin="normal">
            <InputLabel>Number of Travelers</InputLabel>
            <Select value={travelers} onChange={(e) => setTravelers(e.target.value)}>
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl component="fieldset" margin="normal">
            <RadioGroup
              row
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
            >
              <FormControlLabel value="one-way" control={<Radio />} label="One-Way" />
              <FormControlLabel value="round-trip" control={<Radio />} label="Round Trip" />
              <FormControlLabel value="multi-trip" control={<Radio />} label="Multi Trip" />
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSearchFlights}
          >
            Search Flights
          </Button>
        </Box>

        {/* Search Results */}
        {flights.length > 0 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Available Flights
            </Typography>
            <Grid container spacing={2}>
              {flights.map((flight) => (
                <Grid item xs={12} sm={6} md={4} key={flight.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{flight.airline}</Typography>
                      <Typography>From: {flight.from}</Typography>
                      <Typography>To: {flight.to}</Typography>
                      <Typography>Price: {flight.price}</Typography>
                      <Typography>
                        Departure: {flight.departure?.toLocaleDateString()}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleBookFlight(flight)}
                      >
                        Book Flight
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default Flight;
