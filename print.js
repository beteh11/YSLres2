const escpos = require('escpos');

// Example function to print receipt
function printReceipt(data) {
  // Replace '192.168.0.100' with your printer's IP address
  const device = new escpos.Network('192.168.0.100');
  const printer = new escpos.Printer(device);

  device.open(function() {
    printer
      .text(data)
      .cut()
      .close();
  });
}

module.exports = printReceipt;