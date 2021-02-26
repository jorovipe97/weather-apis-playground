require('dotenv').config();
const fetch = require('node-fetch');

const url = 'http://api.weatherstack.com/current';

// https://weatherstack.com/documentation
const options = {method: 'GET'};

// 26 march 2021 - 16:46 gtm-5
// Weathertack
// Caldas/Antioquia/Colombia 23
// Medellin/Antioquia/Colombia 23
// Envigado/Antioquia/Colombia 23
// Bello/Antioquia/Colombia 23
// La Estrella/Antioquia/Colombia 23
// Copacabana/Antioquia/Colombia 23
// Barbosa/Antioquia/Colombia 24
// Sabaneta/Antioquia/Colombia 23
// Antioquia/Antioquia/Colombia 23 (should be girardota)
// Antioquia/Antioquia/Colombia 23 (should be Barbosa)

// Weather.com
// Caldas/Antioquia/Colombia 24
// Medellin/Antioquia/Colombia 21
// Envigado/Antioquia/Colombia 20
// Bello/Antioquia/Colombia 21
// La Estrella/Antioquia/Colombia 24
// Copacabana/Antioquia/Colombia 21
// Barbosa/Antioquia/Colombia 27
// Sabaneta/Antioquia/Colombia 20
// Antioquia/Antioquia/Colombia 23
// Antioquia/Antioquia/Colombia 23


const locations = [
  // Medellin.
  'Medellin,Antioquia,Colombia',
  // Caldas
  'Caldas,Antioquia,Colombia',
  'La Estrella,Antioquia,Colombia',
  'Itagüí,Antioquia,Colombia',
  'Sabaneta,Antioquia,Colombia',
  'Envigado,Antioquia,Colombia',
  'Bello,Antioquia,Colombia',
  'Copacabana,Antioquia,Colombia',
  'Girardota,Antioquia,Colombia',
  'Barbosa,Antioquia,Colombia',
];

async function query(location) {
  const searchParams = new URLSearchParams({
    // About the query parameter https://weatherstack.com/documentation#query_parameter
    // Bulk queries not supported on free plan.
    query: location,
    access_key: process.env.WEATHERSTACK_API_KEY,
    // m for Metric
    // s for Scientific
    // f for Fahrenheit
    units: 'm',
    // Not supported on free plan.
    // language: 'es',
  });
  
  try {
    let response = await fetch(url + '?' + searchParams, options);
    let json = await response.json();
    let key = json.location.name + '/' + json.location.region + '/' + json.location.country;
    let value = json.current.temperature;
    console.log(key, value);
  } catch(err) {
    console.error(err);
  }
}

locations.forEach(async function (location) {
  await query(location);
});
