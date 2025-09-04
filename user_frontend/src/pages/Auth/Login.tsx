import { useState, ChangeEvent, FormEvent } from "react";
import Spline from "@splinetool/react-spline";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Box, useTheme } from "@mui/material";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const ThreeDContainer = styled.div`
  height: 100%;
  width: 50%;
  background-color: black;
`;

const FormContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* circles absolute yaha base honge */
  overflow: hidden;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #333;
  }
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;

  span {
    color: blue;
    cursor: pointer;
    text-decoration: underline;
  }
`;

type FormState = {
  email: string;
  password: string;
  role: "admin" | "rider";
};

const circles = [
  { style: { top: "5%", left: "10%" }, size: 100, delay: 0 },
  { style: { top: "25%", right: "20%" }, size: 80, delay: 0.3 },
  { style: { bottom: "20%", left: "15%" }, size: 120, delay: 0.6 },
  { style: { bottom: "10%", right: "10%" }, size: 70, delay: 0.9 },
  { style: { top: "5%", right: "40%" }, size: 60, delay: 1.2 },
  { style: { top: "50%", right: "40%" }, size: 60, delay: 1.3 },
  { style: { top: "20%", right: "40%" }, size: 60, delay: 1.4 },
  { style: { top: "10%", right: "40%" }, size: 60, delay: 1.5 },
  { style: { top: "60%", right: "40%" }, size: 60, delay: 1.6 },
  { style: { top: "60%", right: "40%" }, size: 60, delay: 1.7 },
  { style: { top: "23%", right: "40%" }, size: 60, delay: 1.8 },
  { style: { top: "10%", right: "40%" }, size: 60, delay: 1.9 },
  { style: { top: "33%", right: "40%" }, size: 60, delay: 1.1 },
  { style: { top: "34%", right: "40%" }, size: 60, delay: 1.3 },
  { style: { top: "100%", right: "40%" }, size: 60, delay: 1.2 },
  { style: { top: "80%", right: "40%" }, size: 60, delay: 1.5},
];

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    role: "rider",
  });

  const theme = useTheme();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value } as FormState));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(isSignUp ? "Sign Up data:" : "Sign In data:", form);
  };

  return (
    <Container>
      <ThreeDContainer>
        <Spline scene="https://prod.spline.design/2EzUIorF-QB7Tpck/scene.splinecode" />
      </ThreeDContainer>

      <FormContainer>
        {circles.map((circle, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ delay: circle.delay, duration: 0.8 }}
            style={{
              ...circle.style,
              width: circle.size,
              height: circle.size,
              borderRadius: "50%",
              position: "absolute",
              background: `linear-gradient(to bottom right, ${theme.palette.warning.light}, ${theme.palette.warning.dark})`,
              filter: "blur(20px)", // soft bubble look
              zIndex: 1,
            }}
          />
        ))}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: "relative",
            bgcolor: theme.palette.background.paper,
            p: 4,
            borderRadius: 3,
            boxShadow: theme.shadows[6],
            width: "80%",
            maxWidth: 400,
            zIndex: 2,
          }}
        >
          <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {isSignUp && (
            <Select name="role" value={form.role} onChange={handleChange}>
              <option value="rider">Rider</option>
              <option value="admin">Admin</option>
            </Select>
          )}

          <Button type="submit">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

          <ToggleText>
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <span onClick={() => setIsSignUp(false)}>Sign In</span>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <span onClick={() => setIsSignUp(true)}>Sign Up</span>
              </>
            )}
          </ToggleText>
        </Box>
      </FormContainer>
    </Container>
  );
};

export default Login;
