const pokemonDisplay = document.getElementById("search-list");
const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", async () => {
  const searchString = searchInput.value;
  if (searchString.length === 0) {
    return;
  }
  const pokemonList = await getPokemonNames();
  pokemonDisplay.textContent = "";
  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchString)
  );
  const pokemonListElements = filteredPokemonList.map((pokemon) => {
    return pokemonInfoFactory(pokemon);
  });
  pokemonListElements.forEach((element) => {
    pokemonDisplay.appendChild(element);
  });
});

async function getPokemonNames() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  );
  const pokemonData = await response.json();
  return pokemonData.results;
}

function pokemonInfoFactory(pokemonData) {
  const wrapperElement = document.createElement("li");
  wrapperElement.textContent = pokemonData.name;
  return wrapperElement;
}
