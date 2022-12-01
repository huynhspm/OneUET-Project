import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "../containers/Header";
import Footer from "../containers/Footer";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Grade from "../pages/Grade";
import Convert from "../pages/Convert"
import GradeCourses from "../pages/GradeCourses";

const RootLayout = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/homepage" element={<HomePage />} />
				<Route path="/Convert" element={<Convert />} />
				<Route path="/document" element={<Grade />} />
				<Route path="/grade" element={<GradeCourses />} />
				<Route path="/validation-document" element={<Header />} />
				<Route path="/profile/information" element={<Header />} />
				<Route path="/profile/schedule" element={<Header />} />
				<Route path="/profile/learning-result" element={<Grade />} />
				<Route path="/profile/private-document" element={<Header />} />
				<Route path="/profile/change-password" element={<Header />} />
				<Route path="/profile/login" element={<Header />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default RootLayout;
