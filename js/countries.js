let allCountries = [];

const flagMap = { // Mapping of FIFA codes to ISO country codes for flag images
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

export function getFlagUrl(fifaCode) { // Get the URL of the flag image based on the FIFA code
  const iso = flagMap[fifaCode];
  if (!iso) return null;

  return `https://flagcdn.com/w80/${iso}.png`;
}


// Load all countries from the JSON file
export async function loadCountries() {
  const res = await fetch("./public/json/teams.json");
    allCountries = await res.json();
    
    return allCountries;
}
