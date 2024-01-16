// src/components/Login.tsx
import React, { useState } from "react";
import { Button, TextField, Typography, Modal, Link } from "@mui/material";
import { login, signOut, signup } from "../../Firebase/user";
import Card from "../../UI/Card/Card";
import Container from "../../UI/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/Auth/AuthSlice";
import { dashboardActions } from "../../Store/Dashboard/DashboardSlice";
import { useNavigate } from "react-router";
import CircularProgressCentered from "../../UI/Loader/Loader";
import { State } from "@popperjs/core";
const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: any) => {
    return { isLoading: state.dashboard.isLoading }
  })
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(dashboardActions.setLoadingState(true))
    try {
      const userCredential = await login({
        email: formData?.email,
        password: formData?.password,
      });
      const user = { "uid": userCredential.user.uid };
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(authActions.login());
      navigate("/")
    } catch (error: { message: string } | any) {
      console.error("Login error:", error?.message);
      dispatch(dashboardActions.setLoadingState(false))
      setIsLoginFailed(true);
      
    }
    finally {
      setFormData({ email: "", password: "" });
      dispatch(dashboardActions.setLoadingState(false))
    }
  };
  const handleSignup = async () => {
    dispatch(dashboardActions.setLoadingState(true))
    try {
      await signup({
        email: formData?.email,
        password: formData?.password,
      });
    } catch (error: any) {
      setIsLoginFailed(true);
      console.error("Signup error:", error.message);
    } finally {
      setFormData({ email: "", password: "" });
      dispatch(dashboardActions.setLoadingState(false))
      navigate("/")
    }

  };
  const handleCloseModal = () => {
    setIsLoginFailed(false);
  };
  const getLoginContainer = () => {
    return (<Container className={"centered-container"}>
      <Card title={isLogin ? "Login" : "Signup"}>
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
            onClick={isLogin ? handleLogin : handleSignup}
          >
            {isLogin ? "LogIn" : "Sign Up"}
          </Button>
        </form>
        <Link style={{ cursor: 'pointer' }} onClick={async () => {
          if(!isLogin){
            await signOut();
          }
          setIsLogin(!isLogin)
        }}>{isLogin ? "New user signup" : "Already have an account"} </Link>
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

              size="large"
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
    </Container>);
  }
  return <>
    {isLoading ? <CircularProgressCentered /> : getLoginContainer()}
  </>

};

export default Login;
