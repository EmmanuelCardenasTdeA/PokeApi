import { getArtworkUrl } from "../data/constants";

const BASE_URL = 'https://pokeapi.co/api/v2';

//extraer id del url

const extractIdFromUrl = (url) => {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1]
};

//limite de pokemones y listamos

export const getPokemonList = async (limit = 20, offset = 0) => {
    try {
        const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

        //respuesta del servidor
        if(!response.ok){
            throw new Error(`Error HTTTP: ${response.status}`)
        }

        const data = await response.json();

        //Se mapea solo la indormacion necesaria
        const formattedResults = data.results.map((item) => {
            const id = extractIdFromUrl(item.url);
            return {
                id,
                name:item.name,
                imageUrl: getArtworkUrl(id),
            };
        });

        return{
            results: formattedResults,
            hasMore: Boolean(data.next),
        };
    }catch(error){
        throw new Error (error);
    }
};


//Detalle de un poquemon por ID o nombre

export const getPokemonDetail = async (query) => {
    try{
        const cleanQuery = String(query).trim().toLowerCase();
        const response = await fetch(`${BASE_URL}/pokemon/${cleanQuery}`)

        if(response.status === 404){
            return null
        }

        if (!response.ok){
            throw new Error(`Error ${response.status}`)
        }

        const data = await response.json();

        return{
            id:data.id,
            name:data.name,
            heightMeters:data.height / 10,
            weightKg: data.weight / 10,
            types: data.types.map((t) =>t.type.name),
            stats: data.stats.map((s) =>({
                name:s.stat.name,
                value:s.stat.base_stat,
            })),
            imageUrl: data.sprites?.other?.['official-artwork']?.front_default || getArtworkUrl(data.id),
        };
    } catch (error){
        throw new Error (error)
    };
};
