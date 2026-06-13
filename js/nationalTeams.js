let allCountries = [];
const container = document.getElementById("countries");

// Load all countries from the JSON file and render them on the page
async function loadCountries() {
  const res = await fetch("./public/json/teams.json");
  allCountries = await res.json();

  renderCountries(allCountries);
}

// Render a list of countries as cards in the container
function renderCountries(list) {
  container.innerHTML = list.map(country => `
    <div class="card" onclick="window.location.href='team-profile.html?country=${encodeURIComponent(country.name)}'">
        <div class="flag"> ${getFlagUrl(country.fifa_code) ? `<img src="${getFlagUrl(country.fifa_code)}" alt="flag">` : country.flag_icon}</div>
        <h3>${country.name}</h3>
        <p>${country.continent}</p>
    </div>
  `).join("");
}

// Filter the list of countries based on the search input and re-render the page
function searchCountries() {
  const input = document.getElementById("search").value.trim().toLowerCase();

  const filtered = allCountries.filter(country => {
    return [
      country.name,
      country.name_normalised,
      country.fifa_code,
    ]
      .filter(Boolean)
      .some(v => v.toLowerCase().includes(input));
  });

  renderCountries(filtered);
}



async function openTeamModal(teamName) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = "<p>Loading...</p>";
  modal.classList.remove("hidden");

  try {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(teamName)}`
    );

    const data = await response.json();

    const team = data.teams?.[0];
      
    if (!team) {
      modalBody.innerHTML = "<p>Team not found.</p>";
      return;
    }

    modalBody.innerHTML = `
      <h2>${team.strTeam}</h2>

      <img
        src="${team.strBadge}"
        alt="${team.strTeam}"
        width="120"
      >

      <p><strong>Country:</strong> ${team.strCountry || "-"}</p>

      <p><strong>League:</strong> ${team.strLeague || "-"}</p>

      <p>
        ${team.strDescriptionEN
          ? team.strDescriptionEN.substring(0, 600) + "..."
          : "No description available."}
      </p>
    `;
  } catch (error) {
    modalBody.innerHTML = "<p>Error loading team information.</p>";
    console.error(error);
  }
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    e.target.classList.add("hidden");
  }
});

window.closeModal = closeModal;
window.openTeamModal = openTeamModal;
window.searchCountries = searchCountries;

const flagMap = {
  MEX: "mx",
  USA: "us",
  CAN: "ca",
  PAN: "pa",
  CRC: "cr",
  HON: "hn",
  BRA: "br",
  ARG: "ar",
  URU: "uy",
  COL: "co",
  ECU: "ec",
  PER: "pe",
  CHI: "cl",
  PAR: "py",
  ENG: "gb",
  FRA: "fr",
  GER: "de",
  ESP: "es",
  ITA: "it",
  POR: "pt",
  NED: "nl",
  BEL: "be",
  CRO: "hr",
  SUI: "ch",
  AUT: "at",
  DEN: "dk",
  SWE: "se",
  NOR: "no",
  POL: "pl",
  CZE: "cz",
  MAR: "ma",
  SEN: "sn",
  NGA: "ng",
  EGY: "eg",
  RSA: "za",
  ALG: "dz",
  TUN: "tn",
  GHA: "gh",
  CIV: "ci",
  CMR: "cm",
  JPN: "jp",
  KOR: "kr",
  KSA: "sa",
  IRN: "ir",
  QAT: "qa",
  AUS: "au",
  BIH: "ba",
  HAI: "ht",
  SCO: "gb",
  TUR: "tr",
  CUW: "cw",
  NZL: "nz",
  CPV: "cv",
  IRQ: "iq",
  JOR: "jo",
  COD: "cd",
  UZB: "uz"

};

function getFlagUrl(fifaCode) {
  const iso = flagMap[fifaCode];
  if (!iso) return null;

  return `https://flagcdn.com/w80/${iso}.png`;
}

async function init() {
  await loadCountries();
}

init();