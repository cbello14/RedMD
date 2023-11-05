console.log(so);
for(let i = 0; i < so.length; i++) {
	so[i].alias = so[i].alias.split(", ");
}

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
		result= JSON.parse(result);
		console.log(result);
		analyzeOutput(result);
		return result;
	} catch (error) {
		console.log("lmao")
		console.error(error);
	}
}

async function disease(){
	var string = ""
	var str = "";
	let res= await analyze();
	for (i in res.Diseases){
		for (k in res.Diseases[i]){
			if(res.Diseases[i][k]>.01){
				string+=k;
				string += ":           Fit: ";
				str = JSON.stringify(res.Diseases[i]);
				console.log(str);
				for(let j = 0; j < str.length; j++) {
					if(str.charAt(j) == '.') {
						string += str.substr(j + 1, 2);
						string += '.';
						string += str.substr(j + 3, 3);
						string += '%\n';
					}
				}
				console.log(k);	
				//alert(k);
				//in here - something!
			}
			else{
				console.log("too unlikely");
			}	
		}
	}
	if(string!=""){
		console.log("hi");
		document.getElementById("diagnosed").innerText = string;
		const slideElements = document.querySelectorAll(".hiddenDiagnose");
		slideElements.forEach((el) => el.classList.add("showDiagnose"));
		console.log("hi agian");
	}
	else{
		alert("We couldnt find anything for those symptoms, sorry")
	}


}

async function information(){
	var string = ""
	let res= await analyze();
	for (i in res.VariableImportances){
		for (k in res.VariableImportances[i]){
			for (j in res.VariableImportances[i][k]){
				if(res.VariableImportances[i][k][j][1]>.1){
					if(string!="")
						string+=", "
					string+=res.VariableImportances[i][k][j][0];
					console.log(res.VariableImportances[i][k][j][0]);
				}
				else{
					console.log("darn, not add var")
					console.log(res.VariableImportances[i][k][j])
				}
			}
		}
	}
	if(string!=""){
		console.log("hi");
		document.getElementById("diagnosed").innerText = string;
		const slideElements = document.querySelectorAll(".hiddenDiagnose");
		slideElements.forEach((el) => el.classList.add("showDiagnose"));
		console.log("hi agian");
	}
	else{
		alert("We couldnt find anything for those symptoms, sorry")
	}
}

function analyzeOutput(result) {
	let diseases = result.Diseases;
	for(let i = 0; i < diseases.length; i++) {
		console.log(diseases[i]);
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

function initAgeAndBMI() {
	let age = prompt(so[0].text, 35);
	let bmi = prompt(so[1].text, 19);
	updateFeature("Age", age);
	updateFeature("BMI", bmi);
}

function addItem(ah) {
	const ID = so[ah].name;
	if(document.getElementById(ID)==null){
		let question = so[ah].text;
		if(so[ah].type == "categorical") {
			for(let i = 1; i <= so[ah].choices.length; i++) {
				question += "\n\n input " + i + " if answer is " + so[ah].choices[i - 1].text;
			}
		}
		let val = prompt(question);
		var a = document.getElementById("sick list");
		var li = document.createElement("li");
		var butt = document.createElement("Button");
		butt.value = "" + ID;
		butt.name = "" + ID;
		butt.innerText = ID;
		butt.id = ID;
		butt.classList.add("btn");
		//li.setAttribute("title", so[ah].text);
		console.log(butt.id);
		butt.addEventListener('click', () => {
			// When there is a "click"
			// it shows an alert in the browser
			removeItem(ID)
		})
		li.appendChild(butt);
		li.setAttribute('id', ID);
		a.appendChild(li);
		updateFeature(ID,val);
		
	}
}


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
		for (let i = 0; i < result.length; i++) {
			var item = document.createElement("li");
			item.id = "boop";
			var item1 = document.createElement("a"); 
			item1.innerHTML = format(result[i]);
			item.style.display = "none"; 
			item.appendChild(item1);
			item.addEventListener('click', () => addItem(i));
			list.appendChild(item);
		}
		document.getElementById("test").appendChild(list);
}

makelist(); 

function hideList() {
	var input;
	input = document.getElementById('myInput');
	if(input.value == '') {
		ul = document.getElementById("myUL");
		li = ul.getElementsByTagName('li');
		for(i = 0; i < li.length; i++) {
			li[i].style.display = "none";
		}
	}
}

const format=(camel)=>{
    const camelCase =camel.replace(/([a-z])([A-Z])/g, '$1 $2')

    return camelCase
}

async function myFunction() {

	// Declare variables
	var input, filter, ul, li, a, i, txtValue, b, badName, badAlias;
	input = document.getElementById('myInput');
	filter = input.value.toUpperCase();
	ul = document.getElementById("myUL");
	li = ul.getElementsByTagName('li');

	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < li.length; i++) {
		badName = false;
		badAlias = true;
		a = li[i].getElementsByTagName("a")[0];
		txtValue = a.textContent || a.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			badName = true;
		}
		for(j = 0; j < so[i].alias.length; j++) {
			b = so[i].alias[j];
			b = b.toUpperCase();
			if(b.includes(filter)) {
				badAlias = false;
			}
		}
		if((badName && badAlias) || (li[i].textContent == 'Age' || li[i].textContent == 'BMI')) {
			li[i].style.display = "none";
		}
	}


}

function hideDiagnoses() {
	const slideElements = document.querySelectorAll(".hiddenDiagnose");
    slideElements.forEach((el) => el.classList.remove("showDiagnose"));
}


//getFeatures();
/*

analyze();
updateFeature("Malnutrition",20);
analyze();
deleteFeature("Malnutrition");
analyze();

*/