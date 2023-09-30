const mongoose = require('mongoose');
// Define your database model and schema
require("../models/Flight");
const Flight = mongoose.model('Flight');

// Define your database query function
async function executeDatabaseQuery() {
  try {
    const result = await Flight.find({/* your query criteria */});
    console.log('Query result:', result);
  } catch (error) {
    console.error('Error executing query:', error);
  }
}
module.exports = executeDatabaseQuery