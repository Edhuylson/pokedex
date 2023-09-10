const maxRecords = 151
const limit = 20
let offset = 0

function loadPokemons(offset, limit) {
    function convertPokemon(pokemon) {

        return `
        <li><div onclick='modalPage.showPokeModal(${pokemon.id})' class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </div></li>
    `
    }

    pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
        
        const pokemonList = document.getElementById('pokemonList')
        const newHTML = pokemons.map(convertPokemon).join('')
        pokemonList.innerHTML += newHTML

    })
    .catch((error) => console.log(error))
}

loadPokemons(offset, limit)

const showButton = document.getElementById("more")
showButton.addEventListener('click', () => {
    offset += limit

    const records = offset + limit

    if (records >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemons(offset, newLimit)
        showButton.parentElement.removeChild(showButton)
    } else {
        loadPokemons(offset, limit)
    }
})