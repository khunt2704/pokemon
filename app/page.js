
'use client'
import SearchForm from '../components/SearchForm';
import PokemonCard from '../components/PokemonCard';
import { useState } from 'react';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFilter, setPokemonsFilter] = useState([]);
  const [types, setTypes] = useState([]);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-center mb-4">Pokémon Search App</h1>
      <SearchForm setPokemons={setPokemons} pokemons={pokemons} setPokemonsFilter={setPokemonsFilter} pokemonsFilter={pokemonsFilter} setTypes={setTypes} types={types}/>
          <PokemonCard pokemons={pokemonsFilter?.length > 0 ? pokemonsFilter : pokemons} />
    </div>
  );
}
