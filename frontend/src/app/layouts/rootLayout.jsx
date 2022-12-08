import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "../containers/Header";
import Footer from "../containers/Footer";
import HomePage from "../pages/HomePage";
import ValidationPage from "../pages/ValidationPage";
import { createTheme } from "@mui/material";

import { Box, ThemeProvider } from "@mui/system";

import Document from "../pages/Document/Main";
import Convert from "../pages/Convert";
import Login from "../pages/Login";
import Register from "../pages/Register";
import GradeCourses from "../pages/GradeCourses";
import Profile from "../pages/Profile";

const RootLayout = () => {

  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <BrowserRouter>
          <Header setMode={setMode} mode={mode} />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/convert" element={<Convert />} />
            <Route extract path="/document" element={<Document />} />
            <Route path="/document/:doc_id" element={<Document />} />
            <Route path="/grade" element={<GradeCourses />} />
            <Route path="/validation-document" element={<ValidationPage />} />
            <Route extract path="/profile" element={<Profile />} />
            <Route path="/profile/:type" element={<Profile />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default RootLayout;
