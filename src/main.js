const API_URL = 'https://pokeapi.co/api/v2/pokemon?offset=100&limit=20';

async function haalPokemonDataOp() {
  try {
    const antwoord = await fetch(API_URL);
    const basisData = await antwoord.json();

    const volledigePokemonLijst = await Promise.all(
      basisData.results.map(async (pokemon) => {
        const detailAntwoord = await fetch(pokemon.url);
        return await detailAntwoord.json();
      })
    );

    return volledigePokemonLijst;
  } catch (fout) {
    console.error('Kon Pokémon niet ophalen:', fout);
    return [];
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const pokedex = await haalPokemonDataOp();
  const container = document.getElementById('pokemon-container');

  pokedex.forEach(p => {
    const kaart = document.createElement('div');
    kaart.classList.add('pokemon-kaart');

    kaart.innerHTML = `
      <h3>${p.name}</h3>
      <img src="${p.sprites.front_default}" alt="${p.name}">
    `;

    container.appendChild(kaart);
  });
});
