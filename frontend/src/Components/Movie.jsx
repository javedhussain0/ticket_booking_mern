import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, Card, CardContent, Chip } from '@mui/material';
import { Movie as MovieIcon, Search as SearchIcon } from '@mui/icons-material';

function Movie() {
  const [searchParams, setSearchParams] = useState({
    location: '',
    date: '',
    movie: '',
    tickets: 1
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/movies/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams),
      });
      const data = await response.json();
      console.log('Movies found:', data);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <MovieIcon sx={{ mr: 2 }} /> Movie Booking
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>Book Movie Tickets</Typography>
        <Box component="form" onSubmit={handleSearch} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Location" value={searchParams.location}
                onChange={(e) => setSearchParams({...searchParams, location: e.target.value})} required />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label="Date" type="date" InputLabelProps={{ shrink: true }}
                value={searchParams.date} onChange={(e) => setSearchParams({...searchParams, date: e.target.value})} required />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label="Movie" value={searchParams.movie}
                onChange={(e) => setSearchParams({...searchParams, movie: e.target.value})} required />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField fullWidth label="Tickets" type="number" value={searchParams.tickets}
                onChange={(e) => setSearchParams({...searchParams, tickets: parseInt(e.target.value)})}
                required inputProps={{ min: 1, max: 10 }} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" size="large" startIcon={<SearchIcon />}>
                Search Movies
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Typography variant="h6" gutterBottom>Now Showing</Typography>
      <Grid container spacing={3}>
        {[
          { title: 'The Last Adventure', rating: 'PG-13', duration: '2h 15m' },
          { title: 'Space Odyssey', rating: 'PG', duration: '2h 30m' },
          { title: 'Dark Secrets', rating: 'R', duration: '1h 55m' },
          { title: 'Ocean Dreams', rating: 'PG', duration: '2h 5m' }
        ].map((movie, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card elevation={2}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <MovieIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" gutterBottom>{movie.title}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
                  <Chip label={movie.rating} size="small" />
                  <Chip label={movie.duration} size="small" variant="outlined" />
                </Box>
                <Button variant="outlined">Book Tickets</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Movie;
