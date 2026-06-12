import { getWorldCupStandings } from "./api.js";

async function displayStandings() {
  const result = await getWorldCupStandings();

  const standings = result.data.standings;
  const container = document.getElementById("groups-container");

  container.innerHTML = "";

  standings.forEach(group => {
    let html = `
      <div class="group">
        <h2>${group.group}</h2>

        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Team</th>
              <th>P</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GD</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
    `;

    group.table.forEach(team => {
      html += `
        <tr>
          <td>${team.position}</td>

          <td>
            <img
              src="${team.team.crest}"
              alt="${team.team.name}"
              width="20"
            >
            ${team.team.name}
          </td>

          <td>${team.playedGames}</td>
          <td>${team.won}</td>
          <td>${team.draw}</td>
          <td>${team.lost}</td>
          <td>${team.goalDifference}</td>
          <td>${team.points}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML += html;
  });
}

displayStandings();
