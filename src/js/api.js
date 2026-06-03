const BASE_URL = "https://api.sportsrc.org";

async function fetchData(params) {
  const url = `${BASE_URL}/?${params}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Fetch error");
  }

  return response.json();
}

export function getCompetitions() {
  return fetchData("data=competitions&category=football");
}

export function getWorldCupMatches() {
  return fetchData("data=matches&category=football&league=WC");
}

export function getWorldCupStandings() {
  return fetchData("data=standings&category=football&league=WC");
}


// fetch("https://api.sportsrc.org/?data=results&category=leagues")
//   .then(r => r.json())
//     .then(data => console.log(data));
  
//     fetch("https://api.sportsrc.org/?data=matches&category=football&league=WC")
//   .then(r => r.json())
//   .then(data => console.log(data));