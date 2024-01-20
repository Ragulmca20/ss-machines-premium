// src/components/Login.tsx
import React, { useEffect, useState } from "react";
import { Button, TextField, Link } from "@mui/material";
import { login, signOut, signup } from "../../Firebase/user";
import Card from "../../UI/Card/Card";
import Container from "../../UI/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/Auth/AuthSlice";
import { dashboardActions } from "../../Store/Dashboard/DashboardSlice";
import { useNavigate } from "react-router";
import CircularProgressCentered from "../../UI/Loader/Loader";
import { selectLoadingState } from "../../Store/Dashboard/DashboardSelector";
import { selectIsAuthenticated } from "../../Store/Admin/AdminSlice";
import ErrorModal from "../../UI/Error Modal/ErrorModal";
const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const isLoading = useSelector(selectLoadingState);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    isAuthenticated && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    dispatch(dashboardActions.setLoadingState(true));

    try {
      await login({
        email: formData?.email,
        password: formData?.password,
      });
      dispatch(authActions.login());
      navigate("/");
    } catch (error: { message: string } | any) {
      setErrorMessage("Invalid usernames or password please try again");
      dispatch(dashboardActions.setLoadingState(false));
      setIsLoginFailed(true);
    } finally {
      setFormData({ email: "", password: "" });
      dispatch(dashboardActions.setLoadingState(false));
    }
  };
  const handleSignup = async () => {
    dispatch(dashboardActions.setLoadingState(true));
    try {
      await signup({
        email: formData?.email,
        password: formData?.password,
      });
      navigate("/");
    } catch (error: any) {
      setErrorMessage("Email id already exists please try to login");
      dispatch(dashboardActions.setLoadingState(false));
      setIsLoginFailed(true);
      
    } finally {
      setFormData({ email: "", password: "" });
      dispatch(dashboardActions.setLoadingState(false));
    }
  };

  const handleCloseErrorModal = () => {
    setIsLoginFailed(false);
    setErrorMessage("");
  };

  const getLoginContainer = () => {
    return (
      <Container className={"centered-container"}>
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

          <Link
            style={{ cursor: "pointer" }}
            onClick={async () => {
              if (!isLogin) {
                await signOut();
              }
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? "New user signup" : "Already have an account"}{" "}
          </Link>
          {/* Error Modal */}
          {isLoginFailed && <ErrorModal
            open={isLoginFailed}
            onClose={handleCloseErrorModal}
            errorMessage={errorMessage}
          />}
        </Card>
      </Container>
    );
  };
  return <>{isLoading ? <CircularProgressCentered /> : getLoginContainer()}</>;
};

export default Login;
