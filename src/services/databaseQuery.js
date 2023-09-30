const mongoose = require('mongoose');
// Define your database model and schema
require("../models/Flight");
const Flight = mongoose.model('Flight');

// Define your database query function
async function executeDatabaseQuery() {
  try {
    const result = await Flight.find({
      // find all flights with createdAt less than 20 seconds ago
      createdAt: {
        $gte: new Date(Date.now() - 20000)
      }
    });
    console.log('Query result:', result);
  } catch (error) {
    console.error('Error executing query:', error);
  }
}
module.exports = executeDatabaseQuery