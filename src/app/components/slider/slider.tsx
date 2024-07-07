import { useState } from 'react';
import { ISliderProps } from '../../types';
import { LeftSliderButton, RightSliderButton } from './slider-buttons';

export const Slider = <T,>({chunkSize, renderItem, items}: ISliderProps<T>) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === items.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? items.length - 1 : prevSlide - 1));
  };
  
  const showLeftArrow = currentSlide !== 0;
  const showRightArrow = currentSlide !== (items.length - chunkSize > 0 ? items.length - chunkSize: 0);
  
  return (
    <div className="product-groups-slider">
      <LeftSliderButton showArrow={showLeftArrow} onClick={prevSlide}/>
      <div className="product-groups-slider-content">
        {
          items.slice(currentSlide, currentSlide + chunkSize).map((item) => (
            renderItem(item)
          ))}
      </div>
      <RightSliderButton onClick={nextSlide} showArrow={showRightArrow}/>
    </div>
  );
  
};