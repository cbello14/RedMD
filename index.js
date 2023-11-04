//const axios = require('axios');
/*
const options = {
  method: 'GET',
  url: 'https://endlessmedicalapi1.p.rapidapi.com/InitSession',
  headers: {
    'X-RapidAPI-Key': '8b8b68cd06msh507d5636302a77ap1a5367jsnb41ba4618d46',
    'X-RapidAPI-Host': 'endlessmedicalapi1.p.rapidapi.com'
  }
};

async function getID() {
	try {
		const response = await axios.request(options);
		console.log(response.data);
		const id = response.data.SessionID;
		console.log(id);
		return id
		
	} catch (error) {
		console.error(error);
	}
}

getID();
*/

const url = 'https://endlessmedicalapi1.p.rapidapi.com/InitSession';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8b8b68cd06msh507d5636302a77ap1a5367jsnb41ba4618d46',
		'X-RapidAPI-Host': 'endlessmedicalapi1.p.rapidapi.com'
	}
};

async function getID() {
	try {
		const response = await fetch(url, options);
		const result = await response.text();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

getID();