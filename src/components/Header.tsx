import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex flex-col gap-5 items-start md:flex-row md:items-center md:gap-5">
      <h1 className="text-3xl w-full md:w-auto text-[#2E3156] font-bold p-1 md:pr-5">
        Pokédex
      </h1>

      <div className="w-full h-[1px] bg-[#5D5F7E] md:w-[1px] md:h-12"></div>

      <p className="text-pk-purple text-xl md:pl-3">
        Search for any Pokémon that exists on the planet
      </p>
    </header>
  );
};

export default Header;
