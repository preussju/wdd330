let allCountries = [];
let currentTeam = null;

// Load all countries from the JSON file and render them on the page
async function loadCountries() {
  const res = await fetch("./public/json/teams.json");
    allCountries = await res.json();
    
    return allCountries;
}
 
 async function displayFavoriteTeamData() {
  
  const countries = await loadCountries();
  const favoriteCode = localStorage.getItem("favorite");
  const country = countries.find( c => c.fifa_code === favoriteCode);

  if (!country) {
    console.error("Country not found");
    return;
  }

  const response = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(country.name)}`
  );

  const data = await response.json();
  console.log(data);
   
  const team = data.teams?.[0];

  if (!team) return;
    
  currentTeam = team;
  const container = document.getElementById("favorite-team");

  container.innerHTML = `
    <div class="favorite-team-card">
      <img src="${team.strBadge}"  alt="${team.strTeam}"style="cursor:pointer" onclick="openModal()" width=200px/>
    </div>`;
}

function openModal() {
  const modal = document.getElementById("team-modal");
  const body = document.getElementById("modal-body");

  body.innerHTML = `
\    <h2>${currentTeam.strTeam}</h2>
    <p>Founded: ${currentTeam.intFormedYear}</p>
    <p>Stadium: ${currentTeam.strStadium}</p>
    <p>${currentTeam.strDescriptionEN?.slice(0, 300) || ""}...</p>
    <img src="${currentTeam.strFanart1}" width="250">
  `;

  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("team-modal").classList.add("hidden");
}

window.closeModal = closeModal;
window.openModal = openModal;

document.getElementById("team-modal").addEventListener("click", (e) => {
  if (e.target.id === "team-modal") {
    e.target.classList.add("hidden");
  }
});

displayFavoriteTeamData();