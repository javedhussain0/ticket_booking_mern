import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import { styled } from "@mui/system";
import { useNavigate, Link } from "react-router-dom";  // ✅ Added Link

const GradientText = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(to right, #333333, #388E3C)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontSize: "2.5rem",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: theme.spacing(2),
}));

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Successfully signed in!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Successfully signed in with Google!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "#fff" }}>
      {error && (
        <Typography color="error" marginBottom={2}>
          {error}
        </Typography>
      )}

      <Typography
        sx={{
          color: "#5f6368",
          textAlign: "center",
          marginBottom: 2,
          fontSize: "2.5rem",
          fontWeight: "bold",
        }}
      >
        Sign In
      </Typography>
      <GradientText>Welcome to Our Booking Web!</GradientText>
      <Typography
        variant="body1"
        sx={{
          color: "#5f6368",
          textAlign: "center",
          marginBottom: 3,
        }}
      >
        Let's sign in to your account and explore more!
      </Typography>

      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleEmailSignIn}
        sx={{ marginTop: 2 }}
      >
        Sign In
      </Button>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        startIcon={<FcGoogle />}
        onClick={handleGoogleSignIn}
        sx={{ marginTop: 2 }}
      >
        Sign In with Google
      </Button>

      <Box sx={{ textAlign: "center", marginTop: 3 }}>
        <Typography variant="body2" sx={{ color: "#5f6368" }}>
          Don’t have an account?{" "}
          <Link to="/signUp" style={{ color: "#388E3C", fontWeight: "bold", textDecoration: "none" }}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignIn;
