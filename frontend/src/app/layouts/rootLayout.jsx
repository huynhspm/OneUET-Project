import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "../containers/Header";
import Footer from "../containers/Footer";
import HomePage from "../pages/HomePage";
import ValidationPage from "../pages/ValidationPage";
import { createTheme } from "@mui/material";

import { Box, ThemeProvider } from "@mui/system";

import Main from "../pages/Document/Main";
import Document from "../pages/Document";
import Convert from "../pages/Convert";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Grade from "../pages/Grade";
import GradeCourses from "../pages/GradeCourses";
import ValidationGrade from "../pages/ValidationGrade";
import Information from "../pages/Profile/Information";
import Schedule from "../pages/Profile/Schedule"
import SearchCourses from "../pages/SearchCourses";
import Main from "../pages/Document/Main";
import Profile from "../pages/Profile";

const RootLayout = () => {
  // const [mode, setMode] = useState("light");
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: mode,
  //   },
  // });

  return (
    // <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <BrowserRouter>
          {/* <Header setMode={setMode} mode={mode} /> */}
          <Header />
          <Routes>
            <Route path="/" element={<HomePage token={token} />} />
            <Route path="/login" element={<Login token={token} setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/convert" element={<Convert />} />
            <Route extract path="/document" element={<Main />} />
            <Route path="/document/:doc_id" element={<Document />} />
            <Route path="/grade" element={<GradeCourses />} />
            <Route path="/validation-document" element={<ValidationPage />} />
            <Route path="/validation-grade" element={<ValidationGrade />} />
            <Route path="/profile/:type" element={<Profile />} />
            <Route path="/SearchCourses" element={<SearchCourses />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Box>
    // </ThemeProvider>
  );
};

export default RootLayout;
