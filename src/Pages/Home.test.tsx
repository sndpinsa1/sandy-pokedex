// src/pages/Home.test.tsx

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./Home"; // Import your Home component
import configureStore from "redux-mock-store";
import * as reactRedux from "react-redux";
import { mockPokemons } from "../constants/mocks/pokemons_mock";
import usePokemon from "../hooks/usePokedex";

jest.mock("../hooks/usePokedex");

// jest.mock("react-redux", () => ({
//   ...jest.requireActual("react-redux"), // Preserve the actual implementation
//   useSelector: jest.fn(), // Mock useSelector
//   useDispatch: jest.fn(), // Mock useDispatch
// }));
const mockUsePokemon = jest.mocked(usePokemon);

const mockStore = configureStore();
const store = mockStore({
  pokemon: {
    pokedexes: [],
    selectedPokemon: null,
    searchTerm: "",
    nextPokemon: null,
    prevPokemon: null,
    typeFilter: [],
    genderFilter: [],
    statsFilter: [],
  },
  modal: {
    isOpen: false,
    content: null,
  },
});
describe("Home Component", () => {
  beforeEach(() => {
    mockUsePokemon.mockReturnValue({
      pokemons: mockPokemons,
      loading: false,
      error: "",
      loadMore: jest.fn(),
    });
  });

  it("renders without crashing", () => {
    render(
      <reactRedux.Provider store={store}>
        <Home />
      </reactRedux.Provider>
    );

    expect(screen.getByText("Pokédex")).toBeInTheDocument();
  });

  it("loads more data when scrolled to the bottom", () => {
    const mockLoadMore = jest.fn();
    mockUsePokemon.mockReturnValue({
      pokemons: mockPokemons,
      loading: false,
      error: "",
      loadMore: mockLoadMore,
    });

    render(
      <reactRedux.Provider store={store}>
        <Home />
      </reactRedux.Provider>
    );

    Object.defineProperty(document.body, "scrollHeight", { value: 1000 });
    window.scrollY = 500;
    window.innerHeight = 500;
    fireEvent.scroll(window);
    expect(mockLoadMore).toHaveBeenCalled();
  });

  it("filters pokemons based on search term, type, gender, and stats", () => {
    const mockState = {
      pokemon: {
        searchTerm: "pikachu",
        typeFilter: ["normal"],
        genderFilter: ["male"],
        statsFilter: [{ name: "hp", min: 50, max: 100 }],
      },
    };

    render(
      <reactRedux.Provider store={store}>
        <Home />
      </reactRedux.Provider>
    );
    // const mockState = {
    //   pokemon: {
    //     searchTerm: "pikachu",
    //     typeFilter: ["normal"],
    //     genderFilter: ["male"],
    //     statsFilter: [{ name: "hp", min: 50, max: 100 }],
    //   },
    // };
    // store.dispatch(setFil)

    expect(screen.getByText("Pikachu")).toBeInTheDocument();
  });

  // Add more test cases for other behaviors, edge cases, etc.
});
