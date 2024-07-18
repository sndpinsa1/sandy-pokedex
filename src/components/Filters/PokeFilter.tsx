import React, { useEffect, useRef, useState } from "react";
import StatsFilter from "./StatsFilter";
import { NamedAPIResource } from "pokenode-ts";
import { useDispatch } from "react-redux";
import { setFilters } from "../../store/pokemonSlice";
import { Stats } from "../../models/Stats";

const PokeFilter: React.FC<{ type: string; options: NamedAPIResource[] }> = ({
  type,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [stats, setStats] = useState<Stats[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  useEffect(() => {
    dispatch(
      setFilters({
        filterType: type.toLowerCase(),
        filterValue: selectedOptions,
      })
    );
  }, [selectedOptions]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  function applyStatsFilterHandler(stats: Stats[]) {
    setStats(stats);
    dispatch(
      setFilters({
        filterType: type.toLowerCase(),
        filterValue: stats,
      })
    );
    setIsOpen(false);
  }

  function statsLabel() {
    if (stats.length > 0) {
      return (
        <span className="capitalize">
          {stats[0].name}{" "}
          {stats.length > 1 && <strong>+{stats.length - 1} More</strong>}
        </span>
      );
    } else {
      return `Select ${type}`;
    }
  }

  function otherLabel() {
    if (selectedOptions.length > 0) {
      return (
        <span className="capitalize">
          {selectedOptions[0]}{" "}
          {selectedOptions.length > 1 && (
            <strong>+{selectedOptions.length - 1} More</strong>
          )}
        </span>
      );
    } else {
      return `Select ${type}`;
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <label className="text-pk-purple text-[16px] hidden md:block pl-3 ">
        {type}
      </label>
      <button
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="dropdown-list"
        className={`flex w-full text-pk-purple border p-4 text-[16px] bg-[#C9DDE2] outline-pk-purple rounded-lg ${
          isOpen && "bg-white"
        }`}
      >
        <span className="text-left w-full">
          {type !== "Stats" ? otherLabel() : statsLabel()}
        </span>
        {isOpen ? (
          <i className="fa fa-angle-up" />
        ) : (
          <i className="fa fa-angle-down" />
        )}
      </button>

      {isOpen && (
        <div
          id="dropdown-list"
          role="listbox"
          className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          {type === "Stats" ? (
            <StatsFilter
              onClose={toggleDropdown}
              type={type}
              options={options}
              onApply={applyStatsFilterHandler}
              value={stats}
            />
          ) : (
            <div className="py-1 p-4">
              <div className="flex gap-2 justify-end my-2">
                <button
                  onClick={() =>
                    setSelectedOptions([...options.map((op) => op.name)])
                  }
                  className="text-xs underline"
                >
                  Select All
                </button>
                {selectedOptions.length > 0 && (
                  <button
                    onClick={() => setSelectedOptions([])}
                    className="text-xs underline"
                  >
                    Deselect All
                  </button>
                )}
              </div>
              {options.map((option: NamedAPIResource) => (
                <label
                  key={option.name}
                  className="flex items-center px-4 py-2 text-sm text-pk-purple cursor-pointer hover:bg-gray-100 border-b-2 last:border-none capitalize"
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option.name)}
                    onChange={() => handleOptionChange(option.name)}
                    className="mr-2 accent-pk-purple"
                    aria-labelledby={`option-${option.name}`}
                  />
                  <span id={`option-${option.name}`}>{option.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PokeFilter;
