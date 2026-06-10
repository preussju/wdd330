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
    <div class="card" onclick="openCountry('${country.fifa_code}')">
      <div class="flag">
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

// Open the country modal for the selected country
function openCountry(code) {
  const country = allCountries.find(c => c.fifa_code === code);

  const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
    <img src="${getFlagUrl(country.fifa_code)}" width="80">
    <h2>${country.name}</h2>
    <p>Group: ${country.group}</p>
    `;

  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    closeModal();
  }
});

window.searchCountries = searchCountries;
window.openCountry = openCountry;

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
  AUS: "au"
};

function getFlagUrl(fifaCode) {
  const iso = flagMap[fifaCode];
  if (!iso) return null;

  return `https://flagcdn.com/w80/${iso}.png`;
}

loadCountries();