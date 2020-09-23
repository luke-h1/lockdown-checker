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

  <p class="item"> LockDown Status: 
  ${
    json.lockdowstatus === 'areaofconcern' ||
    'areaofintervention' ||
    'nationlockdown'
      ? `<span class="bad">${json.lockdownstatus}</span>`
      : `<span class="good">${json.lockdownstatus}</span>`
  }   
</p> 

<p class="item">
Non Essential Shops: 
${
  json.nonessentialshops === 'false'
    ? `<span class="bad">${json.nonessentialshops}</span>`
    : `<span class="good">${json.nonessentialshops}</span>`
}  
</p>

<p class="item"> 
Two HouseHolds: 
${
  json.twohouseholds === 'false'
    ? `<span class="bad">${json.twohouseholds}</span>`
    : `<span class="good">${json.twohouseholds}</span>`
}
</p> 

<p class="item"> 
Gyms & Fitness : 
${
  json.gymsandfitness === 'false'
    ? `<span class="bad">${json.gymsandfitness}</span>`
    : `<span class="good">${json.gymsandfitness}</span>`
}
</p> 

<p class="item">
Meet Outdoors : 
${
  json.meetoutdoors === 'false'
    ? `<span class="bad">${json.meetoutdoors}</span>`
    : `<span class="good">${json.meetoutdoors}</span> `
}
</p>

<p class="item"> 
Pubs & Restaurants : 
${
  json.pubsandrestuarants === 'false'
    ? `<span class="bad">${json.pubsandrestuarants}</span>`
    : `<span class="good">${json.pubsandrestuarants}</span>`
}
</p>

`;
  outputDiv.innerHTML = output;
}

// EVENT LISTENERS
form.addEventListener('submit', getData);
