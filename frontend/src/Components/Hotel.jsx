import { useState, useEffect } from "react";
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
  AppBar,
  Toolbar,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Hotel as HotelIcon,
  LocationOn as LocationIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
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

function Hotel() {
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    rooms: 1,
  });

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [view, setView] = useState("main");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setHotels(hotelData);
    setFilteredHotels(hotelData);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = hotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(searchParams.location.toLowerCase())
    );
    setFilteredHotels(filtered);
    setView("searchResults");
  };

  const handleExplore = (city) => {
    setSearchParams({ ...searchParams, location: city });
    const filtered = hotels.filter(
      (hotel) => hotel.location.toLowerCase() === city.toLowerCase()
    );
    setFilteredHotels(filtered);
    setView("searchResults");
  };

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    setDialogOpen(true);
  };

  const validateDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkInDate = new Date(searchParams.checkIn);
    const checkOutDate = new Date(searchParams.checkOut);

    if (!searchParams.checkIn || !searchParams.checkOut) {
      setError("Please select both check-in and check-out dates");
      setSnackbarOpen(true);
      return false;
    }

    if (checkInDate < today) {
      setError("Check-in date cannot be in the past");
      setSnackbarOpen(true);
      return false;
    }

    if (checkOutDate <= checkInDate) {
      setError("Check-out date must be after check-in date");
      setSnackbarOpen(true);
      return false;
    }

    return true;
  };

  const handleOpenBooking = () => {
    if (validateDates()) {
      setDialogOpen(false);
      setBookingDialogOpen(true);
    }
  };

  const handleBookNow = () => {
    if (!selectedHotel || !validateDates()) return;

    const bookingDetails = {
      hotel: selectedHotel.name,
      location: selectedHotel.location,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      guests: searchParams.guests,
      rooms: searchParams.rooms,
      price:
        selectedHotel.price *
        Math.ceil(
          (new Date(searchParams.checkOut) - new Date(searchParams.checkIn)) /
            (1000 * 60 * 60 * 24)
        ) *
        searchParams.rooms,
    };

    const query = new URLSearchParams(bookingDetails).toString();
    window.location.href = `http://localhost:5173/booking?${query}`;
  };

  const resetSearch = () => {
    setView("main");
    setSearchParams({
      location: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      rooms: 1,
    });
    setFilteredHotels(hotels);
  };

  // Calculate minimum dates for date inputs
  const today = new Date().toISOString().split("T")[0];
  const minCheckOut = searchParams.checkIn || today;

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedHotel || !searchParams.checkIn || !searchParams.checkOut)
      return 0;

    const nights = Math.ceil(
      (new Date(searchParams.checkOut) - new Date(searchParams.checkIn)) /
        (1000 * 60 * 60 * 24)
    );

    return selectedHotel.price * nights * searchParams.rooms;
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
          <Typography variant="h5" gutterBottom>
            Find Your Perfect Stay
          </Typography>
          <Box component="form" onSubmit={handleSearch} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
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
              <Grid
                item
                xs={12}
                sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<SearchIcon />}
                >
                  Search Hotels
                </Button>
                {view !== "main" && (
                  <Button
                    variant="outlined"
                    onClick={resetSearch}
                    startIcon={<ArrowBackIcon />}
                  >
                    Back to Main
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {view === "main" ? (
          <>
            <Typography variant="h6" gutterBottom>
              Popular Indian Destinations
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {popularDestinations.map((city) => (
                <Grid item xs={6} sm={4} md={3} key={city}>
                  <Card elevation={2} sx={{ height: "100%" }}>
                    <CardContent sx={{ textAlign: "center", p: 2 }}>
                      <LocationIcon
                        color="primary"
                        sx={{ fontSize: 40, mb: 1 }}
                      />
                      <Typography variant="h6">{city}</Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ mt: 2 }}
                        onClick={() => handleExplore(city)}
                      >
                        Explore
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Featured Hotels */}
            <Typography variant="h6" gutterBottom>
              Featured Hotels
            </Typography>
            <Grid container spacing={2}>
              {hotels.slice(0, 4).map((hotel) => (
                <Grid item xs={12} md={6} key={hotel.id}>
                  <Card
                    sx={{
                      display: "flex",
                      cursor: "pointer",
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                    onClick={() => handleHotelSelect(hotel)}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: "100%", sm: 150 },
                        height: { xs: 200, sm: 140 },
                      }}
                      image={hotel.image}
                      alt={hotel.name}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6">{hotel.name}</Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} />{" "}
                          {hotel.location}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
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
                        <Typography
                          variant="body2"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {hotel.description}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                          ₹{hotel.price.toLocaleString("en-IN")}/night
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          // Search Results View
          <>
            <Typography variant="h6" gutterBottom>
              {filteredHotels.length > 0
                ? `Hotels in ${searchParams.location || "selected destination"}`
                : "No hotels found for your search criteria"}
            </Typography>

            <Grid container spacing={2}>
              {filteredHotels.map((hotel) => (
                <Grid item xs={12} key={hotel.id}>
                  <Card
                    sx={{
                      display: "flex",
                      cursor: "pointer",
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                    onClick={() => handleHotelSelect(hotel)}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: "100%", sm: 250 },
                        height: { xs: 200, sm: 180 },
                      }}
                      image={hotel.image}
                      alt={hotel.name}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6">{hotel.name}</Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} />{" "}
                          {hotel.location}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
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
                        <Typography
                          variant="body2"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {hotel.description}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                          ₹{hotel.price.toLocaleString("en-IN")}/night
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Hotel Detail Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="md"
          fullWidth
          sx={{
            "& .MuiDialog-container": {
              alignItems: "flex-start",
            },
            "& .MuiDialog-paper": {
              margin: "16px",
              maxHeight: "calc(100% - 32px)",
            },
          }}
        >
          {selectedHotel && (
            <>
              <AppBar position="sticky" elevation={0}>
                <Toolbar>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {selectedHotel.name}
                  </Typography>
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={() => setDialogOpen(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
              <DialogContent dividers sx={{ overflowY: "auto" }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={selectedHotel.image}
                  alt={selectedHotel.name}
                  sx={{ mb: 2, width: "100%", objectFit: "cover" }}
                />
                <Typography variant="h5" gutterBottom>
                  {selectedHotel.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LocationIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    {selectedHotel.location}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Rating
                    value={selectedHotel.rating}
                    precision={0.1}
                    readOnly
                  />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {selectedHotel.rating}
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  {selectedHotel.description}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  ₹{selectedHotel.price.toLocaleString("en-IN")}/night
                </Typography>
              </DialogContent>
              <DialogActions
                sx={{
                  position: "sticky",
                  bottom: 0,
                  bgcolor: "background.paper",
                }}
              >
                <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={handleOpenBooking}>
                  Continue to Book
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Booking Form Dialog */}
        <Dialog
          open={bookingDialogOpen}
          onClose={() => setBookingDialogOpen(false)}
          maxWidth="md"
          fullWidth
          sx={{
            "& .MuiDialog-container": {
              alignItems: "flex-start",
            },
            "& .MuiDialog-paper": {
              margin: "16px",
              maxHeight: "calc(100% - 32px)",
            },
          }}
        >
          {selectedHotel && (
            <>
              <AppBar position="sticky" elevation={0}>
                <Toolbar>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Complete Your Booking
                  </Typography>
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={() => setBookingDialogOpen(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
              <DialogContent dividers sx={{ overflowY: "auto" }}>
                <Typography variant="h6" gutterBottom>
                  {selectedHotel.name}
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Booking Details:
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 3 }}>
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

                  <Box
                    sx={{ p: 2, backgroundColor: "grey.50", borderRadius: 1 }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Price Summary
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography>
                        ₹{selectedHotel.price.toLocaleString("en-IN")} x{" "}
                        {Math.ceil(
                          (new Date(searchParams.checkOut) -
                            new Date(searchParams.checkIn)) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        nights
                      </Typography>
                      <Typography>
                        ₹
                        {(
                          selectedHotel.price *
                          Math.ceil(
                            (new Date(searchParams.checkOut) -
                              new Date(searchParams.checkIn)) /
                              (1000 * 60 * 60 * 24)
                          )
                        ).toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography>Rooms: {searchParams.rooms}</Typography>
                      <Typography>
                        ₹{calculateTotal().toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                        pt: 2,
                        borderTop: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Typography variant="h6">Total</Typography>
                      <Typography variant="h6" color="primary">
                        ₹{calculateTotal().toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions
                sx={{
                  position: "sticky",
                  bottom: 0,
                  bgcolor: "background.paper",
                }}
              >
                <Button
                  onClick={() => {
                    setBookingDialogOpen(false);
                    setDialogOpen(true);
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleBookNow}
                  disabled={!searchParams.checkIn || !searchParams.checkOut}
                >
                  Confirm Booking
                </Button>
              </DialogActions>
            </>
          )}
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
      </Box>
    </Container>
  );
}

export default Hotel;
