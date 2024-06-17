import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchForm = ({ setPokemons,pokemons,setPokemonsFilter, setTypes, types }) => {
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/type')
      .then(response => {
        setTypes(response.data.results);
      });
  }, []);

  const handleSearch = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10`);
    const allPokemons = response.data.results;

    const detailedPokemons = await Promise.all(
      allPokemons.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return {
          ...pokemon,
          image: details.data.sprites.front_default,
          types: details.data.types.map(typeInfo => typeInfo.type.name)
        };
      })
    );
    setPokemons(detailedPokemons);

  };
  const filterData = () => {
    const filteredPokemons = pokemons.filter(pokemon => {
      return (search ? pokemon.name.includes(search) : true) && (type ? pokemon.types.includes(type) : true);
    });
    setPokemonsFilter(filteredPokemons);
  }
  useEffect(() => {
    handleSearch()
  }, [])
  return (
    <form className="items-center max-w-lg mx-auto mt-3">
      <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={type}
        onChange={(e) => setType(e.target.value)}
>
        <option value="">All Types</option>
        {types.map((t) => (
          <option key={t.name} value={t.name}>{t.name}</option>
        ))}
      </select>
      <div className='flex mt-3'>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
            </svg>
          </div>
          <input value={search}
            onChange={(e) => setSearch(e.target.value)} type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Search..." />
        </div>
        <button type="button" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={filterData}>
          <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>Search
        </button>
      </div>
    </form>

  );
};

export default SearchForm;
