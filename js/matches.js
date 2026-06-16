import { getWorldCupMatches, getTodayGames } from "./api.js";

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

const todaysGame = getTodayGames();
renderMatches(await todaysGame);

function renderMatches(matches) {
  const container = document.getElementById("todayMatches");

  container.innerHTML = matches.map(match => `
    <div class="match-card">
      <div class="teams">
        <div class="team">
          <img src="${match.strHomeTeamBadge}" alt="${match.strHomeTeam}" width=120>
          <p>${match.strHomeTeam}</p>
        </div>

        <span class="vs">VS</span>

        <div class="team">
          <img src="${match.strAwayTeamBadge}" alt="${match.strAwayTeam}" width=120>
          <p>${match.strAwayTeam}</p>
        </div>
      </div>

      <div class="info">
        <p>📅 ${match.dateEvent}</p>
        <p>🕒 ${match.strTime?.slice(0,5)}</p>
        <p>🏟️ ${match.strVenue}</p>
        <p>📍 ${match.strCity}, ${match.strCountry}</p>
      </div>
    </div>
    `).join("");
}

