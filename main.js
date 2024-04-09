const pokemonDisplay = document.getElementById("search-list");
const searchInput = document.getElementById("search");
//when the page loads have it say type a query

window.addEventListener("load", () => {
  pokemonDisplay.appendChild(createEmptyPokemonView(true));
});

let debounceInterval;
searchInput.addEventListener("keyup", async () => {
  const searchString = searchInput.value;
  if (searchString.length === 0) {
    return;
  }
  if (debounceInterval) {
    clearTimeout(debounceInterval);
  }
  debounceInterval = setTimeout(async () => {
    const pokemonList = await getPokemonNames();
    pokemonDisplay.innerHTML = "";
    const filteredPokemonList = pokemonList.filter((pokemon) =>
      pokemon.name.includes(searchString)
    );
    if (filteredPokemonList.length === 0) {
      pokemonDisplay.appendChild(createEmptyPokemonView(false));
      return;
    }
    const pokemonListElements = filteredPokemonList.map((pokemon) => {
      return pokemonInfoFactory(pokemon);
    });

    pokemonListElements.forEach((element) => {
      pokemonDisplay.appendChild(element);
    });
  }, 300);
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

function createEmptyPokemonView(isQueryEmpty) {
  const wrapper = document.createElement("div");
  wrapper.textContent = isQueryEmpty
    ? "Type something to search Pokemon!"
    : "No Pokemon match this search";
  return wrapper;
}
