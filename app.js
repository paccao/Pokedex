
let pokemons = [];
let pokemon = {};

const pokemonWrapper = {
    "mainURL": document.querySelector(".pokemon-wrapper"),
    "types": document.querySelector(".pokemon-types"),
    "abilities": document.querySelector(".pokemon-abilities"),
};

function fetchData() {
    // Fetch pokemons and push them onto the pokemons array. This will fill that array with promises.
    // 151 Pokémons in Generation 1
    let url;
    for (let i = 1; i < 13; i++) {
        url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        pokemons.push(fetch(url).then(res => res.json()));
    }

    // Take those promises and iterate through them with Promise.all and then set the data onto properties
    Promise.all(pokemons).then(results => {
        pokemon = results.map(data => ({
            "name": capitalizeFirstLetter(data.name),
            "image": data.sprites.other.dream_world.front_default,
            "id": data.id,
            "weight": data.weight,
            "height": data.height,
            "type": data.types.map(type => capitalizeFirstLetter(type.type.name)).join("/ "),
            "abilities": data.abilities.map(ability => capitalizeFirstLetter(ability.ability.name)).join(", "),
        }));
        // console.log(pokemon);

        // Show pokemon in HTML
        showPokemon(pokemon);
    });
};

fetchData();

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// TODO: Show ATK & HP instead of weight and height initially
// ? Something to add later on would be an onclick that displays all information about a pokemon.
// A dynamic function to create a 'pokeball'; templates for each pokemon in the HTML.
const showPokemon = (pokemon) => {
    pokemon.map((item, index) => { 
        pokemonWrapper.mainURL.innerHTML += `
            <article class="pokeball pokeball-${index}">
                <h2 class="pokemon-name pokemon-name-${index}">${item.name}</h2>
                <img src="${item.image}" class="pokemon-img pokemon-img-${index}">
                <section class="pokemon-info">
                    <p class="pokemon-id pokemon-id-${index}">ID: ${item.id}</p>
                    <p class="pokemon-weight pokemon-weight-${index}">Weight: ${item.weight}</p>
                    <p class="pokemon-height pokemon-height-${index}">Height: ${item.height}</p>
                    <div class="pokemon-lists">
                        <div class="pokemon-types">
                            <!-- This line of code is not dynamic as each item of the sub-lists are added onto the same DOM element -->
                            <p class="pokemon-type pokemon-type-${index}">Type: ${item.type}</p> 
                        </div>
                        <div class="pokemon-abilities">
                            <!-- This line of code is not dynamic as each item of the sub-lists are added onto the same DOM element -->
                            <p class="pokemon-ability pokemon-ability-${index}">Abilities: ${item.abilities}</p>
                        </div>
                    </div>
                </section>
            </article>
        `;
    });
};