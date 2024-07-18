// PokedexCardList.test.tsx
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux"; // Import your Redux provider
import configureStore from "redux-mock-store"; // Import your mock store
import PokedexCardList from "./PokedexCardList"; // Adjust the import path
import { mockPokemons } from "../constants/mocks/pokemons_mock";

describe("PokedexCardList", () => {
  const mockStore = configureStore(); // Create a mock Redux store
  const store = mockStore({}); // Initialize the store with an empty state

  it("renders the component correctly", () => {
    render(
      <Provider store={store}>
        <PokedexCardList pokemons={mockPokemons} />
      </Provider>
    );

    // Verify that Bulbasaur is rendered
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("012")).toBeInTheDocument();
    expect(screen.getByAltText("pokemon Pikachu")).toBeInTheDocument();
  });

  it("dispatches openModal and setSelectedPokemon when a card is clicked", () => {
    render(
      <Provider store={store}>
        <PokedexCardList pokemons={mockPokemons} />
      </Provider>
    );

    // Simulate a click on the Bulbasaur card
    fireEvent.click(
      screen.getByRole("button", { name: "View details for Pikachu" })
    );

    // Verify that openModal and setSelectedPokemon were dispatched
    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe("modal/openModal");
    expect(actions[1].type).toBe("pokemon/setSelectedPokemon");
  });
});
