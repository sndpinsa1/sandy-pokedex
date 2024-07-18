import React from "react";
import PokedexCard from "./PokedexCard";
import { Pokemon } from "pokenode-ts";
import { useDispatch } from "react-redux";
import { openModal } from "../store/modalSlice";
import PokedexDetails from "./PokedexDetails";
import { setSelectedPokemon } from "../store/pokemonSlice";

interface PokedexCardListProps {
  pokemons: Array<Pokemon>;
}

const PokedexCardList: React.FC<PokedexCardListProps> = ({ pokemons }) => {
  const dispatch = useDispatch();

  function clickHandler(pokemon: Pokemon) {
    dispatch(openModal(<PokedexDetails />));
    dispatch(setSelectedPokemon(pokemon));
  }

  return (
    <main
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 ${
        pokemons.length > 0 ? "pt-8" : ""
      }`}
    >
      {pokemons.map((pokemon) => (
        <PokedexCard
          key={pokemon.id}
          types={pokemon.types.map((type) => type.type.name)}
          name={pokemon.name}
          id={pokemon.id}
          onClick={() => clickHandler(pokemon)}
          image={pokemon.sprites.other?.dream_world.front_default || ""}
        />
      ))}
    </main>
  );
};

export default PokedexCardList;
