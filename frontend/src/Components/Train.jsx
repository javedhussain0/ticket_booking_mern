import axios from 'axios';
import { useState } from 'react';
import {
  Container, Typography, Button, Card, CardContent, TextField, MenuItem, Grid, Box,
  Paper, Divider, Chip, Stepper, Step, StepLabel, FormControl, RadioGroup,
  FormControlLabel, Radio, FormLabel, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, useTheme
} from '@mui/material';
import { Search as SearchIcon, ArrowForward as ArrowForwardIcon, CheckCircle as CheckCircleIcon, Facebook as FacebookIcon, Twitter as TwitterIcon, Instagram as InstagramIcon } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';

const trains = [
  { number: "12301", name: "Rajdhani Express", from: "NDLS", to: "MUM", departure: "16:00", arrival: "08:30", duration: "16h 30m", classes: { "1A": { available: true, fare: 4500 }, "2A": { available: true, fare: 3200 }, "3A": { available: false, fare: 2200 } } },
  { number: "12259", name: "Sealdah Duronto", from: "NDLS", to: "KOL", departure: "22:30", arrival: "09:45", duration: "11h 15m", classes: { "2A": { available: true, fare: 2800 }, "3A": { available: true, fare: 1900 }, "SL": { available: true, fare: 950 } } },
  { number: "12627", name: "Karnataka Express", from: "NDLS", to: "BAN", departure: "19:15", arrival: "06:30", duration: "35h 15m", classes: { "1A": { available: false, fare: 5200 }, "2A": { available: true, fare: 3500 }, "3A": { available: true, fare: 2500 }, "SL": { available: true, fare: 1200 } } }
];

const stations = { "NDLS": "New Delhi", "MUM": "Mumbai Central", "CHE": "Chennai Central", "BAN": "Bangalore City", "KOL": "Kolkata Howrah", "HYD": "Hyderabad Deccan" };

const classOptions = [
  { value: 'all', label: 'All Classes' },
  { value: '1A', label: 'First AC (1A)' },
  { value: '2A', label: 'Second AC (2A)' },
  { value: '3A', label: 'Third AC (3A)' },
  { value: 'SL', label: 'Sleeper (SL)' }
];

const steps = ['Select Train', 'Passenger Details', 'Payment', 'Confirmation'];

function Train() {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [journeyDate, setJourneyDate] = useState('');
  const [classType, setClassType] = useState('all');
  const [filteredTrains, setFilteredTrains] = useState(trains);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [passengerDetails, setPassengerDetails] = useState({ name: '', age: '', gender: '', berthPreference: 'no' });
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const theme = useTheme();

  // Search trains
  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = trains.filter(train =>
      train.from === fromStation &&
      train.to === toStation &&
      (classType === 'all' || (train.classes[classType] && train.classes[classType].available))
    );
    setFilteredTrains(filtered);
  };

  const handleTrainSelect = (train) => {
    setSelectedTrain(train);
    setActiveStep(1);
    setBookingDialogOpen(true);
  };

  const handlePassengerChange = (e) => setPassengerDetails({ ...passengerDetails, [e.target.name]: e.target.value });

  // Card input handlers
  const handleCardChange = (e) => {
    const { name, value } = e.target;

    if (name === 'number') {
      const sanitized = value.replace(/\D/g, '').slice(0, 12);
      setCardDetails({ ...cardDetails, [name]: sanitized });
    } else if (name === 'cvv') {
      const sanitized = value.replace(/\D/g, '').slice(0, 3);
      setCardDetails({ ...cardDetails, [name]: sanitized });
    } else if (name === 'expiry') {
      let sanitized = value.replace(/\D/g, '').slice(0, 4);
      if (sanitized.length > 2) sanitized = sanitized.slice(0, 2) + '/' + sanitized.slice(2);
      setCardDetails({ ...cardDetails, [name]: sanitized });
    }
  };

  const handleBookingSubmit = async () => {
    if (!passengerDetails.name || !passengerDetails.age || !passengerDetails.gender || !journeyDate) {
      alert("Fill all passenger details.");
      return;
    }
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
      alert("Fill payment details.");
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
      payment: cardDetails
    };

    try {
      const res = await axios.post("http://localhost:5000/book", bookingData);
      if (res.status === 200) setActiveStep(3);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Try again.");
    }
  };

  const resetBooking = () => {
    setSelectedTrain(null);
    setActiveStep(0);
    setPassengerDetails({ name: '', age: '', gender: '', berthPreference: 'no' });
    setCardDetails({ number: '', expiry: '', cvv: '' });
    setBookingDialogOpen(false);
  };

  const formatDate = (date) => new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {/* Search Form */}
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" gutterBottom align="center" color="primary">Search Trains</Typography>
            <Box component="form" onSubmit={handleSearch} sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <TextField select fullWidth label="From Station" value={fromStation} onChange={(e) => setFromStation(e.target.value)} required>
                    <MenuItem value="">Select Station</MenuItem>
                    {Object.entries(stations).map(([code, name]) => <MenuItem key={code} value={code}>{name} ({code})</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField select fullWidth label="To Station" value={toStation} onChange={(e) => setToStation(e.target.value)} required>
                    <MenuItem value="">Select Station</MenuItem>
                    {Object.entries(stations).map(([code, name]) => <MenuItem key={code} value={code}>{name} ({code})</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField fullWidth label="Journey Date" type="date" InputLabelProps={{ shrink: true }} value={journeyDate} onChange={(e) => setJourneyDate(e.target.value)} required />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField select fullWidth label="Class" value={classType} onChange={(e) => setClassType(e.target.value)} required>
                    {classOptions.map((opt) => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button type="submit" fullWidth variant="contained" color="secondary" size="large" startIcon={<SearchIcon />} sx={{ height: '56px' }}>Search</Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {/* Train Cards */}
          <Typography variant="h5" gutterBottom>Available Trains</Typography>
          {filteredTrains.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary">No trains found for your search criteria.</Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredTrains.map((train) => (
                <Grid item xs={12} key={train.number}>
                  <Card elevation={3}>
                    <CardContent>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={3}>
                          <Typography variant="h6" color="primary">{train.name}</Typography>
                          <Typography variant="body2" color="textSecondary">#{train.number}</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box textAlign="center">
                              <Typography variant="body2" color="textSecondary">{stations[train.from]}</Typography>
                              <Typography variant="h6">{train.departure}</Typography>
                            </Box>
                            <Box textAlign="center" sx={{ px: 1 }}>
                              <ArrowForwardIcon color="primary" />
                              <Typography variant="caption" display="block">{train.duration}</Typography>
                            </Box>
                            <Box textAlign="center">
                              <Typography variant="body2" color="textSecondary">{stations[train.to]}</Typography>
                              <Typography variant="h6">{train.arrival}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Typography variant="body2" color="textSecondary">Available Classes</Typography>
                          <Box sx={{ mt: 1 }}>
                            {Object.entries(train.classes).filter(([_, info]) => info.available).map(([c]) => <Chip key={c} label={c} size="small" color="primary" variant="outlined" sx={{ mr: 0.5, mb: 0.5 }} />)}
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Typography variant="body2" color="textSecondary">Starting Fare</Typography>
                          <Typography variant="h6" color="secondary">₹{Math.min(...Object.values(train.classes).filter(i => i.available).map(i => i.fare))}</Typography>
                        </Grid>
                        <Grid item xs={12} md={1}>
                          <Button variant="contained" color="primary" onClick={() => handleTrainSelect(train)}>Book</Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>

        {/* Booking Dialog */}
        <Dialog open={bookingDialogOpen} onClose={() => setBookingDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Stepper activeStep={activeStep} sx={{ pt: 2, pb: 3 }}>
              {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
            </Stepper>
          </DialogTitle>
          <DialogContent>
            {activeStep === 0 && selectedTrain && (
              <Box>
                <Typography variant="h6" gutterBottom>Train Details</Typography>
                <Typography variant="body1" gutterBottom>{selectedTrain.name} (#{selectedTrain.number})</Typography>
                <Typography variant="body2" color="textSecondary">{stations[selectedTrain.from]} to {stations[selectedTrain.to]} on {formatDate(journeyDate)}</Typography>
              </Box>
            )}

            {activeStep === 1 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>Passenger Details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Passenger Name" name="name" value={passengerDetails.name} onChange={handlePassengerChange} required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Age" name="age" type="number" value={passengerDetails.age} onChange={handlePassengerChange} required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset">
                      <FormLabel>Gender</FormLabel>
                      <RadioGroup row name="gender" value={passengerDetails.gender} onChange={handlePassengerChange}>
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField select fullWidth label="Berth Preference" name="berthPreference" value={passengerDetails.berthPreference} onChange={handlePassengerChange}>
                      <MenuItem value="no">No Preference</MenuItem>
                      <MenuItem value="lower">Lower</MenuItem>
                      <MenuItem value="middle">Middle</MenuItem>
                      <MenuItem value="upper">Upper</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeStep === 2 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>Payment Details</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>Demo payment form</Typography>
                <TextField
                  fullWidth
                  label="Card Number"
                  name="number"
                  value={cardDetails.number}
                  onChange={handleCardChange}
                  sx={{ mt: 2 }}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
                <Grid container spacing={2} sx={{ mt: 0.5 }}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date (MM/YY)"
                      name="expiry"
                      value={cardDetails.expiry}
                      onChange={handleCardChange}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardChange}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeStep === 3 && (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Booking Confirmed!</Typography>
                <Typography variant="body2" color="textSecondary">PNR: <strong>PNR123456</strong></Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            {activeStep < 3 && <Button onClick={() => setBookingDialogOpen(false)}>Cancel</Button>}
            {activeStep === 3 ? <Button variant="contained" onClick={resetBooking}>Book Another Ticket</Button> : (
              <Button variant="contained" onClick={() => {
                if (activeStep === 0) setActiveStep(1);
                else if (activeStep === 1) setActiveStep(2);
                else if (activeStep === 2) handleBookingSubmit();
              }} disabled={activeStep === 1 && (!passengerDetails.name || !passengerDetails.age || !passengerDetails.gender)}>
                {activeStep === 2 ? 'Pay Now' : 'Next'}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default Train;
