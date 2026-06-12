const BASE_URL = "https://api.sportsrc.org";

async function fetchData(params) {
  const url = `${BASE_URL}/?${params}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Fetch error");
  }

  return response.json();
}

export function getWorldCupMatches() {
  return fetchData("data=matches&category=football&season=2026");
}

export function getWorldCupStandings() {
  return fetchData("data=results&category=tables&league=WC&season=2026");
}
