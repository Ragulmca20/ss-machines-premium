// src/components/Login.tsx
import React, { useState } from "react";
import { Button, TextField, Typography, Modal } from "@mui/material";
import { login, signup } from "../../Firebase/user";
import { useLocation } from "react-router-dom";
import Card from "../../UI/Card/Card";
import Container from "../../UI/Container/Container";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
const loginRoute = "/login";
const Login: React.FC = () => {
  const user = useSelector((state:RootState )=>{
    return state.auth;
  });
  console.log(user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const location = useLocation();
  const isLoginpage = location?.pathname === loginRoute;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const userCredential = await login({
        email: formData?.email,
        password: formData?.password,
      });
      const user = {"uid":userCredential.user.uid};
      localStorage.setItem("user",JSON.stringify(user));
    } catch (error: { message: string } | any) {
      console.error("Login error:", error?.message);
      setIsLoginFailed(true);
    }
  };
  const handleSignup = async () => {
    try {
      const userCredential = await signup({
        email: formData?.email,
        password: formData?.password,
      });
      const user = userCredential.user;
      console.log("Signup success!", user);
    } catch (error: any) {
      setIsLoginFailed(true);
      console.error("Signup error:", error.message);
    }
  };
  const handleCloseModal = () => {
    setIsLoginFailed(false);
  };
  return (
    <Container className={"centered-container"}>
      <Card title={isLoginpage ? "Login" : "Signup"}>
        <form style={{ width: "100%", marginTop: "1rem" }} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: "1.5rem 0 1rem", maxWidth: "150px" }}
            onClick={isLoginpage ? handleLogin : handleSignup}
          >
            {isLoginpage ? "Sign In" : "Sign Up"}
          </Button>
        </form>
        {/* Error Modal */}
        <Modal
          open={isLoginFailed}
          onClose={handleCloseModal}
          aria-labelledby="login-failure-modal"
          aria-describedby="login-failure-description"
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" id="login-failure-modal">
              Login Failed
            </Typography>
            <Typography variant="body2" id="login-failure-description">
              Your username or password is incorrect. Please try again.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseModal}
              size="medium"
              style={{
                maxWidth: "50px",
                maxHeight: "50px",
                minWidth: "50px",
                minHeight: "50px",
              }}
            >
              Close
            </Button>
          </div>
        </Modal>
      </Card>
    </Container>
  );
};

export default Login;
