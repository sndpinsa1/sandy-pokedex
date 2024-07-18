import { useState } from "react";
import RangeSlider from "../UI/RangeSlider";
import { Stats } from "../../models/Stats";

const StatsFilter: React.FC<{
  onClose: any;
  type: string;
  options: any[];
  onApply: Function;
  value: Stats[];
}> = ({ onClose, type, options, onApply, value }) => {
  const [stats, setStats] = useState<Stats[]>(value);

  const handleChange = (index: number, value: Stats) => {
    setStats((prevStats) => {
      const newStats = [...prevStats];
      newStats[index] = value;
      return newStats;
    });
  };

  const resetStats = () => {
    setStats([]);
    onApply([]);
  };

  const applyFilters = () => {
    onApply(stats);
  };

  return (
    <div className="flex items-center justify-end bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex-grow">
        <div className="flex justify-between items-center mb-4 w-[580px]">
          <h2 className="text-3xl font-bold mb-2 text-pk-blue">Select Stats</h2>
          <button onClick={onClose} aria-label="close icon">
            <span className="text-2xl">
              <i className="far fa-regular fa-circle-xmark"></i>
            </span>
          </button>
        </div>
        {options.map((stat, index) => (
          <div key={stat.name} className="flex justify-between gap-8 mb-4">
            <label className="block w-32 text-md text-pk-blue mb-2 capitalize">
              {stat.name}
            </label>
            <div className="flex-grow">
              <RangeSlider
                max={210}
                min={0}
                step={1}
                value={
                  stats.find((value) => value.name === stat.name) || {
                    name: stat.name,
                    min: 0,
                    max: 210,
                  }
                }
                onChange={(value: any) => {
                  handleChange(index, { ...value, name: stat.name });
                }}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-end mt-6">
          <button
            onClick={resetStats}
            className="px-4 py-2 mr-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Reset
          </button>
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-pk-blue text-white rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsFilter;
