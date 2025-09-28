import {
  Box,
  Typography,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        color: "#ffffff",
        padding: "40px 20px",
        marginTop: "50px",
      }}
    >
      {/* Services Section */}
      <Box sx={{ marginBottom: "40px" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "30px",
            color: "#fff",
          }}
        >
          Explore Our Services
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          {/* Train Reservation */}
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                backgroundColor: "#1a1a1a", 
                height: "100%",
                transition: "all 0.3s ease",
                cursor: "pointer",
                '&:hover': {
                  transform: "translateY(-8px)",
                  backgroundColor: "#2a2a2a",
                  boxShadow: "0 10px 25px rgba(255, 107, 53, 0.3)",
                }
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#ff6b35",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    transition: "all 0.3s ease",
                  }}
                >
                  Save up to 15% OFF
                </Typography>
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  Train Reservation
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Hotel Booking */}
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                backgroundColor: "#1a1a1a", 
                height: "100%",
                transition: "all 0.3s ease",
                cursor: "pointer",
                '&:hover': {
                  transform: "translateY(-8px)",
                  backgroundColor: "#2a2a2a",
                  boxShadow: "0 10px 25px rgba(33, 150, 243, 0.3)",
                }
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#2196f3",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    transition: "all 0.3s ease",
                  }}
                >
                  Save up to 50% OFF
                </Typography>
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  Hotel Booking
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Flight Booking */}
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                backgroundColor: "#1a1a1a", 
                height: "100%",
                transition: "all 0.3s ease",
                cursor: "pointer",
                '&:hover': {
                  transform: "translateY(-8px)",
                  backgroundColor: "#2a2a2a",
                  boxShadow: "0 10px 25px rgba(255, 152, 0, 0.3)",
                }
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#ff9800",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    transition: "all 0.3s ease",
                  }}
                >
                  Save up to 20% OFF
                </Typography>
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  Flight Booking
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Footer Links Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Typography
            variant="h5"
            sx={{ 
              fontWeight: "bold", 
              marginBottom: "20px",
              color: "#ff6b35"
            }}
          >
            Online Ticket Booking
          </Typography>
          <Typography variant="body2" sx={{ color: "#999", lineHeight: 1.6 }}>
            Your one-stop solution for all booking needs. Book trains, 
            hotels, and flights with amazing discounts and great service.
          </Typography>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography
            variant="h6"
            sx={{ 
              fontWeight: "bold", 
              marginBottom: "15px",
              color: "#4caf50"
            }}
          >
            What We Do
          </Typography>
          {['Features', 'Blog', 'Security', 'For Business'].map((item) => (
            <Typography 
              key={item}
              variant="body2" 
              sx={{ 
                color: "#ccc", 
                marginBottom: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: "4px 8px",
                borderRadius: "4px",
                '&:hover': {
                  color: "#4caf50",
                  backgroundColor: "rgba(76, 175, 80, 0.1)",
                  transform: "translateX(5px)",
                  fontWeight: "bold"
                }
              }}
            >
              {item}
            </Typography>
          ))}
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography
            variant="h6"
            sx={{ 
              fontWeight: "bold", 
              marginBottom: "15px",
              color: "#2196f3"
            }}
          >
            Who We Are
          </Typography>
          {['About Us', 'Careers', 'Brand Center', 'Privacy'].map((item) => (
            <Typography 
              key={item}
              variant="body2" 
              sx={{ 
                color: "#ccc", 
                marginBottom: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: "4px 8px",
                borderRadius: "4px",
                '&:hover': {
                  color: "#2196f3",
                  backgroundColor: "rgba(33, 150, 243, 0.1)",
                  transform: "translateX(5px)",
                  fontWeight: "bold"
                }
              }}
            >
              {item}
            </Typography>
          ))}
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography
            variant="h6"
            sx={{ 
              fontWeight: "bold", 
              marginBottom: "15px",
              color: "#ff9800"
            }}
          >
            Use Our Service
          </Typography>
          {['Mobile App', 'Desktop', 'Support'].map((item) => (
            <Typography 
              key={item}
              variant="body2" 
              sx={{ 
                color: "#ccc", 
                marginBottom: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: "4px 8px",
                borderRadius: "4px",
                '&:hover': {
                  color: "#ff9800",
                  backgroundColor: "rgba(255, 152, 0, 0.1)",
                  transform: "translateX(5px)",
                  fontWeight: "bold"
                }
              }}
            >
              {item}
            </Typography>
          ))}
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography
            variant="h6"
            sx={{ 
              fontWeight: "bold", 
              marginBottom: "15px",
              color: "#e91e63"
            }}
          >
            Need Help?
          </Typography>
          {['Contact Us', 'Help Center', 'Apps', 'Security Advisories'].map((item) => (
            <Typography 
              key={item}
              variant="body2" 
              sx={{ 
                color: "#ccc", 
                marginBottom: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: "4px 8px",
                borderRadius: "4px",
                '&:hover': {
                  color: "#e91e63",
                  backgroundColor: "rgba(233, 30, 99, 0.1)",
                  transform: "translateX(5px)",
                  fontWeight: "bold"
                }
              }}
            >
              {item}
            </Typography>
          ))}
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Box
        sx={{
          marginTop: "40px",
          borderTop: "1px solid #333",
          paddingTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: "#999" }}>
          2024 © Online Ticket Booking Service | Made by Javed Hussain
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {[
            { 
              icon: EmailIcon, 
              color: "#999", 
              hoverColor: "#ff6b35",
              href: "mailto:javedhussain03226@gmail.com" 
            },
            { 
              icon: WhatsAppIcon, 
              color: "#25D366", 
              hoverColor: "#25D366",
              href: "https://wa.me/8279797684" 
            },
            { 
              icon: FacebookIcon, 
              color: "#1877F2", 
              hoverColor: "#1877F2",
              href: "https://facebook.com/profile.php?id=100042511994576" 
            },
            { 
              icon: InstagramIcon, 
              color: "#E4405F", 
              hoverColor: "#E4405F",
              href: "https://instagram.com/aftababbas_" 
            },
            { 
              icon: YouTubeIcon, 
              color: "#FF0000", 
              hoverColor: "#FF0000",
              href: "https://youtube.com/@javedhussain6887" 
            }
          ].map((social, index) => (
            <IconButton
              key={index}
              href={social.href}
              target="_blank"
              sx={{ 
                color: social.color,
                backgroundColor: "#333",
                transition: "all 0.3s ease",
                '&:hover': {
                  backgroundColor: social.hoverColor,
                  color: "#fff",
                  transform: "scale(1.2)",
                  boxShadow: `0 0 15px ${social.hoverColor}`
                }
              }}
            >
              <social.icon />
            </IconButton>
          ))}
        </Box>

        <Select
          value="English"
          sx={{
            color: "#fff",
            backgroundColor: "#333",
            borderRadius: "20px",
            padding: "5px 15px",
            transition: "all 0.3s ease",
            "& .MuiSelect-icon": { color: "#fff" },
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            '&:hover': {
              backgroundColor: "#444",
              transform: "scale(1.05)",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)"
            }
          }}
        >
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Hindi">Hindi</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default Footer;