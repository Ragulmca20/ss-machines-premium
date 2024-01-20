// src/components/Navbar.tsx
import React, { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../Firebase/user";
import { onAuthStateChanged } from "@firebase/auth";
import auth from "../../Firebase/firebase";
import { Role, authActions } from "../../Store/Auth/AuthSlice";
import { selectIsAuthenticated } from "../../Store/Admin/AdminSlice";
import { selectUser } from "../../Store/Auth/AuthSelector";
import { AppDispatch, resetRootState } from "../../Store/store";

const navbarStyles: React.CSSProperties = {
  flexGrow: 1,
};

const linkStyles: React.CSSProperties = {
  color: "inherit",
  textDecoration: "none",
};

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const role = user.role;
  const isReadOnlyUser = user.isReadOnly;

  useEffect(() => {
    !user.id && onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(authActions.login())};
    });
  }, [dispatch, user.id]);
  const handleLogout = async () => {
    await signOut();
    dispatch(resetRootState());
    dispatch(authActions.logout());
    navigate("/login");
  };
  return (
    <div style={navbarStyles}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            SS Premium Machines
          </Typography>
          {!isAuthenticated && (
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
              style={linkStyles}
            >
              Login/Sign up
            </Button>
          )}
          {isAuthenticated && (
            <>
              <Button
                color="inherit"
                component={RouterLink}
                to={isReadOnlyUser ? "/dashboard" : "/"}
                style={linkStyles}
              >
                Home
              </Button>
              {role === Role.admin && (
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/admin"
                  style={linkStyles}
                >
                  Admin
                </Button>
              )}
              {!isReadOnlyUser && (
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/dashboard"
                  style={linkStyles}
                >
                  Dashboard
                </Button>
              )}
              <Button
                color="inherit"
                onClick={handleLogout}
                component={RouterLink}
                to="/"
                style={linkStyles}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
