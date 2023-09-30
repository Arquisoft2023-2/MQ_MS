const express = require('express');
const mongoose = require('mongoose');
const connectToMongo = require('./src/config/mongo');
const app = express();
const port = 3000;
const cron = require('node-cron');
const databaseQuery = require('./src/services/databaseQuery');
//run databaseQuery
//connect to mongo atlas
//wait until connection is established
connectToMongo();
//cron databaseQuery every 30 seconds
cron.schedule('*/5 * * * * *', () => {
  databaseQuery();
});

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
