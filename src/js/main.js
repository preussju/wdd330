import { loadHeaderFooter } from "./utils.mjs";
import { getWorldCupMatches } from "./api.js";

loadHeaderFooter();

async function displayMatches() {
  const data = await getWorldCupMatches();

  const container = document.querySelector("#matches");

  data.data.forEach(match => {
    container.innerHTML += `
      <div class="match-card">
        <img src="${match.poster}" alt="${match.title}" width="200">

        <h3>${match.title}</h3>

        <div class="teams">
          <div>
            <img src="${match.teams.home.badge}" width="40">
            <p>${match.teams.home.name}</p>
          </div>

          <span>VS</span>

          <div>
            <img src="${match.teams.away.badge}" width="40">
            <p>${match.teams.away.name}</p>
          </div>
        </div>

        <p>${new Date(match.date).toLocaleDateString()}</p>
      </div>
    `;
  });
}

displayMatches();