import { useEffect, useState } from "react";
import { Pokemon, PokemonClient } from "pokenode-ts";
import { useDispatch } from "react-redux";
import { setPokemonsState } from "../store/pokemonSlice";
const api = new PokemonClient();
export interface PokeDetail extends Pokemon {
  gender: string[];
  eggGroups: string[];
  description: string;
}
const usePokemon = () => {
  const [pokemons, setPokemons] = useState<PokeDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const distpatch = useDispatch();

  const fetchPokemon = async () => {
    try {
      setLoading(true);

      const response = await api.listPokemons(offset, 24);
      const results = await Promise.all(
        response.results.map(async (pokemon: { name: string; url: string }) => {
          const species = await api.getPokemonSpeciesByName(pokemon.name);
          const eggGroups = species.egg_groups.map((egg) => egg.name);
          let desc: string[] = [];
          species.flavor_text_entries.forEach((entry) => {
            if (entry.language.name === "en") {
              if (!desc.includes(entry.flavor_text)) {
                desc.push(entry.flavor_text);
              }
            }
          });
          const genderRate = species.gender_rate;

          let gender;
          if (genderRate === -1) {
            gender = ["Genderless"];
          } else if (genderRate === 1) {
            gender = ["Male"];
          } else if (genderRate === 8) {
            gender = ["Female"];
          } else {
            gender = ["Male", "Female"];
          }
          const poke = await api.getPokemonByName(pokemon.name);
          return {
            ...poke,
            eggGroups,
            description: desc.join(". "),
            gender,
          };
        })
      );
      setPokemons((prev) => [...prev, ...results]);
      distpatch(setPokemonsState(results));
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch Pokémon");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  const loadMore = () => {
    setOffset((prev) => prev + 24);
  };

  return { pokemons, loading, error, loadMore };
};

export default usePokemon;
