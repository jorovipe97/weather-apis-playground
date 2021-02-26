require('dotenv').config();
const fetch = require('node-fetch');

const url = 'https://data.climacell.co/v4/timelines';

console.log(process.version);


const options = {method: 'GET'};
const searchParams = new URLSearchParams({
  // Medellin:
  // google IBM's Temperature: 25 degrees.
  // climacell Temperature: 17.33 degrees.
  location: '6.44,-75.57',
  fields: 'temperature',
  timesteps: 'current',
  units: 'metric',
  timezone: 'America/Bogota',
  apikey: process.env.CLIMACELL_API_KEY,
});

fetch(url + '?' + searchParams, options)
  .then(response => response.json())
  .then(json => console.log(JSON.stringify(json, undefined, 2)))
  .catch(err => console.error(err));