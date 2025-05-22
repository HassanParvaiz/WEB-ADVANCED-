Pokémon Explorer SPA
Projectbeschrijving
Pokémon Explorer is een Single Page Application (SPA) waarmee gebruikers een lijst van Pokémon kunnen bekijken, filteren, zoeken en sorteren. Gebruikers kunnen Pokémon toevoegen aan hun favorietenlijst, die lokaal opgeslagen wordt via localStorage. Daarnaast is er een donkere modus beschikbaar die de gebruikerservaring 's avonds verbetert.

Functionaliteiten:
- Pokémon ophalen via API: Er worden 20 Pokémon opgehaald uit de officiële PokéAPI.
- Zoekfunctie: Zoeken op naam van de Pokémon.
- Filteren op type: Dropdown met alle beschikbare Pokémon types.
- Sorteren: Op naam (A-Z / Z-A) en base experience (hoog-laag / laag-hoog).
- Favorieten beheren: Toevoegen/verwijderen van favorieten, lokaal opgeslagen.
- Filter op favorieten: Optie om alleen favorieten te tonen.
- Dark mode: Schakelbare donkere modus met voorkeur opgeslagen in localStorage.
- Animaties: Intersection Observer zorgt voor animaties bij het in beeld komen van Pokémon-kaarten.

Gebruikte API's
- PokéAPI — officiële Pokémon API
- URL: https://pokeapi.co/api/v2/pokemon?offset=100&limit=20
- Deze API levert de lijst met Pokémon en details zoals types, afbeeldingen, abilities, gewicht, hoogte en base experience.

Implementatie van technische vereisten
Vereiste	Locatie in code / uitleg
Pokémon ophalen via API	haalPokemonDataOp functie (JavaScript, rond regel 9–30)
Favorieten lokaal opslaan	getFavorieten() en setFavorieten() functies (regel 3-8) en toggle in eventlistener op favoriet-knop (regel 80-100)
Zoekveld	Dynamisch toegevoegd aan controls sectie (regel 36-43)
Filteren op type	Type dropdown menu dynamisch gevuld en gebruikt in filterfunctie (regel 45-65 en filterLijst functie 105-130)
Sorteren	Sorteer dropdown menu (regel 67-83) en logica in filterLijst functie (regel 125-140)
Favorieten filter checkbox	Checkbox in HTML (regel 18) en gebruikt in filterLijst (regel 110-115)
Animaties met Intersection Observer	Intersection Observer setup (regel 88-97) en animatieklasse in CSS (regel ~50-58)
Dark mode toggle	Checkbox in HTML (regel 23), dark mode functies en eventlistener (regel 150-172)
Responsive design	CSS media query (regel 105-113)

Installatiehandleiding
Clone de repository

bash
Copy
Edit
git clone https://github.com/jouwgebruikersnaam/pokemon-explorer.git
cd pokemon-explorer
Open de projectmap
Open het project in je favoriete code-editor (bijv. VSCode).

Start een lokale server
Omdat de app gebruikmaakt van modules (<script type="module">), is het handig om een lokale server te draaien, bijvoorbeeld met Live Server in VSCode of met Python:

yaml
Copy
Edit
python3 -m http.server 8000
Open daarna http://localhost:8000 in je browser.

Gebruik
De applicatie laadt en toont de Pokémon. Gebruik de zoekbalk, filters en sorteeropties om te navigeren. Voeg favorieten toe door op het hartje te klikken. Activeer donkere modus via de toggle.

Screenshots
- [Hoofdscherm donkere mode PC](https://github.com/user-attachments/assets/0e545aee-4363-48fd-8c18-d0514f251503)
- [Hoofdscherm normale versie PC](https://github.com/user-attachments/assets/bf85cd11-63ab-4f82-a90b-6d75c743b489)
- [Favorietenlijst PC](https://github.com/user-attachments/assets/083a7856-388f-4b1e-a347-7e0dd85e560f)
- [Zoekfunctie in actie](https://github.com/user-attachments/assets/205c7aad-cc1d-4e56-a30a-03bc4283c93e)
- [filterfuncties in actie](https://github.com/user-attachments/assets/5d901df3-f6ae-4417-9b59-82ff57846440)
- [Telefoon versie](https://github.com/user-attachments/assets/fe64a334-8379-488e-a683-5b354777ba8e)




Technologieën
- Fetch API data ophalen
- LocalStorage voor favorieten en het behouden van donkermodus
- Chatgpt gebruikt voor hulp en advies
- Pokemon API  https://pokeapi.co/api/v2/pokemon/ditto
  
