const API_URL = 'https://pokeapi.co/api/v2/pokemon?offset=100&limit=20';

// ⬇️ Favorieten ophalen uit localStorage
function getFavorieten() {
  return JSON.parse(localStorage.getItem('favorieten')) || [];
}

// ⬆️ Favorieten opslaan
function setFavorieten(favorieten) {
  localStorage.setItem('favorieten', JSON.stringify(favorieten));
}

// Haal data op
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
  let favorieten = getFavorieten(); // Laad huidige favorieten

  // Zoekveld
  const zoekInput = document.createElement('input');
  zoekInput.type = 'text';
  zoekInput.placeholder = 'Zoek op naam...';
  zoekInput.id = 'zoekveld';
  controls.appendChild(zoekInput);

  // Type filter dropdown
  const typeSelect = document.createElement('select');
  typeSelect.id = 'type-filter';

  const alleTypes = new Set();
  pokedex.forEach(p => p.types.forEach(t => alleTypes.add(t.type.name)));

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

  // Favoriet toggle
  function toggleFavoriet(pokemonNaam) {
    if (favorieten.includes(pokemonNaam)) {
      favorieten = favorieten.filter(naam => naam !== pokemonNaam);
    } else {
      favorieten.push(pokemonNaam);
    }
    setFavorieten(favorieten);
    filterLijst(); // Herteken de lijst
  }

  // Toon kaarten
  function toonPokemonLijst(lijst) {
    container.innerHTML = '';
    lijst.forEach(p => {
      const kaart = document.createElement('div');
      kaart.classList.add('pokemon-kaart');

      const isFavoriet = favorieten.includes(p.name);
      const hartje = isFavoriet ? '❤️' : '🤍';

      kaart.innerHTML = `
        <h3>${p.name}</h3>
        <img src="${p.sprites.front_default}" alt="${p.name}">
        <p>Type: ${p.types.map(t => t.type.name).join(', ')}</p>
        <button class="favoriet-btn" data-naam="${p.name}">${hartje}</button>
      `;

      container.appendChild(kaart);
    });

    // Koppel events aan hartjes
    document.querySelectorAll('.favoriet-btn').forEach(knop => {
      knop.addEventListener('click', (e) => {
        const naam = e.target.getAttribute('data-naam');
        toggleFavoriet(naam);
      });
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

  // Toon de initiële lijst
  toonPokemonLijst(pokedex);

  // Events
  zoekInput.addEventListener('input', filterLijst);
  typeSelect.addEventListener('change', filterLijst);
});
