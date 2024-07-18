// SearchBar.test.tsx
import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "./SearchBar"; // Adjust the import path
import configureStore from "redux-mock-store"; // Import your mock store
import { Provider } from "react-redux";

describe("SearchBar", () => {
  const mockStore = configureStore(); // Create a mock Redux store
  const store = mockStore({}); // Initialize the store with an empty state

  it("renders the component correctly", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    // Verify that the input element is rendered
    const searchInput = screen.getByLabelText("Search by Name or Number");
    expect(searchInput).toBeInTheDocument();
  });

  it("dispatches setSearchTerm when input value changes", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const searchInput = screen.getByLabelText("Search by Name or Number");
    fireEvent.change(searchInput, { target: { value: "Pikachu" } });

    const actions = store.getActions();
    expect(actions[0].type).toBe("pokemon/setSearchTerm");
    expect(actions[0].payload).toBe("Pikachu");
  });

  //   it("prevents form submission", () => {
  //     render(
  //       <Provider store={store}>
  //         <SearchBar />
  //       </Provider>
  //     );
  //     const mockFun = jest.fn();
  //     const form = screen
  //       .getByLabelText("Search by Name or Number")
  //       .closest("form");
  //     fireEvent.submit(form);

  //     expect(mockFun).not.toHaveBeenCalled();
  //   });
});
