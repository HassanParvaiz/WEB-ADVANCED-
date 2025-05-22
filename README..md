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
Single Page Application (SPA)
De gehele toepassing is opgebouwd als een SPA. Alles gebeurt dynamisch op één pagina, zonder herlaadmomenten. Alle content wordt opgehaald en getoond via JavaScript (main.js, regels 8–10 en verder).

Data ophalen via fetch()
Pokémon-data wordt opgehaald via de Fetch API binnen de functie haalPokemonDataOp() (main.js, regels 12–24). Daarbij wordt ook Promise.all() gebruikt om detaildata van meerdere Pokémon parallel op te halen.

Dynamisch tonen van data
De Pokémon-kaarten worden volledig met JavaScript gegenereerd en weergegeven in de DOM via de functie toonPokemonLijst() (main.js, regels 74–112).

Zoekfunctie op naam
Er is een zoekveld waarmee gebruikers op naam kunnen filteren. Dit zoekveld wordt dynamisch toegevoegd (main.js, regel 32–36), en de filtering gebeurt in filterLijst() (main.js, regel 114).

Filteren op type
Gebruikers kunnen filteren op het type Pokémon via een dropdownmenu. Deze dropdown wordt gegenereerd op basis van alle unieke types uit de dataset (main.js, regels 38–55). Filtering vindt plaats in filterLijst() op regel 115.

Sorteren op naam en base experience
Via een dropdown kunnen gebruikers sorteren op naam (A-Z en Z-A) of op base experience (laag-hoog en hoog-laag). Dit gebeurt in main.js, regels 57–65 (dropdown) en 122–130 (sorteerlogica).

Favorieten met localStorage
Favoriete Pokémon worden opgeslagen in en uitgelezen uit localStorage, via de functies getFavorieten() en setFavorieten() (main.js, regels 3–7). De opslag wordt automatisch bijgewerkt bij het klikken op het hartje.

Checkbox: 'Alleen favorieten' tonen
Een checkbox in de interface maakt het mogelijk om enkel favoriete Pokémon te tonen. Deze staat in index.html (regels 17–19) en de logica zit in main.js, regel 116.

CSS Grid of Flexbox layout
De kaarten worden netjes in een grid weergegeven met behulp van CSS Grid (style.css, regel 61). Flexbox wordt gebruikt voor de layout van de controls (style.css, regel 28).

Responsive design
De toepassing is mobielvriendelijk dankzij media queries in de CSS (style.css, regels 132–140). De controls stapelen zich onder elkaar op kleinere schermen.

Donkere modus met toggle + opslag
Donkere modus kan worden ingeschakeld via een checkbox. De voorkeur wordt opgeslagen in localStorage (main.js, regels 149–161). De bijbehorende CSS staat onderaan in het bestand (style.css, vanaf regel 143).

Animatie bij verschijnen van kaarten
Met behulp van een IntersectionObserver wordt animatie toegepast wanneer een kaart in beeld komt (main.js, regels 70–73). De animatie zelf wordt geregeld via CSS (style.css, regels 69–73).

Interactieve knoppen met feedback
De knoppen (zoals de hartjes) reageren visueel op hover via transformaties (style.css, regel 94). Ook kaarten zelf hebben een hover-effect (regel 73).

Gebruik van moderne JavaScript (ES6+)
De code maakt gebruik van ES6+ features zoals const, let, arrow functions, template literals, map(), forEach() en destructuring.

Semantische HTML5 structuur
De HTML gebruikt semantische elementen zoals <header>, <main>, <section> en <footer>, wat zorgt voor een toegankelijke en gestructureerde opbouw (index.html).

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
  
