import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";

// Gradient heading
const GradientText = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(to right, #FF4081, black)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

// Left side container (optional branding / image)
const LeftContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  background: "linear-gradient(to right, #FF4081, #FF80AB)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(4),
  color: "white",
  [theme.breakpoints.down("md")]: {
    display: "none", // hide on small screens
  },
}));

// Right side form container
const RightContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  padding: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

// Form wrapper
const FormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isFormValid =
    name.trim() &&
    email.trim() &&
    password.length >= 6 &&
    password === confirmPassword;

  const handleEmailSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      alert("Successfully signed up! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Successfully signed up with Google! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Left Side Branding */}
      <LeftContainer>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome Back!
        </Typography>
        <Typography sx={{ textAlign: "center", maxWidth: 300 }}>
          Start your journey with us and unlock new opportunities 🚀
        </Typography>
      </LeftContainer>

      {/* Right Side Form */}
      <RightContainer>
        <FormContainer>
          {error && (
            <Typography color="error" sx={{ marginBottom: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}

          <Typography
            sx={{
              color: "#5f6368",
              textAlign: "center",
              marginBottom: 2,
              fontSize: { xs: "1.5rem", sm: "2rem" },
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Typography>

          <GradientText>Welcome to Your New Journey! 🚀</GradientText>

          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            size="small"
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            size="small"
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            helperText={password && password.length < 6 ? "Password must be at least 6 characters" : " "}
            error={!!password && password.length < 6}
            size="small"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            error={!!confirmPassword && password !== confirmPassword}
            helperText={confirmPassword && password !== confirmPassword ? "Passwords do not match" : " "}
            size="small"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleEmailSignUp}
            disabled={!isFormValid}
            sx={{ mt: 1, py: 1 }}
          >
            Sign Up
          </Button>

          <Button
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={<FcGoogle />}
            onClick={handleGoogleSignUp}
            sx={{ py: 1, mt: 1 }}
          >
            Sign Up with Google
          </Button>

          <Box sx={{ textAlign: "center", mt: 2, pt: 1, borderTop: "1px solid #e0e0e0", width: "100%" }}>
            <Typography variant="body2" sx={{ color: "#5f6368" }}>
              Already have an account?{" "}
              <Link to="/auth" style={{ color: "#FF4081", fontWeight: "bold", textDecoration: "none" }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </FormContainer>
      </RightContainer>
    </Box>
  );
};

export default SignUp;
