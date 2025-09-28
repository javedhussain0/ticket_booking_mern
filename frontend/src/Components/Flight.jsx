import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Grid,
  Box,
  Paper,
  Divider,
  Chip,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import {
  Search as SearchIcon,
  Flight as FlightIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { createBooking } from "../api/bookingsApi";

const airports = {
  DEL: { name: "Indira Gandhi International Airport", city: "Delhi" },
  BOM: { name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai" },
  BLR: { name: "Kempegowda International Airport", city: "Bangalore" },
  MAA: { name: "Chennai International Airport", city: "Chennai" },
  HYD: { name: "Rajiv Gandhi International Airport", city: "Hyderabad" },
  CCU: { name: "Netaji Subhas Chandra Bose International Airport", city: "Kolkata" },
  AMD: { name: "Sardar Vallabhbhai Patel International Airport", city: "Ahmedabad" },
  GOI: { name: "Goa International Airport", city: "Goa" },
  PNQ: { name: "Pune Airport", city: "Pune" },
  COK: { name: "Cochin International Airport", city: "Kochi" },
  LKO: { name: "Chaudhary Charan Singh International Airport", city: "Lucknow" },
  JAI: { name: "Jaipur International Airport", city: "Jaipur" },
};

const flights = [
  {
    number: "AI-101",
    airline: "Air India",
    from: "DEL",
    to: "BOM",
    departure: "08:00",
    arrival: "10:30",
    duration: "2h 30m",
    price: 4500,
    stops: 0,
    aircraft: "Boeing 787",
  },
  {
    number: "6E-215",
    airline: "IndiGo",
    from: "DEL",
    to: "BOM",
    departure: "10:15",
    arrival: "12:45",
    duration: "2h 30m",
    price: 4200,
    stops: 0,
    aircraft: "Airbus A320",
  },
  {
    number: "UK-945",
    airline: "Vistara",
    from: "DEL",
    to: "BLR",
    departure: "09:30",
    arrival: "12:15",
    duration: "2h 45m",
    price: 5200,
    stops: 0,
    aircraft: "Boeing 737",
  },
  {
    number: "SG-317",
    airline: "SpiceJet",
    from: "DEL",
    to: "BLR",
    departure: "14:20",
    arrival: "17:10",
    duration: "2h 50m",
    price: 4800,
    stops: 0,
    aircraft: "Boeing 737",
  },
  {
    number: "AI-560",
    airline: "Air India",
    from: "BOM",
    to: "MAA",
    departure: "11:45",
    arrival: "13:35",
    duration: "1h 50m",
    price: 3800,
    stops: 0,
    aircraft: "Airbus A320",
  },
  {
    number: "6E-532",
    airline: "IndiGo",
    from: "BOM",
    to: "HYD",
    departure: "16:30",
    arrival: "18:10",
    duration: "1h 40m",
    price: 3500,
    stops: 0,
    aircraft: "Airbus A320",
  },
  {
    number: "UK-811",
    airline: "Vistara",
    from: "BLR",
    to: "DEL",
    departure: "18:00",
    arrival: "20:45",
    duration: "2h 45m",
    price: 5100,
    stops: 0,
    aircraft: "Airbus A321",
  },
  {
    number: "SG-406",
    airline: "SpiceJet",
    from: "MAA",
    to: "DEL",
    departure: "13:15",
    arrival: "16:20",
    duration: "3h 05m",
    price: 4600,
    stops: 0,
    aircraft: "Boeing 737",
  },
];

const popularRoutes = [
  { from: "DEL", to: "BOM", label: "Delhi to Mumbai" },
  { from: "DEL", to: "BLR", label: "Delhi to Bangalore" },
  { from: "BOM", to: "DEL", label: "Mumbai to Delhi" },
  { from: "BOM", to: "HYD", label: "Mumbai to Hyderabad" },
  { from: "BLR", to: "DEL", label: "Bangalore to Delhi" },
];

const classOptions = [
  { value: "economy", label: "Economy" },
  { value: "premium_economy", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First Class" },
];

const steps = ["Select Flight", "Passenger Details", "Payment", "Confirmation"];

const generateRandomFlight = (from, to) => {
  const airlines = ["Air India", "IndiGo", "Vistara", "SpiceJet", "GoAir", "AirAsia India"];
  const aircrafts = ["Boeing 737", "Boeing 787", "Airbus A320", "Airbus A321", "Airbus A330"];
  
  const airline = airlines[Math.floor(Math.random() * airlines.length)];
  const aircraft = aircrafts[Math.floor(Math.random() * aircrafts.length)];
  
  const airlineCode = airline === "Air India" ? "AI" : 
                     airline === "IndiGo" ? "6E" :
                     airline === "Vistara" ? "UK" :
                     airline === "SpiceJet" ? "SG" :
                     airline === "GoAir" ? "G8" : "I5";
  const flightNumber = `${airlineCode}-${Math.floor(100 + Math.random() * 900)}`;
  
  const departureHour = Math.floor(6 + Math.random() * 12);
  const departureMinute = Math.floor(Math.random() * 60);
  const departureTime = `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`;
  
  const flightDurations = {
    "DEL-BOM": { min: 125, max: 150 },
    "DEL-BLR": { min: 155, max: 175 },
    "DEL-MAA": { min: 145, max: 165 },
    "DEL-HYD": { min: 135, max: 155 },
    "BOM-BLR": { min: 95, max: 115 },
    "BOM-MAA": { min: 105, max: 125 },
    "BOM-HYD": { min: 85, max: 105 },
  };
  
  const routeKey = `${from}-${to}`;
  const defaultDuration = { min: 120, max: 180 };
  const durationRange = flightDurations[routeKey] || defaultDuration;
  const durationMinutes = Math.floor(durationRange.min + Math.random() * (durationRange.max - durationRange.min));
  
  const arrivalHour = departureHour + Math.floor(durationMinutes / 60);
  const arrivalMinute = (departureMinute + (durationMinutes % 60)) % 60;
  const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`;
  
  const duration = `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`;
  
  const basePrices = {
    "DEL-BOM": 4000,
    "DEL-BLR": 5000,
    "DEL-MAA": 4800,
    "DEL-HYD": 4500,
    "BOM-BLR": 3500,
    "BOM-MAA": 3800,
    "BOM-HYD": 3200,
  };
  
  const basePrice = basePrices[routeKey] || 4500;
  const price = Math.floor(basePrice * (0.8 + Math.random() * 0.4));
  
  return {
    number: flightNumber,
    airline,
    from,
    to,
    departure: departureTime,
    arrival: arrivalTime,
    duration,
    price,
    stops: Math.random() > 0.7 ? 1 : 0,
    aircraft,
  };
};


function Flight() {
  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("one-way");
  const [passengerCount, setPassengerCount] = useState(1);
  const [classType, setClassType] = useState("economy");
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [passengerDetails, setPassengerDetails] = useState({
    name: "",
    age: "",
    gender: "",
    passport: "",
  });
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [quickBookingOpen, setQuickBookingOpen] = useState(false);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!fromAirport || !toAirport || !departureDate) {
      alert("Please select from airport, to airport and departure date");
      return;
    }

    let filtered = flights.filter(
      (flight) => flight.from === fromAirport && flight.to === toAirport
    );

    if (filtered.length === 0) {
      const newFlight = generateRandomFlight(fromAirport, toAirport);
      filtered = [newFlight];
    }

    setFilteredFlights(filtered);
  };

  const handleQuickBook = (route) => {
    setFromAirport(route.from);
    setToAirport(route.to);
    setDepartureDate(new Date().toISOString().split("T")[0]);
    setTripType("one-way");
    setPassengerCount(1);
    setClassType("economy");

    let filtered = flights.filter(
      (flight) => flight.from === route.from && flight.to === route.to
    );

    if (filtered.length === 0) {
      const newFlight = generateRandomFlight(route.from, route.to);
      filtered = [newFlight];
    }

    setFilteredFlights(filtered);
    setQuickBookingOpen(false);
  };

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
    setActiveStep(0);
    setBookingDialogOpen(true);
  };

  const handlePassengerChange = (e) => {
    const { name, value } = e.target;
    setPassengerDetails({ ...passengerDetails, [name]: value });
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      const sanitized = value.replace(/\D/g, "").slice(0, 16);
      setCardDetails({ ...cardDetails, [name]: sanitized });
    } else if (name === "cvv") {
      const sanitized = value.replace(/\D/g, "").slice(0, 3);
      setCardDetails({ ...cardDetails, [name]: sanitized });
    } else if (name === "expiry") {
      let sanitized = value.replace(/\D/g, "").slice(0, 4);
      if (sanitized.length > 2)
        sanitized = sanitized.slice(0, 2) + "/" + sanitized.slice(2);
      setCardDetails({ ...cardDetails, [name]: sanitized });
    } else if (name === "name") {
      const sanitized = value.replace(/[^a-zA-Z\s]/g, "");
      setCardDetails({ ...cardDetails, [name]: sanitized });
    } else {
      setCardDetails({ ...cardDetails, [name]: value });
    }
  };

  const handleBookingSubmit = async () => {
    if (
      !passengerDetails.name ||
      !passengerDetails.age ||
      !passengerDetails.gender
    ) {
      alert("Please fill all passenger details.");
      return;
    }

    if (
      !cardDetails.number ||
      !cardDetails.expiry ||
      !cardDetails.cvv ||
      !cardDetails.name
    ) {
      alert("Please fill all payment details.");
      return;
    }

    const bookingData = {
      flightNumber: selectedFlight.number,
      airline: selectedFlight.airline,
      fromAirport: selectedFlight.from,
      toAirport: selectedFlight.to,
      departureDate,
      classType,
      passenger: passengerDetails,
      payment: cardDetails,
    };

    try {
      const result = await createBooking(bookingData);
      console.log("booking Success : ",result.booking);
      setActiveStep(3);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    }
  };

  const resetBooking = () => {
    setSelectedFlight(null);
    setActiveStep(0);
    setPassengerDetails({
      name: "",
      age: "",
      gender: "",
      passport: "",
    });
    setCardDetails({ number: "", expiry: "", cvv: "", name: "" });
    setBookingDialogOpen(false);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getFareForSelectedClass = () => {
    if (!selectedFlight) return 0;
    
    const classMultipliers = {
      economy: 1,
      premium_economy: 1.5,
      business: 2.5,
      first: 4,
    };
    
    return Math.round(selectedFlight.price * classMultipliers[classType]);
  };
  
  const today = new Date().toISOString().split("T")[0];



  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom align="center" color="primary">
          Flight Booking
        </Typography>
        <Box component="form" onSubmit={handleSearch} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                >
                  <FormControlLabel
                    value="one-way"
                    control={<Radio />}
                    label="One Way"
                  />
                  <FormControlLabel
                    value="round-trip"
                    control={<Radio />}
                    label="Round Trip"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="From"
                value={fromAirport}
                onChange={(e) => setFromAirport(e.target.value)}
                required
              >
                <MenuItem value="">Select Airport</MenuItem>
                {Object.entries(airports).map(([code, info]) => (
                  <MenuItem key={code} value={code}>
                    {info.city} ({code})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="To"
                value={toAirport}
                onChange={(e) => setToAirport(e.target.value)}
                required
              >
                <MenuItem value="">Select Airport</MenuItem>
                {Object.entries(airports).map(([code, info]) => (
                  <MenuItem key={code} value={code}>
                    {info.city} ({code})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Departure"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                inputProps={{ min: today }}
                required
              />
            </Grid>
            {tripType === "round-trip" && (
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Return"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  inputProps={{ min: departureDate || today }}
                  required
                />
              </Grid>
            )}
            <Grid item xs={12} md={2}>
              <TextField
                select
                fullWidth
                label="Passengers"
                value={passengerCount}
                onChange={(e) => setPassengerCount(parseInt(e.target.value))}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num} {num === 1 ? "Passenger" : "Passengers"}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                select
                fullWidth
                label="Class"
                value={classType}
                onChange={(e) => setClassType(e.target.value)}
                required
              >
                {classOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<SearchIcon />}
                sx={{ height: "56px", width: "100%" }}
              >
                Search Flights
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Popular Routes
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {popularRoutes.map((route, index) => (
            <Chip
              key={index}
              icon={<FlightIcon />}
              label={route.label}
              onClick={() => handleQuickBook(route)}
              color="primary"
              variant="outlined"
              sx={{ cursor: "pointer" }}
            />
          ))}
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Available Flights
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          pb: 2,
          "&::-webkit-scrollbar": {
            width: 8,
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        {filteredFlights.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6" color="textSecondary">
              {fromAirport && toAirport
                ? "No flights found for your search criteria."
                : "Please search for flights using the form above."}
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredFlights.map((flight) => (
              <Grid item xs={12} key={flight.number}>
                <Card elevation={3} sx={{ "&:hover": { boxShadow: 6 } }}>
                  <CardContent>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12} md={3}>
                        <Typography variant="h6" color="primary">
                          {flight.airline}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          #{flight.number}
                        </Typography>
                        <Chip
                          label={`${flight.from} → ${flight.to}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ mt: 1 }}
                        />
                        {flight.stops > 0 && (
                          <Chip
                            label={`${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                            size="small"
                            color="secondary"
                            variant="outlined"
                            sx={{ mt: 1, ml: 1 }}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box textAlign="center">
                            <Typography variant="body2" color="textSecondary">
                              {flight.departure}
                            </Typography>
                            <Typography variant="body2">
                              {airports[flight.from]?.city}
                            </Typography>
                          </Box>
                          <Box textAlign="center" sx={{ px: 1 }}>
                            <FlightIcon color="primary" />
                            <Typography variant="caption" display="block">
                              {flight.duration}
                            </Typography>
                          </Box>
                          <Box textAlign="center">
                            <Typography variant="body2" color="textSecondary">
                              {flight.arrival}
                            </Typography>
                            <Typography variant="body2">
                              {airports[flight.to]?.city}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Typography variant="body2" color="textSecondary">
                          Aircraft
                        </Typography>
                        <Typography variant="body2">
                          {flight.aircraft}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Typography variant="body2" color="textSecondary">
                          Starting Fare
                        </Typography>
                        <Typography variant="h6" color="secondary">
                          ₹{flight.price}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleFlightSelect(flight)}
                        >
                          Book Now
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <SpeedDial
        ariaLabel="Quick booking"
        sx={{ position: "fixed", bottom: 24, right: 24 }}
        icon={<SpeedDialIcon />}
        open={quickBookingOpen}
        onOpen={() => setQuickBookingOpen(true)}
        onClose={() => setQuickBookingOpen(false)}
      >
        {popularRoutes.map((route, index) => (
          <SpeedDialAction
            key={index}
            icon={<FlightIcon />}
            tooltipTitle={route.label}
            onClick={() => handleQuickBook(route)}
          />
        ))}
      </SpeedDial>

      <Dialog
        open={bookingDialogOpen}
        onClose={() => setBookingDialogOpen(false)}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Book Flight Tickets</Typography>
            <IconButton onClick={() => setBookingDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Stepper activeStep={activeStep} sx={{ pt: 2, pb: 1 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </DialogTitle>
        <DialogContent dividers>
          {activeStep === 0 && selectedFlight && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Flight Details
              </Typography>
              <Typography variant="body1" gutterBottom>
                {selectedFlight.airline} (#{selectedFlight.number})
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {airports[selectedFlight.from]?.city} to {airports[selectedFlight.to]?.city} on {formatDate(departureDate)}
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                Select Class
              </Typography>
              <Grid container spacing={2}>
                {classOptions.map((classOpt) => {
                  const classMultipliers = {
                    economy: 1,
                    premium_economy: 1.5,
                    business: 2.5,
                    first: 4,
                  };
                  
                  const fare = Math.round(selectedFlight.price * classMultipliers[classOpt.value]);
                  
                  return (
                    <Grid item xs={6} sm={3} key={classOpt.value}>
                      <Paper
                        elevation={classType === classOpt.value ? 4 : 1}
                        sx={{
                          p: 2,
                          textAlign: "center",
                          cursor: "pointer",
                          border: classType === classOpt.value ? "2px solid" : "1px solid",
                          borderColor: classType === classOpt.value ? "primary.main" : "divider",
                          bgcolor: classType === classOpt.value ? "primary.light" : "background.paper",
                          "&:hover": { bgcolor: "action.hover" },
                        }}
                        onClick={() => setClassType(classOpt.value)}
                      >
                        <Typography variant="body1" fontWeight="bold">
                          {classOpt.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ₹{fare}
                        </Typography>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>

              <Box sx={{ mt: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                <Typography variant="subtitle2">Fare Summary</Typography>
                <Typography variant="body2">
                  {passengerCount} Ticket(s) × ₹{getFareForSelectedClass()} = ₹
                  {getFareForSelectedClass() * passengerCount}
                </Typography>
              </Box>
            </Box>
          )}

          {activeStep === 1 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Passenger Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Passenger Name"
                    name="name"
                    value={passengerDetails.name}
                    onChange={handlePassengerChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    type="number"
                    value={passengerDetails.age}
                    onChange={handlePassengerChange}
                    required
                    inputProps={{ min: 1, max: 100 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                      row
                      name="gender"
                      value={passengerDetails.gender}
                      onChange={handlePassengerChange}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Passport Number (Optional)"
                    name="passport"
                    value={passengerDetails.passport}
                    onChange={handlePassengerChange}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {activeStep === 2 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Payment Details
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Secure payment with encryption
              </Typography>

              <Box sx={{ p: 2, bgcolor: "grey.50", borderRadius: 1, mb: 2 }}>
                <Typography variant="subtitle2">Payment Summary</Typography>
                <Typography variant="body2">
                  Flight: {selectedFlight?.airline} #{selectedFlight?.number}
                </Typography>
                <Typography variant="body2">
                  Class: {classOptions.find((opt) => opt.value === classType)?.label}
                </Typography>
                <Typography variant="body2">
                  Passengers: {passengerCount}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Total: ₹{getFareForSelectedClass() * passengerCount}
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Cardholder Name"
                name="name"
                value={cardDetails.name}
                onChange={handleCardChange}
                sx={{ mb: 2 }}
                inputProps={{
                  pattern: "[a-zA-Z\\s]*",
                }}
                helperText="Enter cardholder name (letters only)"
              />
              <TextField
                fullWidth
                label="Card Number"
                name="number"
                value={cardDetails.number}
                onChange={handleCardChange}
                sx={{ mb: 2 }}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 16,
                }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date (MM/YY)"
                    name="expiry"
                    value={cardDetails.expiry}
                    onChange={handleCardChange}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      maxLength: 5,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardChange}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      maxLength: 3,
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {activeStep === 3 && (
            <Box sx={{ textAlign: "center", py: 3 }}>
              <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
              <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                Booking Confirmed!
              </Typography>
              <Typography variant="body1">
                Your flight tickets have been successfully booked.
              </Typography>

              <Paper elevation={2} sx={{ p: 3, mt: 3, textAlign: "left" }}>
                <Typography variant="h6" gutterBottom>
                  Booking Details
                </Typography>
                <Typography variant="body2">
                  <strong>Booking Reference:</strong>{" "}
                  {Math.random().toString(36).substring(2, 9).toUpperCase()}
                </Typography>
                <Typography variant="body2">
                  <strong>Flight:</strong> {selectedFlight?.airline} (#
                  {selectedFlight?.number})
                </Typography>
                <Typography variant="body2">
                  <strong>From:</strong> {airports[selectedFlight?.from]?.city} →{" "}
                  <strong>To:</strong> {airports[selectedFlight?.to]?.city}
                </Typography>
                <Typography variant="body2">
                  <strong>Date:</strong> {formatDate(departureDate)}
                </Typography>
                <Typography variant="body2">
                  <strong>Class:</strong>{" "}
                  {classOptions.find((opt) => opt.value === classType)?.label}
                </Typography>
                <Typography variant="body2">
                  <strong>Passenger:</strong> {passengerDetails.name} (
                  {passengerDetails.age} years)
                </Typography>
                <Typography variant="body2">
                  <strong>Total Fare:</strong> ₹{getFareForSelectedClass() * passengerCount}
                </Typography>
              </Paper>

              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 2 }}
              >
                An e-ticket has been sent to your registered email and mobile
                number.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          {activeStep < 3 && (
            <Button onClick={() => setBookingDialogOpen(false)}>
              Cancel
            </Button>
          )}
          {activeStep === 3 ? (
            <Button variant="contained" onClick={resetBooking}>
              Book Another Flight
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                if (activeStep === 0) setActiveStep(1);
                else if (activeStep === 1) setActiveStep(2);
                else if (activeStep === 2) handleBookingSubmit();
              }}
              disabled={
                (activeStep === 0 && !classType) ||
                (activeStep === 1 &&
                  (!passengerDetails.name ||
                    !passengerDetails.age ||
                    !passengerDetails.gender))
              }
            >
              {activeStep === 2 ? "Pay Now" : "Next"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Flight;