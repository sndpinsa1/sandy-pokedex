import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchFilterbar from "./SearchFilterbar";
import { pokemonApi } from "../constants/pokemon.api";
import configureStore from "redux-mock-store"; // Import your mock store
import { Provider } from "react-redux";

// Mock the pokemonApi methods
jest.mock("../constants/pokemon.api", () => ({
  pokemonApi: {
    listTypes: jest.fn(),
    listGenders: jest.fn(),
    listStats: jest.fn(),
  },
}));

describe("SearchFilterbar", () => {
  const mockStore = configureStore();
  const store = mockStore({});

  beforeEach(() => {
    (pokemonApi.listTypes as jest.Mock).mockResolvedValueOnce({
      results: [{ name: "fire", url: "/type/fire" }],
    });
    (pokemonApi.listGenders as jest.Mock).mockResolvedValueOnce({
      results: [{ name: "male", url: "/gender/male" }],
    });
    (pokemonApi.listStats as jest.Mock).mockResolvedValueOnce({
      results: [{ name: "speed", url: "/stat/speed" }],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <SearchFilterbar />
        </Provider>
      );
    });
    expect(await screen.findByText("Search by")).toBeInTheDocument();
  });

  test("renders filters after data fetch", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <SearchFilterbar />
        </Provider>
      );
    });
    await waitFor(() => {
      expect(pokemonApi.listTypes).toHaveBeenCalled();
    });

    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Stats")).toBeInTheDocument();
  });
});
