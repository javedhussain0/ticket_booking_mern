import { Box, Typography, Container, Paper, List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Styled scrollable container
const ScrollContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  padding: "20px 30px",
  paddingBottom: "200px",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "linear-gradient(180deg, #FF4081, #7B1FA2)",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "linear-gradient(180deg, #E91E63, #6A1B9A)",
  },
  scrollbarWidth: "thin",
  scrollbarColor: "#FF4081 #f1f1f1",
  [theme.breakpoints.down("sm")]: {
    padding: "20px 12px",
  },
}));

const AboutSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const values = [
    {
      title: "Fan-First Approach",
      desc: "We place fans at the heart of everything we do, constantly innovating to enhance their journey from discovery to attendance.",
      color: "#7B1FA2",
    },
    {
      title: "Trust & Transparency",
      desc: "We are committed to being a reliable partner, offering clear pricing, secure transactions, and honest communication.",
      color: "#7B1FA2",
    },
    {
      title: "Passion for Live Events",
      desc: "Our team is fueled by a shared love for live events, driving us to create unforgettable experiences for every customer.",
      color: "#7B1FA2",
    },
    {
      title: "Continuous Innovation",
      desc: "We constantly seek new ways to enhance our platform and services, leveraging cutting-edge technology for better user experiences.",
      color: "#7B1FA2",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#f9fafb",
        py: { xs: 6, md: 10 },
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight="bold"
            gutterBottom
            sx={{
              background: "linear-gradient(90deg, #FF4081, #7B1FA2, #000)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% 100%",
              animation: "gradientShift 3s ease-in-out infinite",
              "@keyframes gradientShift": {
                "0%": { backgroundPosition: "0% 50%" },
                "50%": { backgroundPosition: "100% 50%" },
                "100%": { backgroundPosition: "0% 50%" },
              },
            }}
          >
            Connecting Fans to Unforgettable Experiences
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "subtitle1"}
            align="center"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: "600px", mx: "auto", lineHeight: 1.6 }}
          >
            Discover the story behind the tickets that bring millions together for unforgettable moments.
          </Typography>
        </Box>

        {/* Paper with scrollable content */}
        <Paper
          elevation={2}
          sx={{
            p: { xs: 0, sm: 0, md: 0 },
            borderRadius: 4,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            },
            height: "70vh",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
          }}
        >
          <ScrollContainer>
            {/* Mission Section */}
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.7)",
                borderLeft: "4px solid #FF4081",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#FF4081", display: "flex", alignItems: "center", gap: 1 }}
              >
                🎯 Our Mission
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                Our mission is to seamlessly connect people to the live events they love. We are dedicated to creating a simple, secure, and superior ticketing experience, making it easier than ever for fans to discover and attend concerts, sports, theater, and more. We believe in the power of live entertainment to create lasting memories and bring people together.
              </Typography>
            </Box>

            {/* Values Section */}
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.7)",
                borderLeft: "4px solid #7B1FA2",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#7B1FA2", display: "flex", alignItems: "center", gap: 1 }}
              >
                💫 Our Values
              </Typography>
              <List sx={{ pt: 0 }}>
                {values.map((item, i) => (
                  <ListItem
                    key={i}
                    disableGutters
                    sx={{
                      alignItems: "flex-start",
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      transition: "all 0.2s ease",
                      "&:hover": { backgroundColor: "rgba(123, 31, 162, 0.05)", transform: "translateX(4px)" },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                      <CheckCircleIcon sx={{ color: item.color, fontSize: "1.5rem" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#333" }}>{item.title}</Typography>}
                      secondary={<Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mt: 0.5 }}>{item.desc}</Typography>}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* History Section */}
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.7)",
                borderLeft: "4px solid #000",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#000", display: "flex", alignItems: "center", gap: 1 }}
              >
                📜 Our History
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: { xs: "0.9rem", sm: "1rem" }, mb: 2 }}>
                Founded in 2010 with a vision to revolutionize the ticketing industry, TicketBookingSystem began as a small startup with a big idea: make buying tickets as enjoyable as the event itself. From our humble beginnings, we've grown into a globally recognized platform, trusted by millions. Our journey is a testament to our unwavering commitment to innovation, strong partnerships with venues and artists, and our dedication to the fans we serve.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                Over the years, we've expanded our services to include premium experiences, last-minute deals, and personalized recommendations. Our commitment to excellence has earned us numerous industry awards and the trust of over 10 million satisfied customers worldwide.
              </Typography>
            </Box>

            {/* Future Section */}
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.7)",
                borderLeft: "4px solid #4CAF50",
                mt: 3,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#4CAF50", display: "flex", alignItems: "center", gap: 1 }}
              >
                🚀 Our Future
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                As we look ahead, we're excited to introduce new features like virtual reality previews, AI-powered event recommendations, and seamless integration with travel services. Our goal is to create an end-to-end experience that makes every event unforgettable from the moment you book your ticket until the final encore.
              </Typography>
            </Box>
          </ScrollContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutSection;
