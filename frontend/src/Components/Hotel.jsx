import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Container,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  MenuItem,
  Alert,
  Snackbar,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Stepper,
  Step,
  StepLabel,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Divider,
  DialogTitle,
} from "@mui/material";
import {
  Hotel as HotelIcon,
  LocationOn as LocationIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  CreditCard as CreditCardIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import hotelData from "../utils/data/hotel.json";
const popularDestinations = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Goa",
  "Jaipur",
  "Kerala",
  "Darjeeling",
  "Varanasi",
];

const roomTypes = [
  { value: "all", label: "All Room Types" },
  { value: "single", label: "Single Room" },
  { value: "double", label: "Double Room" },
  { value: "suite", label: "Suite" },
  { value: "deluxe", label: "Deluxe Room" },
];

const steps = ["Select Hotel", "Guest Details", "Payment", "Confirmation"];

const createGreatIndiaHotel = (location) => {
  return {
    id: Date.now(), 
    name: "The Great India Hotel",
    location: location,
    description: "A premium hotel offering luxurious accommodations with traditional Indian hospitality.",
    price: 4500,
    rating: 4.7,
    roomType: "deluxe",
    image: "https://picsum.photos/800/600",
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "24/7 Service", "Air Conditioning"]
  };
};

function Hotel() {
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    rooms: 1,
  });
  const [roomType, setRoomType] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [quickBookingOpen, setQuickBookingOpen] = useState(false);
  const [guestDetails, setGuestDetails] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  useEffect(() => {
    setHotels(hotelData);
    setFilteredHotels(hotelData);
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const minCheckOut = searchParams.checkIn || today;

  const calculateTotal = () => {
    if (!selectedHotel || !searchParams.checkIn || !searchParams.checkOut)
      return 0;
    const nights = Math.ceil(
      (new Date(searchParams.checkOut) - new Date(searchParams.checkIn)) /
        (1000 * 60 * 60 * 24)
    );
    return selectedHotel.price * nights * searchParams.rooms;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (
      !searchParams.location ||
      !searchParams.checkIn ||
      !searchParams.checkOut
    ) {
      setError("Please select location, check-in and check-out dates");
      setSnackbarOpen(true);
      return;
    }
    
    let filtered = hotels.filter(
      (hotel) =>
        hotel.location
          .toLowerCase()
          .includes(searchParams.location.toLowerCase()) &&
        (roomType === "all" || hotel.roomType === roomType.available)
    );
    
    if (filtered.length === 0 && searchParams.location.trim() !== "") {
      const newHotel = createGreatIndiaHotel(searchParams.location);
      filtered = [newHotel];
      setHotels(prev => [...prev, newHotel]);
    }
    
    setFilteredHotels(filtered);
  };

  const handleQuickBook = (city) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSearchParams({
      location: city,
      checkIn: today.toISOString().split("T")[0],
      checkOut: tomorrow.toISOString().split("T")[0],
      guests: 1,
      rooms: 1,
    });
    setRoomType("all");
    
    let filtered = hotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(city.toLowerCase())
    );
    
    // NEW: If no hotels found for quick book, create The Great India Hotel
    if (filtered.length === 0) {
      const newHotel = createGreatIndiaHotel(city);
      filtered = [newHotel];
      // Add to main hotels list to persist during session
      setHotels(prev => [...prev, newHotel]);
    }
    
    setFilteredHotels(filtered);
    setQuickBookingOpen(false);
  };

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    setActiveStep(0);
    setBookingDialogOpen(true);
  };

  const handleGuestChange = (e) => {
    const { name, value } = e.target;
    setGuestDetails({ ...guestDetails, [name]: value });
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let sanitized = value;
    if (name === "cardNumber")
      sanitized = value.replace(/\D/g, "").slice(0, 16);
    if (name === "cvv") sanitized = value.replace(/\D/g, "").slice(0, 3);
    if (name === "expiryDate") {
      sanitized = value.replace(/\D/g, "").slice(0, 4);
      if (sanitized.length > 2)
        sanitized = sanitized.slice(0, 2) + "/" + sanitized.slice(2);
    }
    setCardDetails({ ...cardDetails, [name]: sanitized });
  };

  // --- Booking validation helpers
  const validateDates = () => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    const inDate = new Date(searchParams.checkIn);
    const outDate = new Date(searchParams.checkOut);
    if (!searchParams.checkIn || !searchParams.checkOut) {
      setError("Please select both check-in and check-out dates");
      setSnackbarOpen(true);
      return false;
    }
    if (inDate < t) {
      setError("Check-in date cannot be in the past");
      setSnackbarOpen(true);
      return false;
    }
    if (outDate <= inDate) {
      setError("Check-out date must be after check-in date");
      setSnackbarOpen(true);
      return false;
    }
    return true;
  };

  const validateGuestDetails = () => {
    if (!guestDetails.name || !guestDetails.email || !guestDetails.phone) {
      setError("Please fill all guest details");
      setSnackbarOpen(true);
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestDetails.email)) {
      setError("Invalid email");
      setSnackbarOpen(true);
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(guestDetails.phone.replace(/\D/g, ""))) {
      setError("Invalid phone number");
      setSnackbarOpen(true);
      return false;
    }
    return true;
  };

  const validateCardDetails = () => {
    if (!cardDetails.cardNumber || cardDetails.cardNumber.length !== 16) {
      setError("Enter a valid 16-digit card number");
      setSnackbarOpen(true);
      return false;
    }
    if (!cardDetails.expiryDate || !cardDetails.expiryDate.includes("/")) {
      setError("Enter expiry in MM/YY format");
      setSnackbarOpen(true);
      return false;
    }
    if (!cardDetails.cvv || cardDetails.cvv.length !== 3) {
      setError("Enter valid CVV");
      setSnackbarOpen(true);
      return false;
    }
    if (!cardDetails.nameOnCard) {
      setError("Enter name on card");
      setSnackbarOpen(true);
      return false;
    }
    return true;
  };

  const handleBookingSubmit = () => {
    if (activeStep === 1 && !validateGuestDetails()) return;
    if (activeStep === 2 && paymentMethod === "card" && !validateCardDetails())
      return;
    if (!validateDates()) return;

    if (activeStep < 2) {
      setActiveStep((s) => s + 1);
      return;
    }
    setTimeout(() => setActiveStep(3), 1000);
  };

  const resetBooking = () => {
    setBookingDialogOpen(false);
    setActiveStep(0);
    setSelectedHotel(null);
    setGuestDetails({ name: "", email: "", phone: "", specialRequests: "" });
    setCardDetails({ cardNumber: "", expiryDate: "", cvv: "", nameOnCard: "" });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box sx={{ my: 2 }}>
        {/* Header */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mb: 3,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <HotelIcon sx={{ mr: 2 }} /> Hotel Booking
        </Typography>

        {/* Search Form */}
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mb: 4 }}>
          <Typography variant="h5" gutterBottom align="center" color="primary">
            Find Your Perfect Stay
          </Typography>
          <Box component="form" onSubmit={handleSearch} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Destination"
                  value={searchParams.location}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      location: e.target.value,
                    })
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  label="Check-in"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={searchParams.checkIn}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      checkIn: e.target.value,
                    })
                  }
                  required
                  inputProps={{ min: today }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  label="Check-out"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={searchParams.checkOut}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      checkOut: e.target.value,
                    })
                  }
                  required
                  inputProps={{ min: minCheckOut }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  label="Guests"
                  value={searchParams.guests}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      guests: parseInt(e.target.value),
                    })
                  }
                  required
                  select
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  select
                  fullWidth
                  label="Room Type"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                >
                  {roomTypes.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<SearchIcon />}
                  sx={{ height: "56px" }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Popular Destinations
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {popularDestinations.map((city, index) => (
              <Chip
                key={index}
                icon={<LocationIcon />}
                label={city}
                onClick={() => handleQuickBook(city)}
                color="primary"
                variant="outlined"
                sx={{ cursor: "pointer" }}
              />
            ))}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom>
          Available Hotels
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
          {filteredHotels.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" color="textSecondary">
                {searchParams.location
                  ? "No hotels found for your search criteria."
                  : "Please search for hotels using the form above."}
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredHotels.map((hotel) => (
                <Grid item xs={12} key={hotel.id}>
                  <Card elevation={3} sx={{ "&:hover": { boxShadow: 6 } }}>
                    <CardContent>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={3}>
                          <CardMedia
                            component="img"
                            sx={{
                              width: "100%",
                              height: 140,
                              objectFit: "cover",
                              borderRadius: 1,
                            }}
                            image={hotel.image}
                            alt={hotel.name}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography variant="h6" color="primary">
                            {hotel.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            {hotel.location}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 1,
                            }}
                          >
                            <Rating
                              value={hotel.rating}
                              precision={0.1}
                              size="small"
                              readOnly
                            />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              {hotel.rating}
                            </Typography>
                          </Box>
                          <Chip
                            label={hotel.roomType}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ mt: 1 }}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography variant="body2" color="textSecondary">
                            Amenities
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            {hotel.amenities &&
                              hotel.amenities
                                .slice(0, 3)
                                .map((amenity, index) => (
                                  <Chip
                                    key={index}
                                    label={amenity}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{ mr: 0.5, mb: 0.5 }}
                                  />
                                ))}
                            {hotel.amenities && hotel.amenities.length > 3 && (
                              <Chip
                                label={`+${hotel.amenities.length - 3} more`}
                                size="small"
                                sx={{ mr: 0.5, mb: 0.5 }}
                              />
                            )}
                            {(!hotel.amenities ||
                              hotel.amenities.length === 0) && (
                              <Chip
                                label="No amenities listed"
                                size="small"
                                sx={{ mr: 0.5, mb: 0.5 }}
                              />
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Typography variant="body2" color="textSecondary">
                            Price per night
                          </Typography>
                          <Typography variant="h6" color="secondary">
                            ₹{hotel.price.toLocaleString("en-IN")}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={1}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleHotelSelect(hotel)}
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
      </Box>

      <SpeedDial
        ariaLabel="Quick booking"
        sx={{ position: "fixed", bottom: 24, right: 24 }}
        icon={<SpeedDialIcon />}
        open={quickBookingOpen}
        onOpen={() => setQuickBookingOpen(true)}
        onClose={() => setQuickBookingOpen(false)}
      >
        {popularDestinations.map((city, index) => (
          <SpeedDialAction
            key={index}
            icon={<HotelIcon />}
            tooltipTitle={city}
            onClick={() => handleQuickBook(city)}
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
            <Typography variant="h6">Hotel Booking</Typography>
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
          {activeStep === 0 && selectedHotel && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Hotel Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                    image={selectedHotel.image}
                    alt={selectedHotel.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">{selectedHotel.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    {selectedHotel.location}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Rating
                      value={selectedHotel.rating}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {selectedHotel.rating}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {selectedHotel.description}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                Booking Details
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Check-in"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={searchParams.checkIn}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        checkIn: e.target.value,
                      })
                    }
                    required
                    inputProps={{ min: today }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Check-out"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={searchParams.checkOut}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        checkOut: e.target.value,
                      })
                    }
                    required
                    inputProps={{ min: minCheckOut }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Guests"
                    value={searchParams.guests}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        guests: parseInt(e.target.value),
                      })
                    }
                    required
                    select
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Rooms"
                    value={searchParams.rooms}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        rooms: parseInt(e.target.value),
                      })
                    }
                    required
                    select
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Box sx={{ p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                <Typography variant="subtitle2">Price Summary</Typography>
                {searchParams.checkIn && searchParams.checkOut ? (
                  <>
                    <Typography variant="body2">
                      ₹{selectedHotel.price.toLocaleString("en-IN")} ×{" "}
                      {Math.ceil(
                        (new Date(searchParams.checkOut) -
                          new Date(searchParams.checkIn)) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      nights × {searchParams.rooms} rooms = ₹
                      {calculateTotal().toLocaleString("en-IN")}
                    </Typography>
                  </>
                ) : (
                  "Please select check-in and check-out dates to see price details"
                )}
              </Box>
            </Box>
          )}

          {activeStep === 1 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Guest Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={guestDetails.name}
                    onChange={handleGuestChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={guestDetails.email}
                    onChange={handleGuestChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={guestDetails.phone}
                    onChange={handleGuestChange}
                    required
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      maxLength: 10,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Special Requests"
                    name="specialRequests"
                    value={guestDetails.specialRequests}
                    onChange={handleGuestChange}
                    multiline
                    rows={3}
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
                  Hotel: {selectedHotel?.name}
                </Typography>
                <Typography variant="body2">
                  Duration:{" "}
                  {Math.ceil(
                    (new Date(searchParams.checkOut) -
                      new Date(searchParams.checkIn)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  nights
                </Typography>
                <Typography variant="body2">
                  Rooms: {searchParams.rooms}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Total: ₹{calculateTotal().toLocaleString("en-IN")}
                </Typography>
              </Box>

              <FormControl component="fieldset" sx={{ width: "100%", mb: 3 }}>
                <FormLabel component="legend">Select Payment Method</FormLabel>
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="card"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CreditCardIcon sx={{ mr: 1 }} />
                        Credit/Debit Card
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label="PayPal"
                  />
                  <FormControlLabel
                    value="bank"
                    control={<Radio />}
                    label="Bank Transfer"
                  />
                </RadioGroup>
              </FormControl>

              {paymentMethod === "card" && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Card Details
                  </Typography>
                  <TextField
                    fullWidth
                    label="Cardholder Name"
                    name="nameOnCard"
                    value={cardDetails.nameOnCard}
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
                    name="cardNumber"
                    value={cardDetails.cardNumber}
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
                        name="expiryDate"
                        value={cardDetails.expiryDate}
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

              {paymentMethod === "paypal" && (
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <Typography variant="body1" gutterBottom>
                    You will be redirected to PayPal to complete your payment.
                  </Typography>
                </Box>
              )}

              {paymentMethod === "bank" && (
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <Typography variant="body1" gutterBottom>
                    Bank transfer details will be provided after booking
                    confirmation.
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {activeStep === 3 && (
            <Box sx={{ textAlign: "center", py: 3 }}>
              <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
              <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                Booking Confirmed!
              </Typography>
              <Typography variant="body1">
                Your hotel reservation has been successfully booked.
              </Typography>

              <Paper elevation={2} sx={{ p: 3, mt: 3, textAlign: "left" }}>
                <Typography variant="h6" gutterBottom>
                  Booking Details
                </Typography>
                <Typography variant="body2">
                  <strong>Confirmation #:</strong>{" "}
                  {Math.random().toString(36).substring(2, 9).toUpperCase()}
                </Typography>
                <Typography variant="body2">
                  <strong>Hotel:</strong> {selectedHotel?.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Location:</strong> {selectedHotel?.location}
                </Typography>
                <Typography variant="body2">
                  <strong>Check-in:</strong> {formatDate(searchParams.checkIn)}
                </Typography>
                <Typography variant="body2">
                  <strong>Check-out:</strong>{" "}
                  {formatDate(searchParams.checkOut)}
                </Typography>
                <Typography variant="body2">
                  <strong>Guests:</strong> {searchParams.guests}
                </Typography>
                <Typography variant="body2">
                  <strong>Rooms:</strong> {searchParams.rooms}
                </Typography>
                <Typography variant="body2">
                  <strong>Total:</strong> ₹
                  {calculateTotal().toLocaleString("en-IN")}
                </Typography>
              </Paper>

              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                A confirmation email has been sent to {guestDetails.email}.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          {activeStep < 3 && (
            <Button onClick={() => setBookingDialogOpen(false)}>Cancel</Button>
          )}
          {activeStep === 3 ? (
            <Button variant="contained" onClick={resetBooking}>
              Book Another Stay
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleBookingSubmit}
              disabled={
                (activeStep === 0 &&
                  (!searchParams.checkIn || !searchParams.checkOut)) ||
                (activeStep === 1 &&
                  (!guestDetails.name ||
                    !guestDetails.email ||
                    !guestDetails.phone)) ||
                (activeStep === 2 &&
                  paymentMethod === "card" &&
                  (!cardDetails.cardNumber ||
                    !cardDetails.expiryDate ||
                    !cardDetails.cvv ||
                    !cardDetails.nameOnCard))
              }
            >
              {activeStep === 2 ? "Pay Now" : "Next"}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Hotel;