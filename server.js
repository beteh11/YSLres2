const express = require('express');
const app = express();

app.use(express.json());

function printReceipt(data) {
  const device = new escpos.Network(process.env.PRINTER_IP);
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

const PORT = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
