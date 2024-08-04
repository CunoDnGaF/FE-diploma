import { useState } from 'react';
import MultiRangeSlider from "multi-range-slider-react";
import './RangeSlider.css';

function RangeSlider({type, min, max, handleMinValue, handleMaxValue, minValueState, maxValueState}) {
  let className = '';

  let totalLength = max - min;
  let middle = totalLength/2;
  let leftLimit = middle/2;
  let rightLimit = middle+leftLimit;
  
  const [minValue, set_minValue] = useState(minValueState);
  const [maxValue, set_maxValue] = useState(maxValueState);
  
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
    if(type === 'time') {
      handleMinValue((e.minValue*1000)-1000);
      handleMaxValue((e.maxValue*1000)-1000);
    }
    if(type === 'price') {
      handleMinValue(e.minValue);
      handleMaxValue(e.maxValue);
    }
  };

  const leftLabelActive = () => {
    if(minValue < leftLimit) {
      return false;
    }
    return true;
  }

  const rightLabelActive = () => {
    if(maxValue > rightLimit) {
      return false;
    }
    return true;
  }

  if (type === 'time') {
    className = 'range-slider-time';
  }

  if (type === 'price') {
    className = 'range-slider-price';
  }

  return (
    <div className={className}>
      <span className='top-labels labels-left'>от</span>
      <span className='top-labels labels-right'>до</span>
      <MultiRangeSlider
        min={min}
        max={max}
        step={1}
        minValue={minValue}
        maxValue={maxValue}
        label={false}
        ruler={false}
        barRightColor='transparent'
        barLeftColor='transparent'
        barInnerColor='rgba(255, 168, 0, 1)'
        onInput={(e) => {
          handleInput(e);
        }}
      />
      <span className={leftLabelActive() ? 'bottom-labels labels-left' : 'bottom-labels labels-left labels-unactive'}>{type === 'time' ? '0:00' : min}</span>
      <span className={rightLabelActive() ? 'bottom-labels labels-right' : 'bottom-labels labels-right labels-unactive'}>{type === 'time' ? '24:00' : max}</span>
    </div>
  )
}

export default RangeSlider;