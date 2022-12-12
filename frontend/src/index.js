import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

const getData = async () => {
	const url = "localhost:/data.json";
	const response = await fetch("data.json");
	console.log(response);
	const data = await response.json();
	console.log(data);
};

getData();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
