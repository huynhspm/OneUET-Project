import RootLayout from "./layouts/rootLayout";
import { Worker } from "@react-pdf-viewer/core";
import { useLocation } from "react-router-dom";


const App = () => {
	return (
		<Worker workerUrl = "https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js" >
			<RootLayout />
		</Worker >
	);
};

export default App;
