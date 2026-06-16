import { getFlagUrl, loadCountries } from "./countries.js";

const container = document.getElementById("countries");
const allCountries = await loadCountries();

renderCountries(allCountries);

// Render a list of countries as cards in the container - calls the is favorite function
function renderCountries(list) {
  container.innerHTML = list.map(country => `
  <div class="card ${isFavorite(country.fifa_code) ? "favorite" : ""}" onclick="toggleFavorite('${country.fifa_code}')">
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

  renderCountries(filtered); // Re-render the filtered list of countries
}

function getFavorite() {  // Retrieve the favorite country code from localStorage
  return localStorage.getItem("favorite");
}

function isFavorite(code) { // Check if the given country code is the favorite
  return getFavorite() === code;
}

function toggleFavorite(code) { // Toggle the favorite country code in localStorage
  const currentFavorite = getFavorite();

  if (currentFavorite === code) {
    localStorage.removeItem("favorite");
  } else {
    localStorage.setItem("favorite", code);
  }

  renderCountries(allCountries); // Re-render the countries to update the favorite status
}

window.toggleFavorite = toggleFavorite;
window.searchCountries = searchCountries;

