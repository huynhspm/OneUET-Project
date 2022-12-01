// Core viewer
import { Viewer } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance


const Convert = (props) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    

    return (
        <>
            <div>
                {/* <Viewer fileUrl="" />; */}
                <Viewer
                    fileUrl="https://arxiv.org/pdf/2003.13401.pdf"
                    plugins={[
                        // Register plugins
                        defaultLayoutPluginInstance
                        // ...
                    ]}
                />
                {/* <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                    <Document
                        file="file.pdf"
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={console.error}
                    >
                        <Page height="600" pageNumber={pageNumber} />
                    </Document>
                </Worker>
                <p>Page {pageNumber} of {numPages}</p> */}
            </div>

        </>
    );
};

export default Convert;