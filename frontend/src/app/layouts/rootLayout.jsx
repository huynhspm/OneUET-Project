import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "../containers/Header";
import Footer from "../containers/Footer";
import HomePage from "../pages/HomePage";
import Information from "../pages/Profile/Information";

const RootLayout = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/convert" element={<Header/>} />
				<Route path="/document" element={<Header/>} />
				<Route path="/grade" element={<Header/>} />
				<Route path="/validation-document" element={<Header/>} />
				<Route path="/profile/information" element={<Information/>} />
				<Route path="/profile/schedule" element={<Header/>} />
				<Route path="/profile/learning-result" element={<Header/>} />
				<Route path="/profile/private-document" element={<Header/>} />
				<Route path="/profile/change-password" element={<Header/>} />
				<Route path="/profile/login" element={<Header/>} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default RootLayout;
