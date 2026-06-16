import { getFlagUrl, loadCountries } from "./countries.js";

const container = document.getElementById("countries");
const allCountries = await loadCountries();

renderCountries(allCountries);

// Render a list of countries as cards in the container - opens a new page with info 
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

window.searchCountries = searchCountries;
