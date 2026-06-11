
// functions used to load the partials 
async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadHeaderFooter() {
const headerTemplate = await loadTemplate("public/partials/header.html");
const footerTemplate = await loadTemplate("public/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  initHamburger();
}

function initHamburger() {
  const button = document.querySelector("#menu");
  const nav = document.querySelector(".navigation");

  button.addEventListener("click", () => {
    nav.classList.toggle("open");
    button.classList.toggle("open");
  });
}

export function applyFavoriteTheme() {
  const fav = localStorage.getItem("favorite");

  if (fav) {
    document.body.dataset.favorite = fav;
  }
}
