import RootLayout from "./layouts/rootLayout";
import { Worker } from "@react-pdf-viewer/core";

const App = () => {
	return (
		<Worker workerUrl = "https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js" >
			<RootLayout />
		</Worker >
	);
};

export default App;
