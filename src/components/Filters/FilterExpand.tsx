import { NamedAPIResource } from "pokenode-ts";
import React, { useEffect, useState } from "react";
import RangeSlider from "../UI/RangeSlider";
import { Stats } from "../../models/Stats";

const FilterExpand: React.FC<{
  options: any[];
  type: string;
  value: Stats[] | string[];
  onChange: Function;
}> = ({ options, type, value, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<any[]>(value);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionChange = (option: string | Stats) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };
  const handleChange = (index: number, value: Stats) => {
    setSelectedOptions((prevStats) => {
      const newStats = [...prevStats];
      newStats[index] = value;
      return newStats;
    });
  };

  useEffect(() => {
    console.log(type + "=>" + selectedOptions);

    onChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="flex flex-col p-2 px-4 rounded-lg border border-poke-card">
      <div className="flex justify-between w-full">
        <h2 className="text-poke-card">{type}</h2>
        <p className="text-poke-card">
          <span className="text-left w-full">
            {selectedOptions.length > 0 && (
              <span className="capitalize">
                {type === "Stats"
                  ? selectedOptions[0].name
                  : selectedOptions[0]}{" "}
                {selectedOptions.length > 1 && (
                  <strong>+{selectedOptions.length - 1} More</strong>
                )}
              </span>
            )}
          </span>
        </p>
        <i
          onClick={() => setIsOpen((state) => !state)}
          className={`text-2xl fa ${
            isOpen ? "fa-minus-circle" : "fa-plus-circle"
          }`}
        />
      </div>
      {isOpen &&
        (type === "Stats" ? (
          <div className="flex flex-col gap-5 py-4">
            {options.map((option, index) => (
              <div>
                <label className="block text-md text-pk-blue mb-2 capitalize">
                  {option.name}
                </label>
                <RangeSlider
                  max={210}
                  min={0}
                  step={1}
                  value={
                    selectedOptions.find(
                      (value) => value.name === option.name
                    ) || {
                      name: option.name,
                      min: 0,
                      max: 210,
                    }
                  }
                  onChange={(value: any) => {
                    handleChange(index, { ...value, name: option.name });
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 border-t border-gray-200 mt-3 pt-3">
            <div className="flex gap-2 col-span-2 justify-end my-2">
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
                className="flex items-center px-4 py-2 text-sm text-pk-purple cursor-pointer capitalize"
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.name)}
                  onChange={() => handleOptionChange(option.name)}
                  className="mr-2 accent-pk-purple"
                />
                {option.name}
              </label>
            ))}
          </div>
        ))}
    </div>
  );
};
export default FilterExpand;
