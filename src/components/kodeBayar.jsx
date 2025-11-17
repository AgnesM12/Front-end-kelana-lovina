import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

    const formatTotalHarga = (data, paket) => {
        const hargaPerOrang = parseInt(paket?.price?.replace(/\D/g, "") || '0');
        const jumlahOrang = data?.jumlahOrang || 0; 
        const total = (jumlahOrang * hargaPerOrang) + 10000;
        return total.toLocaleString("id-ID");
    }

    const styles = StyleSheet.create({
        section: { padding: 10 },
        value: { fontSize: 5, fontWeight: "bold", alignSelf: "center", margin: 5 },
        QrCode: { marginTop: 5, width: 80, height: 80, alignSelf: "center" },
        logoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 5},
        logoQris: { width: 30, height: 20 },
        logoLovina: { width: 20, height: 10 }, 
    });

    function KodeBayarPDF({ data, paket }) {
        return (
            <Document>
                <Page size={{ width: 150, height: 190 }}>
                    <View style={styles.section}>

                        <View style={styles.logoRow}>
                            <Image style={styles.logoQris} src="/qris.png" />
                            <Image style={styles.logoLovina} src="/KELANA 1.png" />
                        </View>

                        <Text style={styles.value}>{paket?.title}</Text>

                        <Image style={styles.QrCode} src="/qrcode.png" />

                        <Text style={styles.value}>
                            Total: Rp {formatTotalHarga(data, paket)}
                        </Text>

                    </View>
                </Page>
            </Document>
        );
    }

    export default KodeBayarPDF;
