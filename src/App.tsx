import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./auth/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "./theme/ThemeContext";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
