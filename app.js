const form = document.getElementById('form-control');
const outputDiv = document.getElementById('card');

async function getData(e) {
  e.preventDefault();
  const postcodeValue = document.getElementById('input');
  const postcode = postcodeValue.value;
  const BASE_URL = `https://www.lockdownapi.com/${postcode}`;
  const res = await fetch(`${BASE_URL}`);
  const json = await res.json();
  showData(json);
}

function showData(json) {
  let output = '';
  output += `
  <h1 class="card-title">${json.admindistrictname}</h1> 
  <h1 class="card-title-secondary">${json.councilname}</h1>
  <ul class="list">
    <li class="collection-item">LockDown Status: ${json.lockdownstatus}</li>
    <li class="collection-item">Non-essential Shops: ${json.nonessentialshops}</li>
    <li class="collection-item">Two HouseHolds: ${json.twohouseholds}</li>
    <li class="collection-item">Gym & Fitness: ${json.gymsandfitness}</li>
    <li class="collection-item">Meet Outdoors: ${json.meetoutdoors}</li>
    <li class="collection-item">Pubs + Restaurants: ${json.pubsandrestuarants}</li>

  </ul>`;
  outputDiv.innerHTML = output;
}

// EVENT LISTENERS
form.addEventListener('submit', getData);
