import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PDF from "../../utils/pdf/output.pdf";
import styled from "styled-components";

const PDFWrapper = styled.div`
  min-width: 20rem;
`;

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Viewer = () => (
  <PDFWrapper>
    <Document style file={PDF}>
      <Page pageNumber={1} />
    </Document>
  </PDFWrapper>
);

export default Viewer;
