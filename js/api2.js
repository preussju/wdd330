async function getTodayGames(){
  const res = await fetch(
    "https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4429"
  );

  const data = await res.json();
//console.log(data.events);
    
  renderMatches(data.events);
}

getTodayGames();

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