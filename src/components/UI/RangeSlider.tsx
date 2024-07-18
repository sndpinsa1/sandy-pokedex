import React, { useState, useRef, useEffect } from "react";
import classes from "./RangeSlider.module.css";
import { Stats } from "../../models/Stats";
// Define the props type
interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  onChange: Function;
  value: Stats;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step,
  onChange,
  value,
}) => {
  const [minVal, setMinVal] = useState<number>(value.min);
  const [maxVal, setMaxVal] = useState<number>(value.max);

  const minValRef = useRef<number>(min);
  const maxValRef = useRef<number>(max);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = (value: number): number =>
    Math.round(((value - min) / (max - min)) * 100);

  useEffect(() => {
    if (maxValRef.current !== null) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxValRef.current);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, maxVal]);

  return (
    <div className={classes["range-container"]}>
      <span className="text-lg ml-2 mr-6">{min}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          onChange({
            min: value,
            max: maxVal,
          });
          setMinVal(value);
          minValRef.current = value;
        }}
        style={{ zIndex: minVal === max - step ? 999 : undefined }}
        className={`${classes["range"]} ${classes["range__left"]}`}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          onChange({
            max: value,
            min: minVal,
          });
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className={`${classes["range"]} ${classes["range__right"]}`}
      />
      <div className={classes["slider"]}>
        <div className={classes["slider__track"]} />
        <div ref={range} className={classes["slider__range"]} />
        <div
          className={`${classes["thumb-value"]} ${classes["thumb-value--left"]}"`}
          style={{
            left: `${getPercent(minVal)}%`,
            zIndex: minVal === max - step ? 999 : undefined,
          }}
        >
          {minVal}
        </div>
        <div
          className={`${classes["thumb-value"]} ${classes["thumb-value--right"]}"`}
          style={{ left: `${getPercent(maxVal)}%` }}
        >
          {maxVal}
        </div>
      </div>
      <span className="text-lg ml-6 mr-2">{max}</span>
    </div>
  );
};

export default RangeSlider;
