// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Navbar from "./UI/Navbar/Navbar";
import CreateMachineData from './Components/Machine/CreateMachineData/CreateMachineData';
import Dashboard from "./Components/Dashboard/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/signup" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<CreateMachineData />} />
        </Routes>
    </Router>
  );
};

export default App;
