const pokemonDisplay = document.getElementById("search-list");
const searchInput = document.getElementById("search");
//when the page loads have it say type a query

window.addEventListener("load", () => {
  pokemonDisplay.appendChild(createEmptyPokemonView(true));
});

let debounceInterval;
searchInput.addEventListener("keyup", async (e) => {
  if (!(/\w/i.test(e.key))) {
    return;
  }
  const searchString = searchInput.value;
  if (debounceInterval) {
    clearTimeout(debounceInterval);
  }
  if (searchString.length === 0) {
    return;
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
    const fulfilledMons = await Promise.all(pokemonListElements);
    fulfilledMons.forEach(async (element) => {
      pokemonDisplay.appendChild(await element);
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

async function pokemonInfoFactory(pokemonData) {
  const pokemonInformationResponse = await fetch(pokemonData.url);
  const pokemonDetails = await pokemonInformationResponse.json();

  const wrapperElement = document.createElement("li");

  const nameHeading = document.createElement("h2");
  nameHeading.textContent = pokemonData.name;

  const imgElement = document.createElement("img");
  imgElement.src = pokemonDetails.sprites.front_default;

  wrapperElement.appendChild(nameHeading);
  // wrapperElement.appendChild(imgElement);
  return wrapperElement;
}

function createEmptyPokemonView(isQueryEmpty) {
  const wrapper = document.createElement("div");
  wrapper.textContent = isQueryEmpty
    ? "Type something to search Pokemon!"
    : "No Pokemon match this search";
  return wrapper;
}
