require('dotenv').config();
const fetch = require('node-fetch');

// Medellin {
//   "noaa": 27.52,
//   "sg": 27.52
// }
// Itagui {
//   "noaa": 27.52,
//   "sg": 27.52
// }
// Caldas {
//   "noaa": 27.52,
//   "sg": 27.52
// }
// La estrella {
//   "noaa": 27.52,
//   "sg": 27.52
// }
// Envigado {
//   "noaa": 27.52,
//   "sg": 27.52
// }
// Barbosa {
//   "noaa": 27.81,
//   "sg": 27.81
// }
// Weather.com
// Medellin 20
// Envigado 19
// Caldas 19
// La estrella 19
// Itagui 20
// Barbosa 24

const url = 'https://api.stormglass.io/v2/weather/point';
const options = {
	method: 'GET',
	headers: {
		'Authorization': process.env.STORMGLASS_API_KEY,
	}
};

const locations = [
	// Medellin
  {
		name: 'Medellin',
		lat: 6.2476,
		lng: 75.5658,
	},
	// Envigado
	{
		name: 'Envigado',
		lat: 6.1673,
		lng: 75.5837,
	},
	// Caldas
	{
		name: 'Caldas',
		lat: 6.0915,
		lng: 75.6353,
	},
	// La estrella
	{
		name: 'La estrella',
		lat: 6.1511,
		lng: 75.6366,
	},
	// Itagui
	{
		name: 'Itagui',
		lat: 6.1682,
		lng: 75.6190,
	},
	// Barbosa
	{
		name: 'Barbosa',
		lat: 6.4380,
		lng: 75.3318,
	},
];

async function query(location) {
	const { name, lat, lng } = location;
  const searchParams = new URLSearchParams({
		lat,
		lng,
		params: 'airTemperature',
  });
  
  try {
    let response = await fetch(url + '?' + searchParams, options);
    let json = await response.json();
		// console.log(JSON.stringify(json, undefined, 2));
		console.log(name, JSON.stringify( json.hours[0].airTemperature, undefined, 2 ));
  } catch(err) {
    console.error(err);
  }
}

locations.forEach(async function (location) {
  await query(location);
});
