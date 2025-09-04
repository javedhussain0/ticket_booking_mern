import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Paper,
  Grid,
  InputAdornment,
} from "@mui/material";
import {
  Hotel,
  Flight,
  DirectionsCar,
  Attractions,
  LocalTaxi,
  CalendarToday,
  Person,
  Bed,
} from "@mui/icons-material";
import styled from "styled-components";

// Styled wrapper for search box
const SearchBox = styled(Paper)`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  border: 2px solid #febb02;
  margin-top: -40px;
  position: relative;
  z-index: 5;
`;

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Category menu
  const categories = [
    { label: "Stays", icon: <Bed />, path: "/hotel-booking" },
    { label: "Flights", icon: <Flight />, path: "/flight-booking" },
    { label: "Flight + Hotel", icon: <Hotel />, path: "/combo-booking" },
    { label: "Car rental", icon: <DirectionsCar />, path: "/car-rental" },
    { label: "Attractions", icon: <Attractions />, path: "/attractions" },
    { label: "Airport taxis", icon: <LocalTaxi />, path: "/airport-taxi" },
  ];

  return (
    <>
      {/* Hero Section with Category Navbar */}
      <Box sx={{ background: "#003580", color: "#fff", py: 6, textAlign: "center" }}>
        {/* Category Navbar */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 4, flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <Button
              key={cat.label}
              startIcon={cat.icon}
              onClick={() => navigate(cat.path)}
              sx={{
                color: "#fff",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "25px",
                px: 3,
                textTransform: "none",
                "&:hover": { background: "rgba(255,255,255,0.2)" },
              }}
            >
              {cat.label}
            </Button>
          ))}
        </Box>

        {/* Title + Subtitle */}
        <Typography variant="h4" fontWeight="bold">
          Find your next stay
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, color: "rgba(255,255,255,0.8)" }}>
          Search low prices on hotels, flights, homes and much more...
        </Typography>
      </Box>

      {/* Search Box */}
      <Container>
        <SearchBox elevation={3}>
          <TextField
            fullWidth
            placeholder="Where are you going?"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Hotel />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            placeholder="Check-in date"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            placeholder="Check-out date"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            fullWidth
            defaultValue="2 Adults · 0 Children · 1 Room"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="2 Adults · 0 Children · 1 Room">2 Adults · 0 Children · 1 Room</MenuItem>
            <MenuItem value="4 Adults · 2 Children · 2 Rooms">4 Adults · 2 Children · 2 Rooms</MenuItem>
          </TextField>
          <Button
            variant="contained"
            sx={{
              background: "#0071c2",
              fontWeight: "bold",
              px: 5,
              "&:hover": { background: "#005fa3" },
            }}
          >
            Search
          </Button>
        </SearchBox>
      </Container>

      {/* Offers Section */}
      <Container sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Offers
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Promotions, deals and special offers for you
        </Typography>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1501117716987-c8e1ecb210fc?auto=format&fit=crop&w=900&q=80')",
                backgroundSize: "cover",
                color: "#fff",
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Typography variant="h6">Live the dream in a holiday home</Typography>
              <Button variant="contained" sx={{ mt: 2, background: "#003580" }}>
                Book yours
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3, minHeight: 200 }}>
              <Typography variant="h6" gutterBottom>
                Quick escape, quality time
              </Typography>
              <Typography color="text.secondary">
                Save up to 20% with a Getaway Deal
              </Typography>
              <Button variant="contained" sx={{ mt: 2, background: "#003580" }}>
                Save on stays
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
