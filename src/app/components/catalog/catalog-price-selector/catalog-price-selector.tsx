import { Slider } from "antd";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ISearchParams } from "../../../types";

interface ICatalogPriceSelectorProps {
  max: number;
  min: number;
  isFilterOpen: boolean;
}

export const CatalogPriceSelector = ({
  max,
  min,
  isFilterOpen,
}: ICatalogPriceSelectorProps) => {
  const [sliderValue, setSliderValue] = useState([min || 0, max || 0]);

  const [minValue, maxValue] = sliderValue;
  const [searchParams, setSearchParams] = useSearchParams();

  const params: ISearchParams = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  const onChange = (newValue: number[]) => {
    setSliderValue(newValue);
    setSearchParams({
      ...params,
      minPrice: sliderValue[0].toString(),
      maxPrice: sliderValue[1].toString(),
    });
  };

  return (
    <div className={`filter__item ${isFilterOpen ? "open" : ""}`}>
      <button className="btn--reset title title--sm filter__header">
        <span>Цена</span>
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 7L7 1L1 7"
            stroke="#1A1A1A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className="filter__inner"
        style={!isFilterOpen ? { display: "none" } : {}}
      >
        <div className="filter__range-wrapper">
          <Slider
            range
            max={max + 1000}
            min={0}
            defaultValue={[min, max]}
            onChange={onChange}
          />

          <div className="filter__range-result">
            <span>{minValue} ₽</span> — <span>{maxValue} ₽</span>
          </div>
        </div>
      </div>
    </div>
  );
};
