let pokemons = [];
let pokemon = {};

// DOM elements
const pokemonWrapper = {
  mainURL: document.querySelector(".pokemon-wrapper"),
};

function fetchData() {
  // Fetch pokemons and push them onto the pokemons array. This will fill that array with promises.
  // 151 Pokémons in Generation 1
  // 29 for pikachu
  let url;
  for (let i = 1; i < 29; i++) {
    url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    pokemons.push(fetch(url).then((res) => res.json()));
  }

  // Take those promises and iterate through them with Promise.all and then set the data onto properties
  Promise.all(pokemons).then((results) => {
    pokemon = results.map((data) => ({
      name: capitalizeFirstLetter(data.name),
      image: data.sprites.other.dream_world.front_default,
      id: data.id,
      health: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      speed: data.stats[5].base_stat,
      type: data.types
        .map((type) => capitalizeFirstLetter(type.type.name))
        .join("/ "),
      abilities: data.abilities
        .map((ability) => capitalizeFirstLetter(ability.ability.name))
        .join(", "),
    }));

    // Show pokemon in HTML
    showPokemon(pokemon);
  });
}

fetchData();

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// A dynamic function to create a 'pokeball'; templates for each pokemon in the HTML.
const showPokemon = (pokemon) => {
  pokemon.map((item) => {
    pokemonWrapper.mainURL.innerHTML += `
            <article class="pokeball">
                <div class="pokemon-mini-header">
                    <h2 class="pokemon-name">${item.name}</h2>
                    <p class="pokemon-id">ID: ${item.id}</p>
                </div>
                <img src="${item.image}" class="pokemon-img" alt="${item.name}">
                <section class="pokemon-info">
                    <p class="pokemon-health">Health: ${item.health}</p>
                    <p class="pokemon-attack">Attack: ${item.attack}</p>
                    <p class="pokemon-speed">Speed: ${item.speed}</p>
                    <div class="pokemon-lists">
                        <div class="pokemon-types">
                            <!-- This line of code is not dynamic as each item of the sub-lists are added onto the same DOM element -->
                            <p class="pokemon-type">Type: ${item.type}</p> 
                        </div>
                        <div class="pokemon-abilities">
                            <!-- This line of code is not dynamic as each item of the sub-lists are added onto the same DOM element -->
                            <p class="pokemon-ability">Abilities: ${item.abilities}</p>
                        </div>
                    </div>
                </section>
            </article>
        `;
  });
  pokemonWrapper.types = document.querySelector(".pokemon-types");
  pokemonWrapper.abilities = document.querySelector(".pokemon-abilities");
};

// * Filter the pokemons via the searchbar

// grab the search input field
const searchBar = document.querySelector("#search-field");

// Listen for keyup event
searchBar.addEventListener("keyup", (e) => {
  // Grab search term, or input and set the value of the event target to lowercase
  const term = e.target.value.trim().toLowerCase();

  // Grab elements that will be used for search terms
  const pokeNames = document.querySelectorAll(".pokemon-name");

  // Make the elements into an array
  const filterPokemon = (arr) => {
    arr.forEach((node) => {
      // Check for the term is equal to certain values of the pokemons
      const text = node.textContent;

      if (text.toLowerCase().includes(term)) {
        // Show all pokeballs with names that match the search an index of the search term
        node.parentNode.parentNode.style.display = "flex";
      } else {
        // Hide the ones that doesn't match the search term
        node.parentNode.parentNode.style.display = "none";
      }
    });
  };
  filterPokemon(pokeNames);
});

// * H1 animation
const pageHeroH1 = document.querySelector("h1");

window.requestAnimationFrame((e) => {
  pageHeroH1.classList.add("apply-shake");
});

pageHeroH1.addEventListener("animationend", (e) => {
  pageHeroH1.classList.remove("apply-shake");
});
