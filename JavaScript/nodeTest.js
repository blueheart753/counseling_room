const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('제발 되어라!');
});
app.get('/index', (req, res) => {
  res.redirect(__dirname + './index.html');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
