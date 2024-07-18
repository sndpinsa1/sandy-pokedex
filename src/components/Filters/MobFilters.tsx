import React, { useState } from "react";
import FilterExpand from "./FilterExpand";
import { FilterData } from "../SearchFilterbar";
import { useDispatch } from "react-redux";
import { setAllFilters } from "../../store/pokemonSlice";

const MobFilters: React.FC<{ filterData: FilterData[] }> = ({ filterData }) => {
  const [showMobFilters, setShowMobFilters] = useState<boolean>();
  const [filters, setFilters] = useState<{ [type: string]: any }>({});
  const dispatch = useDispatch();

  function changeHandler(type: string, selectedFilters: any[]) {
    setFilters((ft) => {
      return {
        ...ft,
        [type.toLowerCase()]: selectedFilters,
      };
    });
  }

  function resetFilters() {
    setFilters({});
    setShowMobFilters(false);
  }

  function applyFilters() {
    dispatch(setAllFilters(filters));
    setShowMobFilters(false);
  }

  return (
    <div className="md:hidden">
      <button
        onClick={() => setShowMobFilters(true)}
        className="md:hidden bg-[#2E3156] py-4 px-6 text-white rounded-lg"
      >
        <i className="fa-solid fa-sliders text-2xl"></i>
      </button>
      {showMobFilters && (
        <div className="absolute p-4 rounded-lg w-full top-0 left-0 bg-white">
          <div className="flex justify-between border-b border-poke-card mb-6 pb-2">
            <h2 className="text-poke-card text-2xl font-bold">Filters</h2>
            <i
              onClick={() => setShowMobFilters(false)}
              className="text-2xl far fa-regular fa-circle-xmark"
            ></i>
          </div>
          <div className="flex flex-col justify-between gap-4 h-[760px]">
            <div className="flex flex-col gap-4 overflow-auto">
              {filterData.map((ft, index) => {
                return (
                  <FilterExpand
                    value={
                      filters[ft.type] ? filters[ft.type]?.selectedFilters : []
                    }
                    options={ft.options}
                    type={ft.type}
                    onChange={(selectedFts: any) =>
                      changeHandler(ft.type, selectedFts)
                    }
                  />
                );
              })}
            </div>
            <div className="flex gap-6 w-full p-6 justify-center border-t shodow-poke-card">
              <button
                onClick={resetFilters}
                className="flex-grow text-poke-card border border-poke-card p-2 rounded-lg"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="flex-grow bg-poke-card text-white p-2 rounded-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MobFilters;
