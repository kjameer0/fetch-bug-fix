//get a list of every pokemons name
//render a list in the dom where each element has the pokemons name

//get access to list element to place items
const pokemonDisplay = document.getElementById("search-list");
const searchField = document.getElementById("search");
searchField.addEventListener("keyup", async (evt) => {
  const alphaNumericRegex = /\w/g;
  const query = searchField.value;
  if (!alphaNumericRegex.test(evt.key)) {
    if (evt.key != "Backspace") {
      return;
    }
  }
  pokemonDisplay.innerHTML = "";
  //check if length of pokemon search is zero
  const listOfPokemon = await addPokemonToList(query);
  if (listOfPokemon.length === 0) {
    const emptyDisplay = document.createElement("li");
    emptyDisplay.textContent = "no pokemon found";
    pokemonDisplay.appendChild(emptyDisplay);
  }
});
async function addPokemonToList(query) {
  //fetching list of all pokemon
  const pokemonList = await getAllPokemon();
  //appending a new li element for each pokemon to the list
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.includes(query)
  );
  filteredPokemon.forEach((pokemon) => {
    const pokemonLiEl = pokemonDataFactory(pokemon);
    pokemonDisplay.appendChild(pokemonLiEl);
  });
  return filteredPokemon;
}
//fetch a list of pokemon
async function getAllPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000");
  const pokemonData = await response.json();
  const allPokemon = pokemonData.results;
  return allPokemon;
}
//create new list elements with pokemon data to add to list

function pokemonDataFactory(pokemonObj) {
  //passing in a single pokemonObj
  //{name: 'charizard', url: 'https://....'}
  const liElement = document.createElement("li");
  //add pokemons name to list element
  liElement.textContent = pokemonObj.name;
  return liElement;
}
