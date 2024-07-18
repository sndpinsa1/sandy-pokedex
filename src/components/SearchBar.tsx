import React, { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../store/pokemonSlice";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  function handleSearchSubmit(event: FormEvent) {
    event.preventDefault();
  }
  return (
    <form onSubmit={handleSearchSubmit} className="relative w-full">
      <label
        htmlFor="searchInput"
        className="text-pk-purple text-[16px] hidden md:block pl-3 "
      >
        Search by
      </label>
      <input
        type="text"
        id="searchInput"
        aria-label="Search by Name or Number"
        placeholder="Name or Number"
        className="border p-4 w-full text-pk-purple/50 text-[16px] bg-[#C9DDE2] outline-pk-purple rounded-lg pl-4 pr-10"
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      <span className="absolute text-xl right-5 md:top-14 top-8 transform -translate-y-1/2 text-pk-purple">
        <i className="fas fa-search"></i>
      </span>
    </form>
  );
};

export default SearchBar;
