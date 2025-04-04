// src/routes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import LoginPage from "../pages/LoginPage.tsx";
import HomePage from "../pages/HomePage.tsx";
import CallbackPage from "../pages/CallbackPage.tsx";
import ProfilePage from "../pages/ProfilePage.tsx";
import Sidebar from "../components/sidebar/Sidebar.tsx";
import RecentlyPlayedPage from "../pages/RecentlyPlayedPage.tsx";

const AppRoutes: React.FC = () => {
  const location = useLocation();  // Get the current route

  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/';

  return (
    <>
      <Container maxWidth="lg" sx={{ padding: '2rem' }}>
        {!isLoginPage && <Sidebar />}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/recently-played" element={<RecentlyPlayedPage />} />
        </Routes>
      </Container>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router> {/* Make sure Router wraps the entire component tree */}
      <AppRoutes />  {/* This is where AppRoutes with useLocation is used */}
    </Router>
  );
};

export default App;
