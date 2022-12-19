import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "../containers/Header";
import Footer from "../containers/Footer";
import HomePage from "../pages/HomePage";
import ValidationPage from "../pages/ValidationPage";

import { Box } from "@mui/system";

import Main from "../pages/Document/Main";
import Document from "../pages/Document";
import Convert from "../pages/Convert";
import Login from "../pages/Login";
import Register from "../pages/Register";
import GradeCourses from "../pages/GradeCourses";
import Profile from "../pages/Profile";
import EditDocumentPage from "../pages/EditDocumentPage";
import ValidationGrade from "../pages/ValidationGrade";
import SearchCourses from "../pages/SearchCourses";
import ForgetPassword from "../pages/ForgetPassword";
import Logout from "../pages/Logout";

const RootLayout = () => {
  const [token, setToken] = useState("");

  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage token={token} />} />
          <Route
            path="/login"
            element={<Login token={token} setToken={setToken} />}
          />
          <Route
            path="/login/forget"
            element={<ForgetPassword token={token} setToken={setToken} />}
          />
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
          <Route path="/profile/:type" element={<Profile />} />
          <Route path="/validation-grade" element={<ValidationGrade />} />
          <Route path="/profile/:type" element={<Profile token={token} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Box>
  );
};

export default RootLayout;
