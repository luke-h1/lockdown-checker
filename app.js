const form = document.getElementById('form-control');
const outputDiv = document.getElementById('card');
const loaderImg = document.getElementById('loader');

function showLoader() {
  loaderImg.style.display = 'block';
}

function hideLoader() {
  loaderImg.style.display = 'none';
}

function clearFields() {
  const postcodeValue = document.getElementById('input');
  postcodeValue.value = ''; 
  outputDiv.innerHTML = ''; 
}

async function getData(e) {
  showLoader();

  e.preventDefault();
  const postcodeValue = document.getElementById('input');
  const postcode = postcodeValue.value;
  const BASE_URL = `https://cors-anywhere.herokuapp.com/https://www.lockdownapi.com/${postcode}`;
  const res = await fetch(`${BASE_URL}`);
  const json = await res.json();
  clearFields();
  showData(json);
}

function showData(json) {
  hideLoader();
  let output = '';
  output += `
  <h2 class="card-title">${json.admindistrictname}</h2> 
  <p class="item"> Watchlist Status: 
  ${
    json.lockdowstatus === 'areaofconcern' ||
    'areaofintervention' ||
    'nationlockdown'
      ? `<span class="bad"><br>${json.lockdownstatus} ❌</span>`
      : `<span class="good">${json.lockdownstatus} ✅</span>`
  }   
</p> 

<p class="item">
Are Non Essential Shops open ? :  
${
  json.nonessentialshops === 'false'
    ? `<span class="bad"><br> No ❌</span>`
    : `<span class="good"><br>Yes ✅</span>`
}  
</p>

<p class="item"> 
Can two HouseHolds meet indoors ?:  
${
  json.twohouseholds === 'false'
    ? `<span class="bad"> <br> No ❌</span>`
    : `<span class="good"><br>Yes ✅</span>`
}
</p> 

<p class="item"> 
Are gyms & Fitness centers open ? : 
${
  json.gymsandfitness === 'false'
    ? `<span class="bad"><br> No ❌</span>`
    : `<span class="good"><br>Yes ✅</span>`
}
</p> 

<p class="item">
Can Two households Meet Outdoors ?: 
${
  json.meetoutdoors === 'false'
    ? `<span class="bad"><br> No ❌</span>`
    : `<span class="good"><br>Yes ✅</span> `
}
</p>

<p class="item"> 
Are Pubs & Restaurants open ? : 
${
  json.pubsandrestuarants === 'false'
    ? `<span class="bad"><br>No ❌</span>`
    : `<span class="good"><br>Yes ✅</span>`
}
</p>

`;
  outputDiv.innerHTML = output;
}

// EVENT LISTENERS
form.addEventListener('submit', getData);
