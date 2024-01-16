// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./UI/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Admin from "./Components/Admin/Admin";
import store from "./Store/store";
import { Provider } from "react-redux";
import Home from "./Components/Home/Home";
import PrivateRoute from "./Route/PrivateRoute";
import Login from "./Components/Login/Login";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </Provider>

  );
};

export default App;
