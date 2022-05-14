import React, { useRef, useEffect } from "react";
import "./register-files";

var PDFDocument = require("pdfkit").default;
var blobStream = require("blob-stream");

const Viewer = ({ value }) => {
  const iframe = useRef();

  useEffect(() => {
    try {
      // eslint-disable-next-line no-new-func
      var fn = new Function("PDFDocument", "blobStream", "iframe", value);
      fn(PDFDocument, blobStream, lorem, iframe.current);
    } catch (e) {
      console.log(e);
    }
  }, [value, iframe]);

  return (
    <iframe title="preview" ref={iframe} width="600" height="775"></iframe>
  );
};

export default Viewer;
