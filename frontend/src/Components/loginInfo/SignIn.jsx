import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import { styled } from "@mui/system";


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

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Successfully signed in!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Successfully signed in with Google!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box>
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
        SignIN Form
      </Typography>
      <GradientText>Welcome to Our Bookin Web!</GradientText>
      <Typography
        variant="body1"
        sx={{
          color: "#5f6368",
          textAlign: "center",
          marginBottom: 3,
        }}
      >
        Let's Sign In  Your Account To Explore More!
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
    </Box>
  );
};

export default SignIn;
