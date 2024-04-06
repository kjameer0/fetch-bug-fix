const pokemonDisplay = document.getElementById("search-list");
const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", async () => {
  const pokemonList = await getPokemonNames();
  pokemonDisplay.textContent = "";
  const searchString = searchInput.value;
  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchString)
  );
  pokemonDisplay.textContent = JSON.stringify(filteredPokemonList);
});

async function getPokemonNames() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  );
  const pokemonData = await response.json();
  return pokemonData.results;
}

function pokemonInfoFactory() {
  
}
