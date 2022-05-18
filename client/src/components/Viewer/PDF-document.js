import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import Header from "./Header/header.js";
import Footer from "./Footer/footer.js";

// Create styles
const styles = StyleSheet.create({
  document: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  pageWrapper: {
    padding: 25,
  },
});

const PageWrapper = (props) => {
  return (
    <Page size="Letter" style={styles.pageWrapper}>
      <Header />
      {props.children}
      <Footer />
    </Page>
  );
};

function PDFPreview() {

  return (
    <Document>
      <PageWrapper>
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%", padding: 5 }}>
              <Text style={{ fontSize: 9 }}></Text>
            </View>
          </View>
        </View>
      </PageWrapper>
    </Document>
  );
}

export default TestPDF;
