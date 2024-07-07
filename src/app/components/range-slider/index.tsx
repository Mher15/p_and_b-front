import { useState } from "react";
import 'rc-slider/assets/index.css';
import "./styles.css"
import Slider from 'rc-slider';
import { currencyUnitMap, translate } from "../../translation";
import { useAppSelector } from "../../hooks";
import { VerticalLayout } from "../layouts";

interface IProps {
  min: number,
  max: number,
  onChange: (values: number[] | number) => void
}

export const RangeSlider = ({min, max, onChange}: IProps) => {
    const [value, setValue] = useState([min, max]);
    const locale = useAppSelector((state) => state.profile.locale);
 
    const handleSliderChange = (newValue: number[] | number) => {
        if (typeof newValue === "number") return;
        setValue(newValue);
    };
    const handleChangeComplete = (newValue: number[] | number) => {
        if (typeof newValue === "number") return;
        onChange(newValue)
    };

    return (
        <VerticalLayout>
            <p className="price-range-title">{translate('common.price', locale)}</p>
            <Slider
                min={min-1000}
                max={max+1000}
                value={value}
                onChange={handleSliderChange}
                onChangeComplete={handleChangeComplete}
                range
            />
            <p>{`${value[0]} ${currencyUnitMap[locale]} - ${value[1]} ${currencyUnitMap[locale]}`} </p>
        </VerticalLayout>
    );
}
