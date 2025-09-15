import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Flight as FlightIcon, Search as SearchIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

function Flight() {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departure: '',
    returnDate: '',
    travelers: 1,
    class: 'economy'
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/flights/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams),
      });
      const data = await response.json();
      console.log('Flights found:', data);
    } catch (error) {
      console.error('Error searching flights:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <FlightIcon sx={{ mr: 2 }} /> Flight Booking
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>Find the Best Flights</Typography>
        <Box component="form" onSubmit={handleSearch} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label="From" value={searchParams.from}
                onChange={(e) => setSearchParams({...searchParams, from: e.target.value})} required />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label="To" value={searchParams.to}
                onChange={(e) => setSearchParams({...searchParams, to: e.target.value})} required />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField fullWidth label="Departure" type="date" InputLabelProps={{ shrink: true }}
                value={searchParams.departure} onChange={(e) => setSearchParams({...searchParams, departure: e.target.value})} required />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField fullWidth label="Return (Optional)" type="date" InputLabelProps={{ shrink: true }}
                value={searchParams.returnDate} onChange={(e) => setSearchParams({...searchParams, returnDate: e.target.value})} />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField fullWidth label="Travelers" type="number" value={searchParams.travelers}
                onChange={(e) => setSearchParams({...searchParams, travelers: parseInt(e.target.value)})}
                required inputProps={{ min: 1, max: 10 }} />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select value={searchParams.class} label="Class"
                  onChange={(e) => setSearchParams({...searchParams, class: e.target.value})}>
                  <MenuItem value="economy">Economy</MenuItem>
                  <MenuItem value="premium">Premium Economy</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="first">First Class</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" size="large" startIcon={<SearchIcon />}>
                Search Flights
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Typography variant="h6" gutterBottom>Popular Routes</Typography>
      <Grid container spacing={3}>
        {[
          { from: 'NYC', to: 'LON', price: '$499' },
          { from: 'LAX', to: 'PAR', price: '$599' },
          { from: 'SFO', to: 'TOK', price: '$699' },
          { from: 'CHI', to: 'BER', price: '$549' }
        ].map((route, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card elevation={2}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">{route.from}</Typography>
                  <ArrowForwardIcon />
                  <Typography variant="h6">{route.to}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  Round trip from {route.price}
                </Typography>
                <Button variant="outlined" fullWidth>View Deals</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Flight;
