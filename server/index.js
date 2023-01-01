const express = require("express");
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

const parser = require("./parser");
app.use("/parser", parser);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});