
/*
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


var options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8b8b68cd06msh507d5636302a77ap1a5367jsnb41ba4618d46',
		'X-RapidAPI-Host': 'endlessmedicalapi1.p.rapidapi.com'
	}
};


async function getID() {
	let url = 'https://endlessmedicalapi1.p.rapidapi.com/InitSession';
	try {
		const response = await fetch(url, options);
		const result = await response.text();
		console.log(result);
		return JSON.parse(result).SessionID;
	} catch (error) {
		console.error(error);
	}
}

async function getOutcomes(){
	const url = 'https://endlessmedicalapi1.p.rapidapi.com/GetOutcomes';
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'e049190567msh2f14db14023c908p1866afjsn026718c6294e',
			'X-RapidAPI-Host': 'endlessmedicalapi1.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.text();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

async function analyze() {
	await acceptTermsOfUse();
	var it= await id;
	const url =  'https://endlessmedicalapi1.p.rapidapi.com/Analyze?SessionID='+it;
	try {
		const response = await fetch(url, options);
		let result = await response.text();
		result= JSON.parse(result);
		console.log(result);
		return result;
	} catch (error) {
		console.log("lmao")
		console.error(error);
	}
}


async function acceptTermsOfUse(){
	var it=await id;
	const url = 'https://endlessmedicalapi1.p.rapidapi.com/AcceptTermsOfUse?SessionID='+it+'&passphrase=I%20have%20read%2C%20understood%20and%20I%20accept%20and%20agree%20to%20comply%20with%20the%20Terms%20of%20Use%20of%20EndlessMedicalAPI%20and%20Endless%20Medical%20services.%20The%20Terms%20of%20Use%20are%20available%20on%20endlessmedical.com';
	const options = {
		method: 'POST',
		headers: {
			'X-RapidAPI-Key': 'e049190567msh2f14db14023c908p1866afjsn026718c6294e',
			'X-RapidAPI-Host': 'endlessmedicalapi1.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.text();
		//console.log(result);
	} catch (error) {
		console.error(error);
	}
}

async function getFeatures(){
	const url = 'https://endlessmedicalapi1.p.rapidapi.com/GetFeatures';
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'e049190567msh2f14db14023c908p1866afjsn026718c6294e',
			'X-RapidAPI-Host': 'endlessmedicalapi1.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.text();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

async function updateFeature(fName,value){
	await acceptTermsOfUse();
	const it=await id;
	const url = 'https://endlessmedicalapi1.p.rapidapi.com/UpdateFeature?name='+fName+'&value='+value+'&SessionID='+it;
	const options = {
		method: 'POST',
		headers: {
			'X-RapidAPI-Key': 'e049190567msh2f14db14023c908p1866afjsn026718c6294e',
			'X-RapidAPI-Host': 'endlessmedicalapi1.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.text();
		console.log("up reportx")
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

async function deleteFeature(fName){
	await acceptTermsOfUse();
	const it=await id;
	const url = 'https://endlessmedicalapi1.p.rapidapi.com/DeleteFeature?name='+fName+'&SessionID='+it;
	const options = {
		method: 'POST',
		headers: {
			'X-RapidAPI-Key': 'e049190567msh2f14db14023c908p1866afjsn026718c6294e',
			'X-RapidAPI-Host': 'endlessmedicalapi1.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.text();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

const id=getID();

//getFeatures();

/*

analyze();
updateFeature("Malnutrition",20);
analyze();
deleteFeature("Malnutrition");
analyze();

*/