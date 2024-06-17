import axios from 'axios';
import Link from 'next/link';

export async function generateStaticParams() {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
    const pokemons = response.data.results;

    return pokemons.map(pokemon => {
        const id = pokemon.url.split('/').slice(-2, -1)[0];
        return { id };
    });
}

export default async function PokemonDetail({ params }) {
    const { id } = params;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = response.data;
    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto w-full max-w-2xl p-4 lg:max-w-none lg:w-6/12">
         <Link href="/">
         <span className="text-green-500 underline mb-4 inline-block">&larr; Back</span>
        </Link>
                        <div className="group relative">
                            <div className="bg-green-200 relative h-80 w-full overflow-hidden  sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                <img
                                    src={pokemon.sprites.front_default}
                                    className="h-64 mx-auto"
                                />
                            </div>
                            <div className="bg-yellow-200 p-4 ">
                                <h2 className="text-xl font-bold mb-2">Name: <span className="font-normal">{pokemon.name}</span></h2>
                                <h2 className="text-xl font-bold mb-2">Type: <span className="font-normal">{pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</span></h2>
                                <h2 className="text-xl font-bold mb-2">Stats:</h2>
                                <ul className="mb-4">
                                    {pokemon.stats.map(statInfo => (
                                        <li key={statInfo.stat.name} className="capitalize">{statInfo.stat.name}: {statInfo.base_stat}</li>
                                    ))}
                                </ul>
                                <h2 className="text-xl font-bold mb-2">Abilities:</h2>
                                <ul className="mb-4">
                                    {pokemon.abilities.map(abilityInfo => (
                                        <li key={abilityInfo.ability.name} className="capitalize">{abilityInfo.ability.name}</li>
                                    ))}
                                </ul>
                                <h2 className="text-xl font-bold mb-2">Some Moves:</h2>
                                <ul>
                                    {pokemon.moves.slice(0, 6).map(moveInfo => (
                                        <li key={moveInfo.move.name} className="capitalize">{moveInfo.move.name}</li>
                                    ))}
                                </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
