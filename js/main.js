import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

async function init() {
  try {
    const data = await getWorldCup();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

init();

// 1. Configura as URLs
const proxy = "https://cors-anywhere.herokuapp.com/";
const apiSportsUrl = "https://api-sports.io"; // Exemplo: Team ID 6

// 2. Monta os cabeçalhos obrigatórios exigidos pela API-Sports
const meusHeaders = new Headers();
meusHeaders.append("X-RapidAPI-Key", "822fd4daf8814b5e904afbd467480909");
meusHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

const requestOptions = {
  method: 'GET',
  headers: meusHeaders,
  redirect: 'follow'
};

// 3. Faz a chamada juntando PROXY + API
fetch(proxy + apiSportsUrl, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  })
  .then(resultado => {
    console.log("Dados recebidos com sucesso via Proxy!", resultado);
    
    // Os jogadores vêm dentro de response[0].players na API-Sports
    const jogadores = resultado.response[0].players;
    
    // Aqui você pode chamar a função para desenhar na tela
    mostrarJogadoresNaTela(jogadores);
  })
  .catch(error => console.error('Houve um problema com o Fetch:', error));

// Exemplo simples de renderização
function mostrarJogadoresNaTela(elenco) {
  elenco.forEach(jogador => {
    console.log(`Nome: ${jogador.name} | Posição: ${jogador.position} | Foto: ${jogador.photo}`);
  });
}
