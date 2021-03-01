require('dotenv').config();
const fetch = require('node-fetch');

const url = 'http://dataservice.accuweather.com/currentconditions/v1/';
const options = {method: 'GET'};

// 1 march 2021 - 10:04 gtm-5
// Medellin: 20.8
// Envigado: 20.8
// Barbosa: 22.3

// Weather.com
// Medellin: 23
// Envigado: 22
// Barbosa: 26

const locations = [
	// Medellin
  '107060',
  // Envigado
  '106898',
  // Barbosa
  '107002',
];

async function query(location) {
  const searchParams = new URLSearchParams({
    apikey: process.env.ACCUWEATHER_API_KEY,
  });
  
  try {
    let response = await fetch(url + location + '?' + searchParams, options);
    let json = await response.json();
		console.log(JSON.stringify(json, undefined, 2));
  } catch(err) {
    console.error(err);
  }
}

locations.forEach(async function (location) {
  await query(location);
});

