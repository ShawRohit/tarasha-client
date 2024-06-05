import React, { useState } from 'react'
import { SliderProps } from './type';

const Slider: React.FC<SliderProps> = (props) => {
    const {
        slides
    } = props;
    const [currSlide, setCurrSlide] = useState<number>(0);

  return (
    <>
        {
            slides.length > 0 &&
            <div>
                {
                  slides[currSlide]  
                }
            </div>
        }
    </>
  )
}

export default Slider;
