const BASE_URL = "https://api.sportsrc.org";  //sportsrc.org API 

async function fetchData(params) {
  const url = `${BASE_URL}/?${params}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Fetch error");
  }
  return response.json();
}

export function getWorldCupMatches() {  //sportsrc.org API 
  return fetchData("data=matches&category=football&season=2026");
}

export function getWorldCupStandings() {  //sportsrc.org API 
  return fetchData("data=results&category=tables&league=WC&season=2026");
}

export async function getTodayGames(){  // thesportsdb API 
  const res = await fetch( "https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4429");
  const data = await res.json();

  return(data.events);
}
