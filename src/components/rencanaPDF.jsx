import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";


    function RencanaPDF() {

    return (
          <Document>
              <Page size="A4">
                  <View>
                      <Text>Rencana Perjalanan</Text>
                      <Text>Ini adalah contoh konten rencana perjalanan Anda.</Text>
                  </View>
              </Page>
          </Document>
        );
      }

    export default RencanaPDF;