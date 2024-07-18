import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../store/modalSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getPokeBgColor } from "../utils/getPokeBgStyle";
import { evolutionApi, pokemonApi } from "../constants/pokemon.api";
import { POKEBG_COLORS } from "../constants/PokeBgColors";
import { nextPoke, prevPoke } from "../store/pokemonSlice";
import ShimmerEvolution from "./UI/shimmer/ShimmerEvolution";

const PokedexDetails: React.FC = () => {
  const [weakAganist, setWeakAganist] = useState<string[]>([]);
  const [evolutions, setEvolutions] = useState<any[]>([]);
  const [showReadMore, setShowReadMore] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    selectedPokemon: pokemon,
    nextPokemon,
    prevPokemon,
  } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    fetchWeakAgainst();
    fetchEvolutionChain();
    async function fetchWeakAgainst() {
      if (pokemon) {
        const types = pokemon.types.map((type) => type.type.name);
        const typeWeaknesses = await Promise.all(
          types.map(async (type) => {
            const typeResponse = await pokemonApi.getTypeByName(type);
            return typeResponse.damage_relations.double_damage_from.map(
              (weakType) => weakType.name
            );
          })
        );

        setWeakAganist(Array.from(new Set(typeWeaknesses.flat())));
      }
    }

    async function fetchEvolutionChain() {
      if (pokemon) {
        setIsLoading(true);
        const result = await evolutionApi.getEvolutionChainById(pokemon.id);
        const chain = result.chain;
        const evolutionData: any[] = [];
        let currentChain = chain;
        while (currentChain) {
          const speciesUrl = currentChain.species.url;
          const speciesId =
            speciesUrl.split("/")[speciesUrl.split("/").length - 2];
          const evo = await pokemonApi.getPokemonById(+speciesId);
          evolutionData.unshift({
            id: evo.id,
            name: evo.name,
            image: evo.sprites.other?.dream_world.front_default,
            types: evo.types.map((type) => type.type.name),
          });
          currentChain = currentChain.evolves_to[0];
        }
        setEvolutions(evolutionData);
        setIsLoading(false);
      }
    }
  }, [pokemon]);

  if (!pokemon) return null;
  return (
    <div
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`Detials of ${pokemon.name}`}
      className="bg-pk-green-light p-6 md:w-[756px] w-full py-20 md:p-8"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-start mb-2 md:mb-8">
        <div
          className="order-2 md:order-1 row-span-2 border px-5 py-4 rounded-md text-center border-dashed border-poke-card"
          style={getPokeBgColor(pokemon.types.map((type) => type.type.name))}
        >
          <img
            src={pokemon.sprites.other?.dream_world.front_default || ""}
            alt={pokemon.name}
            className="mx-auto w-[155px] my-8"
          />
        </div>
        <div className="order-1 flex flex-col gap-4 col-span-2">
          <div className="grid grid-cols-2 md:flex md:justify-between md:gap-4">
            <h2 className="text-2xl font-bold text-poke-card">
              {pokemon.name.toUpperCase()}{" "}
            </h2>
            <div className="h-8 w-0.5 bg-gray-400 hidden md:block"></div>

            <span className="text-2xl text-poke-card order-1 md:order-none">
              {pokemon.id.toString().padStart(3, "0")}
            </span>
            <div className="h-8 w-0.5 bg-gray-400 hidden md:block"></div>
            <div className="flex gap-2 justify-end">
              {prevPokemon && (
                <button
                  onClick={() => dispatch(prevPoke())}
                  className="text-gray-500 hover:text-gray-700 hidden md:block"
                >
                  <i className="fa fa-circle-arrow-left" />
                </button>
              )}
              <button
                onClick={() => dispatch(closeModal())}
                className="text-gray-500 hover:text-gray-700 text-2xl md:text-lg"
              >
                <i className="far fa-regular fa-circle-xmark"></i>
              </button>
              {nextPokemon && (
                <button
                  onClick={() => dispatch(nextPoke())}
                  className="text-gray-500 hover:text-gray-700 hidden md:block"
                >
                  <i className="fa fa-circle-arrow-right" />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="order-3 md:w-[433px]">
          <p className="text-lg font-normal leading-1">
            <span className="hidden md:block">
              {pokemon.description.slice(0, 350) + " ..... "}
            </span>
            <span className="md:hidden">
              {pokemon.description.slice(0, 150) + " ..... "}
            </span>

            <strong
              className="underline cursor-pointer"
              onClick={() => setShowReadMore(true)}
            >
              read more
            </strong>
          </p>
        </div>
      </div>

      {showReadMore && (
        <div className="relative mb-8">
          <div className="text-sm p-4 bg-poke-card text-white font-light pr-8">
            {pokemon.description}
          </div>
          <span
            className="absolute top-4 text-white right-4 cursor-pointer"
            onClick={() => setShowReadMore(false)}
          >
            <i className="fa fa-close" />
          </span>
        </div>
      )}
      <div className="flex">
        <div className="flex-grow">
          {/* <p>{pokemon.description || 'asdfasdf'}</p> */}
          <div className="grid md:grid-cols-4 grid-cols-2 gap-8">
            <div className="flex-grow">
              <p className="font-bold">Height:</p>
              <p>{pokemon.height}</p>
            </div>
            <div className="flex-grow">
              <p className="font-bold">Weight:</p>
              <p>{pokemon.weight / 10} kg</p>
            </div>
            <div className="flex-grow">
              <p className="font-bold">Gender(s):</p>
              <p>{pokemon.gender.join(", ")}</p>
            </div>
            <div className="flex-grow">
              <p className="font-bold">Egg Groups:</p>
              <p className="capitalize">{pokemon.eggGroups.join(", ")}</p>
            </div>
            <div className="flex-grow">
              <p className="font-bold">Abilities:</p>
              <p className="capitalize">
                {pokemon.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </p>
            </div>
            <div className="flex-grow">
              <p className="font-bold">Types:</p>
              {pokemon.types.map((type) => (
                <button
                  className="px-2 py-1 rounded-md mr-1 border border-pk-blue capitalize text-sm"
                  style={{ background: POKEBG_COLORS[type.type.name] }}
                >
                  {type.type.name}
                </button>
              ))}
            </div>
            <div className="col-span-2">
              <p className="font-bold">Weak Aganist:</p>
              {weakAganist.map((type) => (
                <button
                  className="px-2 py-1 mb-1 rounded-md mr-1 border border-pk-blue capitalize text-sm"
                  style={{ background: POKEBG_COLORS[type] }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-pk-green-dark rounded-lg md:p-4 p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Stats</h2>
            <ul className="grid md:grid-cols-2 gap-4 list-none">
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.url} className="flex items-center gap-4">
                  <span className="capitalize text-[16px] basis-8/12">
                    {stat.stat.name}
                  </span>
                  <div className="bg-pk-green-dark-2 w-full h-4 relative">
                    <div
                      className="bg-pk-blue h-4 text-white p-2"
                      style={{ width: `${stat.base_stat}%`, maxWidth: "100%" }}
                    >
                      <span className="absolute top-0 text-[10px]">
                        {stat.base_stat}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 mb-4 max-w-full">
        <h3 className="font-bold text-poke-card text-xl mb-4">
          Evolution Chain
        </h3>
        {!isloading ? (
          <div className="flex items-center justify-between gap-8">
            {evolutions.map((evolution, index) => (
              <React.Fragment key={evolution.id}>
                <div
                  className="flex-grow-1 border p-2 md:p-4 py-4 rounded-md text-center border-dashed border-poke-card cursor-pointer"
                  style={getPokeBgColor(evolution.types)}
                >
                  <img
                    src={evolution.image}
                    alt={evolution.name}
                    className="md:w-32 md:h-32 w-16 h-16 mx-auto mb-2"
                  />
                  <p className="capitalize hidden md:block text-xl text-poke-card font-bold">
                    {evolution.name}
                  </p>
                  <p className="capitalize hidden md:block text-xl text-poke-card">
                    {evolution.id.toString().padStart(3, "0")}
                  </p>
                </div>
                {index < evolutions.length - 1 && (
                  <span className="text-2xl">
                    <i className="fa fa-arrow-right" />
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <ShimmerEvolution />
        )}
      </div>
      <div className="flex gap-5 mt-16 md:hidden">
        {prevPokemon && (
          <button
            onClick={() => dispatch(prevPoke())}
            className="bg-poke-card px-4 py-2 text-white flex-grow-1 rounded-lg w-full capitalize"
          >
            <i className="fa fa-arrow-left" />
            <span className="mx-4">{prevPokemon?.name}</span>
          </button>
        )}

        {nextPokemon && (
          <button
            onClick={() => dispatch(nextPoke())}
            className="bg-poke-card p-4 text-white flex-grow-1 rounded-lg w-full capitalize"
          >
            <span className="mx-4">{nextPokemon?.name}</span>
            <i className="fa fa-arrow-right" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PokedexDetails;
