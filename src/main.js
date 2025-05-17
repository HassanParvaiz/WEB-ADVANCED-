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
  const controls = document.getElementById('controls');

  // Zoekveld
  const zoekInput = document.createElement('input');
  zoekInput.type = 'text';
  zoekInput.placeholder = 'Zoek op naam...';
  zoekInput.id = 'zoekveld';
  controls.appendChild(zoekInput);


  const typeSelect = document.createElement('select');
  typeSelect.id = 'type-filter';

  // Haal unieke types op
  const alleTypes = new Set();
  pokedex.forEach(p => p.types.forEach(t => alleTypes.add(t.type.name)));

  // Voeg opties toe aan dropdown
  const defaultOptie = document.createElement('option');
  defaultOptie.value = '';
  defaultOptie.textContent = 'Alle types';
  typeSelect.appendChild(defaultOptie);

  alleTypes.forEach(type => {
    const optie = document.createElement('option');
    optie.value = type;
    optie.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    typeSelect.appendChild(optie);
  });

  controls.appendChild(typeSelect);

  // Toon kaarten
  function toonPokemonLijst(lijst) {
    container.innerHTML = '';
    lijst.forEach(p => {
      const kaart = document.createElement('div');
      kaart.classList.add('pokemon-kaart');

      kaart.innerHTML = `
        <h3>${p.name}</h3>
        <img src="${p.sprites.front_default}" alt="${p.name}">
        <p>Type: ${p.types.map(t => t.type.name).join(', ')}</p>
      `;

      container.appendChild(kaart);
    });
  }

  function filterLijst() {
    const zoekterm = zoekInput.value.toLowerCase();
    const gekozenType = typeSelect.value;

    const gefilterd = pokedex.filter(p => {
      const naamMatcht = p.name.toLowerCase().includes(zoekterm);
      const typeMatcht = gekozenType === '' || p.types.some(t => t.type.name === gekozenType);
      return naamMatcht && typeMatcht;
    });

    toonPokemonLijst(gefilterd);
  }

  
  toonPokemonLijst(pokedex);

  // Events
  zoekInput.addEventListener('input', filterLijst);
  typeSelect.addEventListener('change', filterLijst);
});
