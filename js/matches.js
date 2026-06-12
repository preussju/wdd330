import { getWorldCupMatches } from "./api.js";

async function loadCountries() {
  const res = await fetch("./public/json/teams.json");
  return await res.json();
}

async function displayMatches() {
  const data = await getWorldCupMatches();
  const countries = await loadCountries();

  let worldCupMatches = data.data //.filter(match => match.id.startsWith("")); //"-ppv" if I wanted

  // ⭐ Sort matches by favorite teams first
  worldCupMatches = sortMatchesByFavorite(worldCupMatches, countries);

  const container = document.querySelector("#matches");
  container.innerHTML = "";

  worldCupMatches.forEach(match => {
    container.innerHTML += `
      <div class="match-card">
        <img src="${match.poster}" alt="${match.title}" width="200">

        <h3>${match.title}</h3>

        <div class="teams">
          <div>
            <img src="${match.teams.home.badge}" width="40">
          </div>
          <div>
            <img src="${match.teams.away.badge}" width="40">
          </div>
        </div>

        <p>${new Date(match.date).toLocaleDateString()}</p>
      </div>
    `;
  });
}

function sortMatchesByFavorite(matches, countries) {
  const favoriteCode = localStorage.getItem("favorite");

  const favoriteCountry = countries.find(c => c.fifa_code === favoriteCode);

  if (!favoriteCountry) return matches;

  const favoriteName = favoriteCountry.name;

  return [...matches].sort((a, b) => {
    const aHas = a.teams.home.name === favoriteName || a.teams.away.name === favoriteName;
    const bHas = b.teams.home.name === favoriteName || b.teams.away.name === favoriteName;

    return (bHas - aHas);
  });
}


displayMatches();