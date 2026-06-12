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
<div 
  class="card ${isFavorite(country.fifa_code) ? "favorite" : ""}" onclick="toggleFavorite('${country.fifa_code}')">      <div class="flag">
        ${getFlagUrl(country.fifa_code)
            ? `<img src="${getFlagUrl(country.fifa_code)}" alt="flag">`
            : country.flag_icon}
        </div>
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

function getFavorite() {
  return localStorage.getItem("favorite");
}

function isFavorite(code) {
  return getFavorite() === code;
}

function toggleFavorite(code) {
  const currentFavorite = getFavorite();

  if (currentFavorite === code) {
    localStorage.removeItem("favorite");
  } else {
    localStorage.setItem("favorite", code);
  }

  renderCountries(allCountries);
}

window.toggleFavorite = toggleFavorite;
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
