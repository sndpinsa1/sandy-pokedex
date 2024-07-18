import React, { KeyboardEvent } from "react";
import { getPokeBgColor } from "../utils/getPokeBgStyle";
import { Pokedex } from "../models/Pokedex";

const PokedexCard: React.FC<Pokedex> = ({
  name,
  id,
  image,
  types,
  onClick,
}) => {
  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onClick();
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      className="border p-4 rounded-md text-center border-dashed border-poke-card cursor-pointer"
      style={getPokeBgColor(types)}
      onClick={onClick}
      onKeyUp={handleKeyPress}
      aria-label={`View details for ${name}`}
    >
      <img
        src={image}
        alt={`pokemon ${name}`}
        className="mx-auto w-[120px] h-[120px] my-8"
      />
      <p className="font-bold text-xl capitalize">{name}</p>
      <p className="text-xl">{id.toString().padStart(3, "0")}</p>
    </div>
  );
};

export default PokedexCard;
