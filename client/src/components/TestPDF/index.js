import React from "react";
import { QUERY_MATTER } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

import costData from "../../data/costData.json"

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    flexGrow: 1,
    padding: 10,
    fontSize: 12,
  },
});

function MyDocument() {
  
  return (
    <Document>
      <Page size="A4">
        {costData.map((cost, index) => (
          <View key={index} style={styles.page}>
            <View style={styles.section}>
              <Text>{cost.itemNumber}</Text>
            </View>
            <View style={styles.section}>
              <Text>{cost.description}</Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}

export default MyDocument;
