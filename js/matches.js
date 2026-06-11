import { getWorldCupMatches } from "./api.js";

async function displayMatches() {
  const data = await getWorldCupMatches();

  const worldCupMatches = data.data.filter(match => match.id.startsWith("")); //"-ppv" if I wanted
    
  const container = document.querySelector("#matches");

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

displayMatches();