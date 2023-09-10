const pokeApi = {}

/* Convert PokeApi Detail to Pokemon */
function convertDetail(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.id = pokeDetail.id
    pokemon.number = ("000" + pokeDetail.id).slice(-3)
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    pokemon.types = types
    pokemon.type = types[0]

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    pokemon.abilities = abilities

    const stats = pokeDetail.stats.map((statsSlot) => statsSlot.base_stat)
    var total = 0
    for (let i = 0; i<=5; i++) {
        total += stats[i]
    }
    stats.push(total)
    pokemon.stats = stats

    return pokemon
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
           .then((response) => response.json())
           .then((convertDetail))
} 

pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
           .then((response) => response.json()) 
           .then((jsonBody) => jsonBody.results)
           .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
           .then((detailRequests) =>  Promise.all(detailRequests))
           .then((pokemonsDetails) => pokemonsDetails)
           .catch((error) => console.log(error))
}