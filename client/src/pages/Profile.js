import React from "react";
import { PDFViewer } from "@react-pdf/renderer";

import MyDocument from "../components/TestPDF";

const Profile = () => {
  return (
      <PDFViewer>
        <MyDocument />
      </PDFViewer>
  );
};

export default Profile;
