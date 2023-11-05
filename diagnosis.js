

let options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8b8b68cd06msh507d5636302a77ap1a5367jsnb41ba4618d46',
		'X-RapidAPI-Host': 'endlessmedicalapi1.p.rapidapi.com'
	}
};


async function getID() {
	const url = 'https://endlessmedicalapi1.p.rapidapi.com/InitSession';
	try {
		const response = await fetch(url, options);
		const result = await response.text();
		console.log(result);
		return JSON.parse(result).SessionID;
	} catch (error) {
		console.error(error);
	}
}

var id=getID();

async function getOutcomes() {
	const url = 'https://endlessmedicalapi1.p.rapidapi.com/GetOutcomes';
	options.method = 'GET';

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
	const it = await id;
	const url = 'https://endlessmedicalapi1.p.rapidapi.com/Analyze?SessionID=' + it;
	options.method = 'GET';
	try {
		const response = await fetch(url, options);
		let result = await response.text();
		//result= JSON.parse(result);
		console.log(result);
		return result;
	} catch (error) {
		console.log("lmao")
		console.error(error);
	}
}


async function acceptTermsOfUse() {
	const it = await id;
	const url = 'https://endlessmedicalapi1.p.rapidapi.com/AcceptTermsOfUse?SessionID=' + it + '&passphrase=I%20have%20read%2C%20understood%20and%20I%20accept%20and%20agree%20to%20comply%20with%20the%20Terms%20of%20Use%20of%20EndlessMedicalAPI%20and%20Endless%20Medical%20services.%20The%20Terms%20of%20Use%20are%20available%20on%20endlessmedical.com';
	options.method = 'POST';

	try {
		const response = await fetch(url, options);
		const result = await response.text();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

async function getFeatures() {
	const url = 'https://endlessmedicalapi1.p.rapidapi.com/GetFeatures';
	options.method = 'GET';

	try {
		const response = await fetch(url, options);
		let result = await response.text();
		result = JSON.parse(result);
		console.log(result);
		return result;
	} catch (error) {
		console.error(error);
	}
}

async function updateFeature(fName, value) {
	await acceptTermsOfUse();
	const it = await id;
	const url = 'https://endlessmedicalapi1.p.rapidapi.com/UpdateFeature?name=' + fName + '&value=' + value + '&SessionID=' + it;
	options.method = 'POST';

	try {
		const response = await fetch(url, options);
		const result = await response.text();
		console.log("up reportx")
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

async function deleteFeature(fName) {
	await acceptTermsOfUse();
	const it = await id;
	const url = 'https://endlessmedicalapi1.p.rapidapi.com/DeleteFeature?name=' + fName + '&SessionID=' + it;
	options.method = 'POST';

	try {
		const response = await fetch(url, options);
		const result = await response.text();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}



function removeItem(num) {

	// Declaring a variable to get select element
	var a = document.getElementById("sick list");
	var item = document.getElementById(num);
	console.log(item.id);
	a.removeChild(item);
	deleteFeature(num);
}



var c = 0;

function addItem(ID) {
	if(document.getElementById(ID)==null){
		var a = document.getElementById("sick list");
		var li = document.createElement("li");
		var butt = document.createElement("Button");
		butt.value = "" + ID;
		butt.name = "" + ID;
		butt.innerText = ID;
		butt.id = ID;
		butt.classList.add("btn");
		console.log(butt.id);
		butt.addEventListener('click', () => {
			// When there is a "click"
			// it shows an alert in the browser
			removeItem(ID)
		})
		li.appendChild(butt);
		li.setAttribute('id', ID);
		a.appendChild(li);
		updateFeature(ID,10);
	}
}
/*
function addItem() {
	var a = document.getElementById("sick list");
	var li = document.createElement("li");
	var butt = document.createElement("Button");
	butt.value = "" + c;
	butt.name = "" + c;
	butt.innerText = c;
	butt.id = c;
	butt.classList.add("btn");
	console.log(butt.id);
	butt.addEventListener('click', () => {
		// When there is a "click"
		// it shows an alert in the browser
		removeItem(butt.id)
	})
	li.appendChild(butt);
	li.setAttribute('id', c);
	a.appendChild(li);
}
*/

async function makelist() {
	const url = 'https://endlessmedicalapi1.p.rapidapi.com/GetFeatures';
		let result;
		options.method = 'GET';
		try {
			const response = await fetch(url, options);
			result = await response.text();
			result = JSON.parse(result);
			console.log(result);
		} catch (error) {
			console.error(error);
		}
		result = result.data;
		console.log(result);
		var list = document.createElement("ul");
		list.id = "myUL";
		for (let i of result) {
			var item = document.createElement("li");
			item.id = "boop";
			var item1 = document.createElement("a"); 
			item1.innerHTML = i;
			item.style.display = "none"; 
			item.appendChild(item1);
			item.addEventListener('click', () => addItem(i));
			list.appendChild(item);
		}
		document.getElementById("test").appendChild(list);
}

makelist(); 

async function myFunction() {

	// Declare variables
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById('myInput');
	filter = input.value.toUpperCase();
	ul = document.getElementById("myUL");
	li = ul.getElementsByTagName('li');

	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByTagName("a")[0];
		txtValue = a.textContent || a.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}


}



//getFeatures();
/*

analyze();
updateFeature("Malnutrition",20);
analyze();
deleteFeature("Malnutrition");
analyze();

*/