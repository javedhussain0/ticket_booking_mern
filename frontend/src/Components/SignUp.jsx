import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import {styled } from "@mui/system";

const GradientText = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(to right, #FF4081, black)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontSize: "2.5rem",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: theme.spacing(2),
}));

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Successfully signed up!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Successfully signed up with Google!");
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
       
      }}>SignUp Form</Typography>
      <GradientText>Welcome to Your New Journey! 🚀</GradientText>
      <Typography
        variant="body1"
        sx={{
          color: "#5f6368",
          textAlign: "center",
          marginBottom: 3,
        }}
      >
        Let's create your account and get started with us!
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
        onClick={handleEmailSignUp}
        sx={{ marginTop: 2 }}
      >
        Sign Up
      </Button>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        startIcon={<FcGoogle />}
        onClick={handleGoogleSignUp}
        sx={{ marginTop: 2 }}
      >
        Sign Up with Google
      </Button>
    </Box>
  );
};

export default SignUp;
