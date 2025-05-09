import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Register from "./Register"

const AppRouter: React.FC = () => {
    return (
      <Router basename="/OnlineDragonarium">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<App />} />
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;