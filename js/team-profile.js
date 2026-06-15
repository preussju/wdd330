const params = new URLSearchParams(window.location.search);

const countryName = params.get("country");

async function loadTeam() {
  const response = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(countryName)}`
  );

  const data = await response.json();
  const team = data.teams?.[0];

    const playersResponse = await fetch(
  `https://www.thesportsdb.com/api/v1/json/3/lookup_all_players.php?id=${team.idTeam}`);

    const playersData = await playersResponse.json();

  
const playersHtml = playersData.player
  ?.map(player => `
    <div class="player-card">
      <div class="player-card-inner">

        <div class="player-front">
          <img src="${player.strThumb || ''}" alt="${player.strPlayer}">
          <h4>${player.strPlayer}</h4>
        </div>

        <div class="player-back">
          <h4>${player.strPlayer}</h4>
          <p>${player.strPosition || "Unknown Position"}</p>
          <p>${player.strTeam || "No Team"}</p>
          <p>-----------------</p>
          <p>${player.dateBorn || "Unknown Birth Date"}</p>
          <p>${player.strHeight || "Unknown Height"}</p>
          <p>${player.strWeight || "Unknown Weight"}</p>
          <p>${player.strNationality || "Unknown Nationality"}</p>
        </div>

      </div>
    </div>
  `)
  .join("") || "";

    document.getElementById("team-container").innerHTML = `
    <div class="team-profile">
        <img class="team-badge" src="${team.strBadge}" width="200" alt="${team.strTeam} Badge">
        <div class="team-info">
            <p>Founded: ${team.intFormedYear}</p>
            <p>Stadium: ${team.strStadium}</p>
        </div>
    </div>

    <h2>Players</h2>

    <div class="players-grid">
        ${playersHtml}
    </div>

    <p>${team.strDescriptionEN || "No description available."}</p>
    <img class="team-badge" src="${team.strLogo}" alt="${team.strTeam} Logo">
    `;
        
}

loadTeam();