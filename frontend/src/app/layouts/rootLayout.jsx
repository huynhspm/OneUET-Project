import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "../containers/Header";
import Footer from "../containers/Footer";
import HomePage from "../pages/HomePage";
import Document from "../pages/Document";
import Convert from "../pages/Convert";

const RootLayout = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/convert" element={<Convert/>} />
				<Route path="/document" element={<Document/>} />
				<Route path="/grade" element={<Header/>} />
				<Route path="/validation-document" element={<Header/>} />
				<Route path="/profile/infomation" element={<Header/>} />
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
