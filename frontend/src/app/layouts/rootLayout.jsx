import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "../containers/Header";
import Footer from "../containers/Footer";
import HomePage from "../pages/HomePage";
import ValidationPage from "../pages/ValidationPage";
import { createTheme } from "@mui/material";

import { Box, ThemeProvider } from "@mui/system";

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
            <Route path="/convert" element={<Header />} />
            <Route path="/document" element={<Header />} />
            <Route path="/grade" element={<Header />} />
            <Route path="/validation-document" element={<ValidationPage />} />
            <Route path="/profile/infomation" element={<Header />} />
            <Route path="/profile/schedule" element={<Header />} />
            <Route path="/profile/learning-result" element={<Header />} />
            <Route path="/profile/private-document" element={<Header />} />
            <Route path="/profile/change-password" element={<Header />} />
            <Route path="/profile/login" element={<Header />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default RootLayout;
