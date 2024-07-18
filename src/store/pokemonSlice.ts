import { createSlice } from "@reduxjs/toolkit";
import { PokeDetail } from "../hooks/usePokedex";
import { Stats } from "../models/Stats";

interface PokedexState {
  pokedexes: PokeDetail[];
  selectedPokemon: PokeDetail | null;
  nextPokemon: PokeDetail | null;
  prevPokemon: PokeDetail | null;
  searchTerm: string;
  typeFilter: string[];
  genderFilter: string[];
  statsFilter: Stats[];
}

const initPokemonState: PokedexState = {
  pokedexes: [],
  selectedPokemon: null,
  searchTerm: "",
  nextPokemon: null,
  prevPokemon: null,
  typeFilter: [],
  genderFilter: [],
  statsFilter: [],
};

const pokemonSlice = createSlice({
  name: "pokemon",
  reducers: {
    setPokemonsState: (state, action) => {
      state.pokedexes = [...state.pokedexes, ...action.payload];
    },
    setSelectedPokemon: (state, action) => {
      const pokeIndex = state.pokedexes.findIndex(
        (poke) => poke.id === action.payload.id
      );
      if (state.pokedexes[pokeIndex + 1]) {
        state.nextPokemon = state.pokedexes[pokeIndex + 1];
      } else {
        state.nextPokemon = null;
      }
      if (state.pokedexes[pokeIndex - 1]) {
        state.prevPokemon = state.pokedexes[pokeIndex - 1];
      } else {
        state.prevPokemon = null;
      }
      state.selectedPokemon = action.payload;
    },
    nextPoke: (state) => {
      const pokeIndex = state.pokedexes.findIndex((poke) => {
        return poke.id === state?.nextPokemon?.id;
      });

      state.selectedPokemon = state.nextPokemon;

      if (state.pokedexes[pokeIndex + 1]) {
        state.nextPokemon = state.pokedexes[pokeIndex + 1];
      } else {
        state.nextPokemon = null;
      }
      if (state.pokedexes[pokeIndex - 1]) {
        state.prevPokemon = state.pokedexes[pokeIndex - 1];
      } else {
        state.prevPokemon = null;
      }
    },
    prevPoke: (state) => {
      const pokeIndex = state.pokedexes.findIndex(
        (poke) => poke.id === state?.prevPokemon?.id
      );
      state.selectedPokemon = state.prevPokemon;

      if (state.pokedexes[pokeIndex + 1]) {
        state.nextPokemon = state.pokedexes[pokeIndex + 1];
      } else {
        state.nextPokemon = null;
      }
      if (state.pokedexes[pokeIndex - 1]) {
        state.prevPokemon = state.pokedexes[pokeIndex - 1];
      } else {
        state.prevPokemon = null;
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilters: (state, action) => {
      const type = action.payload.filterType;
      switch (type) {
        case "type":
          state.typeFilter = action.payload.filterValue;
          break;
        case "gender":
          state.genderFilter = action.payload.filterValue;
          break;
        case "stats":
          state.statsFilter = action.payload.filterValue;
          break;
        default:
          console.log("invald filter type");
      }
    },
    setAllFilters: (state, action) => {
      state.typeFilter = action.payload.type;
      state.genderFilter = action.payload.gender;
      state.statsFilter = action.payload.stats;
    },
  },
  initialState: initPokemonState,
});

export const {
  setPokemonsState,
  setSelectedPokemon,
  nextPoke,
  prevPoke,
  setSearchTerm,
  setFilters,
  setAllFilters,
} = pokemonSlice.actions;
export default pokemonSlice.reducer;
