import { render, fireEvent, screen } from "@testing-library/react";
import PokedexCard from "./PokedexCard"; // Adjust the import path

describe("PokedexCard", () => {
  const mockPokedex = {
    name: "Pikachu",
    id: 25,
    image: "pikachu-image-url",
    types: ["normal"],
    onClick: jest.fn(),
  };

  it("renders the component correctly", () => {
    render(<PokedexCard {...mockPokedex} />);

    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("025")).toBeInTheDocument();
    expect(screen.getByAltText("pokemon Pikachu")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    render(<PokedexCard {...mockPokedex} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockPokedex.onClick).toHaveBeenCalled();
  });

  it("calls onClick when Enter key is pressed", () => {
    render(<PokedexCard {...mockPokedex} />);
    fireEvent.keyUp(screen.getByRole("button"), { key: "Enter" });
    expect(mockPokedex.onClick).toHaveBeenCalled();
  });

  it("calls onClick when Space key is pressed", () => {
    render(<PokedexCard {...mockPokedex} />);
    fireEvent.keyUp(screen.getByRole("button"), { key: " " });
    expect(mockPokedex.onClick).toHaveBeenCalled();
  });
});
