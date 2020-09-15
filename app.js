const form = document.getElementById('form-control');
const outputDiv = document.getElementById('card');

async function getData(e) {
  e.preventDefault();
  const postcodeValue = document.getElementById('input');
  const postcode = postcodeValue.value;
  const BASE_URL = `https://cors-anywhere.herokuapp.com/https://www.lockdownapi.com/${postcode}`;
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
  <li class="collection-item">LockDown Status: <br><span class="status">${json.lockdownstatus}</span><br><hr>
    <li class="collection-item">Non-essential Shops:<br> <span class="status">${json.nonessentialshops}</span></li><br><hr>
    <li class="collection-item">Two HouseHolds: <br><span class="status">${json.twohouseholds}</span></li><br><hr>
    <li class="collection-item">Gym & Fitness: <br><span class="status">${json.gymsandfitness}</span></li><br><hr>
    <li class="collection-item">Meet Outdoors: <br><span class="status">${json.meetoutdoors}</span></li><br><hr>
    <li class="collection-item">Pubs + Restaurants: <br><span class="status">${json.pubsandrestuarants}</span></li><br>
    </ul>`;
  outputDiv.innerHTML = output;
}

// EVENT LISTENERS
form.addEventListener('submit', getData);
