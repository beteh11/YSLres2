const express = require('express');
const escpos = require('escpos');
require('dotenv').config();

const app = express();
app.use(express.json());

function printReceipt(data) {
    const device = new escpos.Network(process.env.PRINTER_IP); // Replace with your printer’s IP
    const printer = new escpos.Printer(device);

    device.open(function() {
        printer
            .text(data)
            .cut()
            .close();
    });
}

app.post('/print', (req, res) => {
    const { data } = req.body;
    printReceipt(data);
    res.send('Print job sent');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
