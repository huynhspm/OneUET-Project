import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Router, useLocation } from "react-router-dom";

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
import Profile from "../pages/Profile";
import EditDocumentPage from "../pages/EditDocumentPage";
import ValidationGrade from "../pages/ValidationGrade";
import SearchCourses from "../pages/SearchCourses";
import ForgetPassword from "../pages/ForgetPassword";
import Logout from "../pages/Logout";


const RootLayout = () => {

  const [location, setLocation] = useState(window.location.pathname)
  // const [mode, setMode] = useState("light");
  // console.log(location)
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: mode,
  //   },
  // });
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  return (
    // <ThemeProvider theme={darkTheme}>
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <BrowserRouter>
        {/* <Header setMode={setMode} mode={mode} /> */}
        {!["/login", "/logout", "/login/forget", "/register"].includes(location) && <Header location={location} />}
        <CustomRoutes setLocation={setLocation} />
        {!["/login", "/logout", "/login/forget", "/register"].includes(location) && <Footer location={location} />}
      </BrowserRouter>
    </Box>
    // </ThemeProvider>
  );
};


const CustomRoutes = (props) => {
  const [token, setToken] = useState('');
  const location = useLocation();
  props.setLocation(location.pathname)
  return (
    <Routes>
      <Route path="/" element={<HomePage token={token} />} />
      <Route path="/login" element={<Login token={token} setToken={setToken} />} />
      <Route path="/login/forget" element={<ForgetPassword token={token} setToken={setToken} />} />
      <Route path="/logout" element={<Logout setToken={setToken} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/convert" element={<Convert />} />
      <Route extract path="/document" element={<Main />} />
      <Route path="/document/:doc_id" element={<Document />} />
      <Route path="/document/edit/:doc_id" element={<EditDocumentPage />} />
      <Route path="/grade" element={<GradeCourses />} />
      <Route path="/SearchCourses" element={<SearchCourses />} />
      <Route path="/validation-document" element={<ValidationPage />} />
      <Route path="/profile/:type" element={<Profile location={location.pathname} />} />
      <Route path="/validation-grade" element={<ValidationGrade />} />
      <Route path="/profile/:type" element={<Profile token={token} location={location.pathname} />} />
    </Routes>
  );
}
export default RootLayout;