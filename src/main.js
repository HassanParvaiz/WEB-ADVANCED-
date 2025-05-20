const API_URL = 'https://pokeapi.co/api/v2/pokemon?offset=100&limit=20';

// Favorieten ophalen uit localStorage
function getFavorieten() {
  return JSON.parse(localStorage.getItem('favorieten')) || [];
}

// Favorieten opslaan
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
  let favorieten = getFavorieten();

  // Zoekveld
  const zoekInput = document.createElement('input');
  zoekInput.type = 'text';
  zoekInput.placeholder = 'Zoek op naam...';
  zoekInput.id = 'zoekveld';
  controls.appendChild(zoekInput);

  // Type dropdown
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

  // Sorteer dropdown
  const sorteerSelect = document.createElement('select');
  sorteerSelect.id = 'sorteer-opties';

  const sorteerOpties = [
    { value: '', label: 'Sorteer op...' },
    { value: 'naam-az', label: 'Naam (A-Z)' },
    { value: 'naam-za', label: 'Naam (Z-A)' },
    { value: 'exp-oplopend', label: 'Base Exp (laag-hoog)' },
    { value: 'exp-aflopend', label: 'Base Exp (hoog-laag)' },
  ];

  sorteerOpties.forEach(optie => {
    const optieElement = document.createElement('option');
    optieElement.value = optie.value;
    optieElement.textContent = optie.label;
    sorteerSelect.appendChild(optieElement);
  });

  controls.appendChild(sorteerSelect);

  // Checkbox 'Alleen favorieten'
  const checkbox = document.getElementById('toon-favorieten');

  // Intersection Observer voor animaties
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animatie-start');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Toggle favoriet
  function toggleFavoriet(pokemonNaam) {
    if (favorieten.includes(pokemonNaam)) {
      favorieten = favorieten.filter(naam => naam !== pokemonNaam);
    } else {
      favorieten.push(pokemonNaam);
    }
    setFavorieten(favorieten);
    filterLijst();
  }

  // Toon lijst met animatie observer
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
        <p><strong>Type:</strong> ${p.types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Hoogte:</strong> ${p.height / 10} m</p>
        <p><strong>Gewicht:</strong> ${p.weight / 10} kg</p>
        <p><strong>Abilities:</strong> ${p.abilities.map(a => a.ability.name).join(', ')}</p>
        <p><strong>Base experience:</strong> ${p.base_experience}</p>
        <p><strong>Order:</strong> ${p.order}</p>
        <button class="favoriet-btn" data-naam="${p.name}">${hartje}</button>
      `;
      container.appendChild(kaart);

      // Voeg toe aan observer voor animatie
      observer.observe(kaart);
    });

    document.querySelectorAll('.favoriet-btn').forEach(knop => {
      knop.addEventListener('click', (e) => {
        const naam = e.target.getAttribute('data-naam');
        toggleFavoriet(naam);
      });
    });
  }

  // Filter en sorteer functie
  function filterLijst() {
    const zoekterm = zoekInput.value.toLowerCase();
    const gekozenType = typeSelect.value;
    const toonEnkelFavorieten = checkbox.checked;
    const sorteerWaarde = sorteerSelect.value;

    let gefilterd = pokedex.filter(p => {
      const naamMatcht = p.name.toLowerCase().includes(zoekterm);
      const typeMatcht = gekozenType === '' || p.types.some(t => t.type.name === gekozenType);
      const favorietMatcht = !toonEnkelFavorieten || favorieten.includes(p.name);
      return naamMatcht && typeMatcht && favorietMatcht;
    });

    // Sorteer de gefilterde lijst
    switch (sorteerWaarde) {
      case 'naam-az':
        gefilterd.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'naam-za':
        gefilterd.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'exp-oplopend':
        gefilterd.sort((a, b) => a.base_experience - b.base_experience);
        break;
      case 'exp-aflopend':
        gefilterd.sort((a, b) => b.base_experience - a.base_experience);
        break;
    }

    toonPokemonLijst(gefilterd);
  }

  // Toon initieel
  toonPokemonLijst(pokedex);

  // Event listeners
  zoekInput.addEventListener('input', filterLijst);
  typeSelect.addEventListener('change', filterLijst);
  checkbox.addEventListener('change', filterLijst);
  sorteerSelect.addEventListener('change', filterLijst);
});

// Dark Mode
const darkmodeToggle = document.getElementById('darkmode-toggle');
const body = document.body;

function zetDarkMode(ingeschakeld) {
  if (ingeschakeld) {
    body.classList.add('dark-mode');
    localStorage.setItem('darkmode', 'true');
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('darkmode', 'false');
  }
}

// Dark mode toestand laden bij opstart
const darkmodeVoorkeur = localStorage.getItem('darkmode') === 'true';
darkmodeToggle.checked = darkmodeVoorkeur;
zetDarkMode(darkmodeVoorkeur);

// Event listener voor de toggle
darkmodeToggle.addEventListener('change', () => {
  zetDarkMode(darkmodeToggle.checked);
});
