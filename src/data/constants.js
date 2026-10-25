//Color por tipos
export const TYPE_COLORS = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#705598',
  dragon: '#6F35FC',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  default: '#777777',
};

//formatear el id del pokemon
export const formatPokemonId = (id) => {
    return `#${String(id).padStart(3, '0')}`
};

//primera letra en mayus
export const capitalize = (str) =>{
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};

//Obtener artwork por id

export const getArtworkUrl = (id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};