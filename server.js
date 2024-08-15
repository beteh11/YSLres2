const express = require('express');
const escpos = require('escpos');
require('dotenv').config();

const app = express();
app.use(express.json());

function printReceipt(data) {
    const device = new escpos.Network(process.env.PRINTER_IP); // Ensure PRINTER_IP is set correctly
    const printer = new escpos.Printer(device);

    device.open(function(err) {
        if (err) {
            console.error('Failed to open printer:', err);
            return;
        }
        printer
            .text(data)
            .cut()
            .close();
    });
}

app.post('/print', (req, res) => {
    const { printerIP, printData } = req.body;
    if (!printData) {
        return res.status(400).send('No data provided');
    }
    // Optionally, you can validate and use the printerIP if required
    try {
        printReceipt(printData); // You can adjust this to use the printerIP if needed
        res.send('Print job sent');
    } catch (error) {
        console.error('Print error:', error);
        res.status(500).send('Failed to print');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
