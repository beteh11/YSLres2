const express = require('express');
const printReceipt = require('./print');
const app = express();

app.use(express.json());

app.post('/print', (req, res) => {
  const { data } = req.body;
  printReceipt(data);
  res.send('Print job sent');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
