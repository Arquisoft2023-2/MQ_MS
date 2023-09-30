const mongoose = require('mongoose');
// Define your database model and schema
require("../models/Flight");
const Flight = mongoose.model('Flight');

// Define your database query function

// Función para calcular la distancia en kilómetros entre dos puntos geográficos utilizando la fórmula del haversine.
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la Tierra en kilómetros
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distancia en kilómetros
  return distance;
}

// Función para calcular la diferencia de altitud entre dos vuelos.
function calculateAltitudeDifference(altitude1, altitude2) {
  return Math.abs(altitude1 - altitude2);
}

// Función para determinar si dos vuelos están cerca en base a coordenadas y altitudes.
function areFlightsClose(flight1, flight2, maxDistanceKm, maxAltitudeDifference) {
  const distance = calculateDistance(flight1.latitude, flight1.longitude, flight2.latitude, flight2.longitude);
  const altitudeDifference = calculateAltitudeDifference(flight1.altitude, flight2.altitude);
  
  return distance <= maxDistanceKm && altitudeDifference <= maxAltitudeDifference;
}

async function executeDatabaseQuery() {
  try {
    const result = await Flight.find({
      // Buscar todos los vuelos creados en los últimos 20 segundos
      createdAt: {
        $gte: new Date(Date.now() - 20000)
      }
    });

    // Comparar vuelos para ver si están cerca
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        const flight1 = result[i];
        const flight2 = result[j];
        const maxDistanceKm = 100; // Distancia máxima en kilómetros
        const maxAltitudeDifference = 1000; // Diferencia máxima de altitud en pies

        if (areFlightsClose(flight1, flight2, maxDistanceKm, maxAltitudeDifference)) {
          console.log(`Los vuelos ${flight1.FK_Plate} y ${flight2.FK_Plate} están cerca.`);
        }
      }
    }

    console.log('Query result:', result);
  } catch (error) {
    console.error('Error executing query:', error);
  }
}

module.exports = executeDatabaseQuery;
