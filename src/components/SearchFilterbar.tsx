import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import PokeFilter from "./Filters/PokeFilter";
import { NamedAPIResource } from "pokenode-ts";
import { pokemonApi } from "../constants/pokemon.api";
import MobFilters from "./Filters/MobFilters";
import ShimmerFilter from "./UI/shimmer/ShimmerFilter";

export type FilterData = {
  type: string;
  options: NamedAPIResource[];
};
const SearchFilterbar: React.FC = () => {
  const [filterData, setFilterData] = useState<FilterData[]>([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFilterData();
    async function fetchFilterData() {
      setIsLoading(true);
      let filters = [];
      const type = await pokemonApi.listTypes();
      filters.push({ type: "Type", options: type.results });
      const genders = await pokemonApi.listGenders();
      filters.push({ type: "Gender", options: genders.results });
      const stats = await pokemonApi.listStats();
      filters.push({ type: "Stats", options: stats.results });
      setFilterData(filters);
      setIsLoading(false);
    }
  }, []);

  return (
    <section aria-label="Search and Filters" className="flex gap-8 pt-8">
      <div className="md:w-[50%] w-full">
        <SearchBar />
      </div>
      <div className="md:flex hidden gap-8 w-[50%] ">
        {!isloading ? (
          filterData.map((filter) => (
            <PokeFilter
              key={filter.type}
              type={filter.type}
              options={filter.options}
            />
          ))
        ) : (
          <ShimmerFilter />
        )}
      </div>

      <MobFilters filterData={filterData} />
    </section>
  );
};

export default SearchFilterbar;
