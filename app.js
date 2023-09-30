const express = require('express');
const mongoose = require('mongoose');
const connectToMongo = require('./src/config/mongo');
const app = express();
const port = 3000;
//connect to mongo atlas
connectToMongo();
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
