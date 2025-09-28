import { useState } from "react";
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
  useTheme,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import {
  Search as SearchIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Train as TrainIcon,
  DirectionsRailway as DirectionsRailwayIcon,
} from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import { createBooking } from "../api/bookingsApi";

const trains = [
  {
    number: "12301",
    name: "Rajdhani Express",
    from: "NDLS",
    to: "MMCT",
    departure: "16:00",
    arrival: "08:30",
    duration: "16h 30m",
    classes: {
      "1A": { available: true, fare: 4500 },
      "2A": { available: true, fare: 3200 },
      "3A": { available: false, fare: 2200 },
    },
  },
  {
    number: "12259",
    name: "Sealdah Duronto",
    from: "NDLS",
    to: "HWH",
    departure: "22:30",
    arrival: "09:45",
    duration: "11h 15m",
    classes: {
      "2A": { available: true, fare: 2800 },
      "3A": { available: true, fare: 1900 },
      SL: { available: true, fare: 950 },
    },
  },
  {
    number: "12627",
    name: "Karnataka Express",
    from: "NDLS",
    to: "SBC",
    departure: "19:15",
    arrival: "06:30",
    duration: "35h 15m",
    classes: {
      "1A": { available: false, fare: 5200 },
      "2A": { available: true, fare: 3500 },
      "3A": { available: true, fare: 2500 },
      SL: { available: true, fare: 1200 },
    },
  },
  {
    number: "12001",
    name: "Shatabdi Express",
    from: "NDLS",
    to: "CNB",
    departure: "06:00",
    arrival: "11:30",
    duration: "5h 30m",
    classes: {
      CC: { available: true, fare: 1500 },
      EC: { available: true, fare: 2200 },
    },
  },
  {
    number: "12951",
    name: "Mumbai Rajdhani",
    from: "MMCT",
    to: "NDLS",
    departure: "16:30",
    arrival: "08:00",
    duration: "15h 30m",
    classes: {
      "1A": { available: true, fare: 4400 },
      "2A": { available: true, fare: 3100 },
      "3A": { available: true, fare: 2100 },
    },
  },
  {
    number: "12841",
    name: "Howrah Duronto",
    from: "HWH",
    to: "NDLS",
    departure: "20:15",
    arrival: "07:30",
    duration: "11h 15m",
    classes: {
      "2A": { available: true, fare: 2700 },
      "3A": { available: true, fare: 1800 },
      SL: { available: true, fare: 900 },
    },
  },
  {
    number: "12686",
    name: "Chennai Express",
    from: "MAS",
    to: "NDLS",
    departure: "15:30",
    arrival: "16:00",
    duration: "24h 30m",
    classes: {
      "2A": { available: true, fare: 2900 },
      "3A": { available: true, fare: 1950 },
      SL: { available: true, fare: 980 },
    },
  },
  {
    number: "12245",
    name: "Bangalore Rajdhani",
    from: "SBC",
    to: "NDLS",
    departure: "20:00",
    arrival: "08:30",
    duration: "36h 30m",
    classes: {
      "1A": { available: false, fare: 5300 },
      "2A": { available: true, fare: 3600 },
      "3A": { available: true, fare: 2550 },
    },
  },
];

const stations = {
  NDLS: "New Delhi",
  MMCT: "Mumbai Central",
  MAS: "Chennai Central",
  SBC: "Bangalore City",
  HWH: "Kolkata Howrah",
  HYB: "Hyderabad Deccan",
  CNB: "Kanpur Central",
  PNBE: "Patna Junction",
  JP: "Jaipur Junction",
  ADI: "Ahmedabad Junction",
  BHO: "Bhopal Junction",
  LKO: "Lucknow Charbagh",
  AGC: "Agra Cantt",
  VNS: "Varanasi Junction",
  ALD: "Allahabad Junction",
};

const popularRoutes = [
  { from: "NDLS", to: "MMCT", label: "Delhi to Mumbai" },
  { from: "NDLS", to: "HWH", label: "Delhi to Kolkata" },
  { from: "NDLS", to: "SBC", label: "Delhi to Bangalore" },
  { from: "MMCT", to: "NDLS", label: "Mumbai to Delhi" },
  { from: "HWH", to: "NDLS", label: "Kolkata to Delhi" },
];

const classOptions = [
  { value: "all", label: "All Classes" },
  { value: "1A", label: "First AC (1A)" },
  { value: "2A", label: "Second AC (2A)" },
  { value: "3A", label: "Third AC (3A)" },
  { value: "SL", label: "Sleeper (SL)" },
  { value: "CC", label: "Chair Car (CC)" },
  { value: "EC", label: "Executive Chair Car (EC)" },
];

const steps = ["Select Train", "Passenger Details", "Payment", "Confirmation"];

const generateRandomTrain = (from, to) => {
 
  const prefixes = ["", "Super", "Rajdhani", "Shatabdi", "Double Decker"];
  const suffixes = ["Express", "Special", "Fast", "Mail"];

  const randomName = () => {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const city1 = stations[from]?.split(" ")[0] || from;
    const city2 = stations[to]?.split(" ")[0] || to;

    if (prefix) {
      return `${prefix} ${city1}-${city2} ${suffix}`;
    }
    return `${city1}-${city2} ${suffix}`;
  };

  const randomTime = () => {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const randomDuration = () => {
    const hours = Math.floor(Math.random() * 24) + 1;
    const minutes = Math.floor(Math.random() * 60);
    return `${hours}h ${minutes}m`;
  };

  const randomNumber = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const availableClasses = ["1A", "2A", "3A", "SL", "CC", "EC"];
  const classes = {};

  const numClasses = Math.floor(Math.random() * 3) + 2;
  const selectedClasses = [];

  for (let i = 0; i < numClasses; i++) {
    const randomClass =
      availableClasses[Math.floor(Math.random() * availableClasses.length)];
    if (!selectedClasses.includes(randomClass)) {
      selectedClasses.push(randomClass);
    }
  }

  selectedClasses.forEach((cls) => {
    const fareMap = {
      "1A": Math.floor(Math.random() * 3000) + 4000,
      "2A": Math.floor(Math.random() * 2000) + 2000,
      "3A": Math.floor(Math.random() * 1000) + 1000,
      SL: Math.floor(Math.random() * 500) + 500,
      CC: Math.floor(Math.random() * 500) + 800,
      EC: Math.floor(Math.random() * 800) + 1500,
    };

    classes[cls] = {
      available: true,
      fare: fareMap[cls],
    };
  });

  return {
    number: randomNumber(),
    name: randomName(),
    from: from,
    to: to,
    departure: randomTime(),
    arrival: randomTime(),
    duration: randomDuration(),
    classes: classes,
  };
};

function Train() {
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [classType, setClassType] = useState("all");
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [passengerDetails, setPassengerDetails] = useState({
    name: "",
    age: "",
    gender: "",
    berthPreference: "no",
    idProof: "",
  });
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [quickBookingOpen, setQuickBookingOpen] = useState(false);
  const theme = useTheme();

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!fromStation || !toStation || !journeyDate) {
      alert("Please select from station, to station and journey date");
      return;
    }

    let filtered = trains.filter(
      (train) =>
        train.from === fromStation &&
        train.to === toStation &&
        (classType === "all" ||
          (train.classes[classType] && train.classes[classType].available))
    );

    if (filtered.length === 0) {
      const newTrain = generateRandomTrain(fromStation, toStation);
      filtered = [newTrain];
    }

    setFilteredTrains(filtered);
  };

  const handleQuickBook = (route) => {
    setFromStation(route.from);
    setToStation(route.to);
    setJourneyDate(new Date().toISOString().split("T")[0]);
    setClassType("all");

    let filtered = trains.filter(
      (train) => train.from === route.from && train.to === route.to
    );

    if (filtered.length === 0) {
      const newTrain = generateRandomTrain(route.from, route.to);
      filtered = [newTrain];
    }

    setFilteredTrains(filtered);
    setQuickBookingOpen(false);
  };

  const handleTrainSelect = (train) => {
    setSelectedTrain(train);
    setActiveStep(0);
    setBookingDialogOpen(true);
  };

  const handlePassengerChange = (e) => {
    const { name, value } = e.target;

    if (name === "idProof") {
      const sanitized = value.replace(/\D/g, "").slice(0, 12);
      setPassengerDetails({ ...passengerDetails, [name]: sanitized });
    } else {
      setPassengerDetails({ ...passengerDetails, [name]: value });
    }
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
      !passengerDetails.gender ||
      !journeyDate
    ) {
      alert("Please fill all passenger details.");
      return;
    }

    if (passengerDetails.idProof && passengerDetails.idProof.length !== 12) {
      alert("Aadhaar number must be 12 digits");
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
      trainNumber: selectedTrain.number,
      trainName: selectedTrain.name,
      fromStation: selectedTrain.from,
      toStation: selectedTrain.to,
      journeyDate,
      classType,
      passenger: passengerDetails,
      payment: cardDetails,
    };

    try {
      const result =  await createBooking (bookingData);
    console.log("booking Success:",result.booking);
    setActiveStep(3);
     
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    }
  };

  const resetBooking = () => {
    setSelectedTrain(null);
    setActiveStep(0);
    setPassengerDetails({
      name: "",
      age: "",
      gender: "",
      berthPreference: "no",
      idProof: "",
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
    if (!selectedTrain || !classType || classType === "all") return 0;
    return selectedTrain.classes[classType]?.fare || 0;
  };
  
  const today = new Date().toISOString().split("T")[0];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            mt: 4,
            mb: 4,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              color="primary"
            >
              Indian Railways Booking
            </Typography>
            <Box component="form" onSubmit={handleSearch} sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    fullWidth
                    label="From Station"
                    value={fromStation}
                    onChange={(e) => setFromStation(e.target.value)}
                    required
                  >
                    <MenuItem value="">Select Station</MenuItem>
                    {Object.entries(stations).map(([code, name]) => (
                      <MenuItem key={code} value={code}>
                        {name} ({code})
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    fullWidth
                    label="To Station"
                    value={toStation}
                    onChange={(e) => setToStation(e.target.value)}
                    required
                  >
                    <MenuItem value="">Select Station</MenuItem>
                    {Object.entries(stations).map(([code, name]) => (
                      <MenuItem key={code} value={code}>
                        {name} ({code})
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Journey Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    inputProps={{
                      min: today,
                    }}
                    required
                  />
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
                <Grid item xs={12} md={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<SearchIcon />}
                    sx={{ height: "56px" }}
                  >
                    Search Trains
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
                  icon={<DirectionsRailwayIcon />}
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
            Available Trains
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
            {filteredTrains.length === 0 ? (
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h6" color="textSecondary">
                  {fromStation && toStation
                    ? "No trains found for your search criteria."
                    : "Please search for trains using the form above."}
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {filteredTrains.map((train) => (
                  <Grid item xs={12} key={train.number}>
                    <Card elevation={3} sx={{ "&:hover": { boxShadow: 6 } }}>
                      <CardContent>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs={12} md={3}>
                            <Typography variant="h6" color="primary">
                              {train.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              #{train.number}
                            </Typography>
                            <Chip
                              label={train.from + " → " + train.to}
                              size="small"
                              color="primary"
                              variant="outlined"
                              sx={{ mt: 1 }}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Box textAlign="center">
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  {stations[train.from]}
                                </Typography>
                                <Typography variant="h6">
                                  {train.departure}
                                </Typography>
                              </Box>
                              <Box textAlign="center" sx={{ px: 1 }}>
                                <ArrowForwardIcon color="primary" />
                                <Typography variant="caption" display="block">
                                  {train.duration}
                                </Typography>
                              </Box>
                              <Box textAlign="center">
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  {stations[train.to]}
                                </Typography>
                                <Typography variant="h6">
                                  {train.arrival}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <Typography variant="body2" color="textSecondary">
                              Available Classes
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              {Object.entries(train.classes)
                                .filter(([_, info]) => info.available)
                                .map(([c]) => (
                                  <Chip
                                    key={c}
                                    label={c}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{ mr: 0.5, mb: 0.5 }}
                                  />
                                ))}
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <Typography variant="body2" color="textSecondary">
                              Starting Fare
                            </Typography>
                            <Typography variant="h6" color="secondary">
                              ₹
                              {Math.min(
                                ...Object.values(train.classes)
                                  .filter((i) => i.available)
                                  .map((i) => i.fare)
                              )}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={1}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleTrainSelect(train)}
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
        </Container>

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
              icon={<TrainIcon />}
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
              <Typography variant="h6">Book Train Tickets</Typography>
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
            {activeStep === 0 && selectedTrain && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Train Details
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedTrain.name} (#{selectedTrain.number})
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {stations[selectedTrain.from]} to {stations[selectedTrain.to]}{" "}
                  on {formatDate(journeyDate)}
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" gutterBottom>
                  Select Class
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(selectedTrain.classes)
                    .filter(([_, info]) => info.available)
                    .map(([classCode, info]) => (
                      <Grid item xs={6} sm={4} key={classCode}>
                        <Paper
                          elevation={classType === classCode ? 4 : 1}
                          sx={{
                            p: 2,
                            textAlign: "center",
                            cursor: "pointer",
                            border:
                              classType === classCode
                                ? "2px solid"
                                : "1px solid",
                            borderColor:
                              classType === classCode
                                ? "primary.main"
                                : "divider",
                            bgcolor:
                              classType === classCode
                                ? "primary.light"
                                : "background.paper",
                            "&:hover": { bgcolor: "action.hover" },
                          }}
                          onClick={() => setClassType(classCode)}
                        >
                          <Typography variant="body1" fontWeight="bold">
                            {classOptions.find((opt) => opt.value === classCode)
                              ?.label || classCode}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ₹{info.fare}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                  <Typography variant="subtitle2">Fare Summary</Typography>
                  <Typography variant="body2">
                    {classType !== "all" ? (
                      <>
                        1 Ticket × ₹{getFareForSelectedClass()} = ₹
                        {getFareForSelectedClass()}
                      </>
                    ) : (
                      "Please select a class to see fare details"
                    )}
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
                      select
                      fullWidth
                      label="Berth Preference"
                      name="berthPreference"
                      value={passengerDetails.berthPreference}
                      onChange={handlePassengerChange}
                    >
                      <MenuItem value="no">No Preference</MenuItem>
                      <MenuItem value="lower">Lower</MenuItem>
                      <MenuItem value="middle">Middle</MenuItem>
                      <MenuItem value="upper">Upper</MenuItem>
                      <MenuItem value="side">Side</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="ID Proof Number (Aadhaar)"
                      name="idProof"
                      value={passengerDetails.idProof}
                      onChange={handlePassengerChange}
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        maxLength: 12,
                      }}
                      helperText="12-digit Aadhaar number (optional)"
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
                    Train: {selectedTrain?.name}
                  </Typography>
                  <Typography variant="body2">
                    Class:{" "}
                    {classOptions.find((opt) => opt.value === classType)?.label}
                  </Typography>
                  <Typography variant="body2">
                    Fare: ₹{getFareForSelectedClass()}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Total: ₹{getFareForSelectedClass()}
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
                  Your train tickets have been successfully booked.
                </Typography>

                <Paper elevation={2} sx={{ p: 3, mt: 3, textAlign: "left" }}>
                  <Typography variant="h6" gutterBottom>
                    Booking Details
                  </Typography>
                  <Typography variant="body2">
                    <strong>PNR:</strong> PNR
                    {Math.random().toString(36).substring(2, 9).toUpperCase()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Train:</strong> {selectedTrain?.name} (#
                    {selectedTrain?.number})
                  </Typography>
                  <Typography variant="body2">
                    <strong>From:</strong> {stations[selectedTrain?.from]} →{" "}
                    <strong>To:</strong> {stations[selectedTrain?.to]}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Date:</strong> {formatDate(journeyDate)}
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
                    <strong>Fare:</strong> ₹{getFareForSelectedClass()}
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
                Book Another Ticket
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
                  (activeStep === 0 && classType === "all") ||
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
      </Box>
    </ThemeProvider>
  );
}

export default Train;
