import BG from "../../../assets/slider-button-bg.svg";
import LEFT_ARROW from "../../../assets/slider-arrow-left.svg";
import RIGHT_ARROW from "../../../assets/slider-arrow-right.svg";

interface ISliderButtonProps {
  onClick: () => void;
  showArrow: boolean;
}

export const LeftSliderButton = ({
  onClick,
  showArrow,
}: ISliderButtonProps) => {
  const handleClick = showArrow ? onClick : undefined;

  return (
    <div className="slider-button-container" onClick={handleClick}>
      <img className="slider-button-bg" src={BG} />
      {showArrow && <img className="slider-button-arrow" src={LEFT_ARROW} />}
    </div>
  );
};

export const RightSliderButton = ({
  onClick,
  showArrow,
}: ISliderButtonProps) => {
  const handleClick = showArrow ? onClick : undefined;
  return (
    <div className="slider-button-container" onClick={handleClick}>
      <img className="slider-button-bg" src={BG} />
      {showArrow && <img className="slider-button-arrow" src={RIGHT_ARROW} />}
    </div>
  );
};
