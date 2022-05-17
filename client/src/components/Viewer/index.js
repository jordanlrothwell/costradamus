import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styled from "styled-components";
import PDF from "../../assets/docs/output.pdf";

const ViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `

const ArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  button {
    background-color: #0487c4;
    background-image: linear-gradient(320deg, #7cc4eb, #0487c4);
    border-radius: 3px;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    text-align: center;
    font-family: "Source Sans Pro", sans-serif;
    cursor: pointer;
    outline: none;
    border: none;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: #7cc4eb;
      background-image: linear-gradient(320deg, #7cc4eb, #0487c4);
      color: #0487c4;
    }
  }
`;

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Viewer = ({ pdf }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <ViewContainer>
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
        onContextMenu={(e) => e.preventDefault()}
        className="pdf-container"
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <ArrowContainer>
        <button onClick={prevPage} disabled={pageNumber === 1}>
          Prev
        </button>
        <button onClick={nextPage} disabled={pageNumber === numPages}>
          Next
        </button>
      </ArrowContainer>
    </ViewContainer>
  );
};

export default Viewer;
