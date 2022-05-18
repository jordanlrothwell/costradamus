import React, { useState } from "react";
import { Document, Page, pdfjs, Canvas } from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";

function Viewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function removeTextLayerOffset() {
    const textLayers = document.querySelectorAll(
      ".react-pdf__Page__textContent"
    );
    textLayers.forEach((layer) => {
      const { style } = layer;
      style.top = "0";
      style.left = "0";
      style.transform = "";
    });
  }

  // canvas with a painter algorithm
  function renderPage(page) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    page.render({ canvasContext: context, viewport });
    return canvas;
  }


  return (
    <div className="App">
      <Document file="sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} onLoadSuccess={removeTextLayerOffset} />
      </Document>
      <button
        onClick={() => {
          setPageNumber(pageNumber - 1);
        }}
      >
        Previous
      </button>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <button
        onClick={() => {
          setPageNumber(pageNumber + 1);
        }}
      >
        Next
      </button>
    </div>
  );
}

export default Viewer;
