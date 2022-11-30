import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { Worker } from '@react-pdf-viewer/core';

const Convert = (props) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setNumPages(1);
    }

    return (
        <>
            <div>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                    <Document
                        file="file.pdf"
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={console.error}
                    >
                        <Page height="600" pageNumber={pageNumber} />
                    </Document>
                </Worker>
                <p>Page {pageNumber} of {numPages}</p>
            </div>

        </>
    );
};

export default Convert;