import { useState } from 'react';
import RangeSlider from '../RangeSlider/RangeSlider';

function SideMenuTime({direction, handleMinValueFirst, handleMaxValueFirst, handleMinValueSecond, handleMaxValueSecond, minValueFirst, maxValueFirst, minValueSecond, maxValueSecond}) {
  const [directionInChecked, setDirectionInChecked] = useState(false);
  const [directionOutChecked, setDirectionOutChecked] = useState(false);
  const [passengersChecked, setPassengersChecked] = useState(false);

  function chengeCheckbox(index) {
    if(index === 0) {
      setDirectionInChecked(!directionInChecked);
    }
    if(index === 1) {
      setDirectionOutChecked(!directionOutChecked);
    }
    if(index === 2) {
      setPassengersChecked(!passengersChecked);
    }
  }

  return (
    <div className='side-menu-details'>
        <div className='side-menu-details-header'>
          {
          direction === 'from' ? <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5 0C2.23828 0 0 2.23859 0 5V21C0 23.7614 2.23828 26 5 26H27C29.7617 26 32 23.7614 32 21V5C32 2.23859 29.7617 0 27 0H5ZM17.8369 14.2237V17.3333C19.3447 15.8793 20.8672 14.4108 22.3164 13.0288L20.5342 11.2945C19.6396 10.4247 18.7334 9.54568 17.8223 8.66666V11.949H9.68457V14.2237H17.8369Z" fill="#FFA800"/>
          </svg>
          : <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M27 0C29.7617 0 32 2.23859 32 5V21C32 23.7614 29.7617 26 27 26H5C2.23828 26 0 23.7614 0 21V5C0 2.23859 2.23828 0 5 0H27ZM14.1631 14.2237V17.3333L14.084 17.2577C12.6025 15.8284 11.1074 14.3869 9.68359 13.0288L9.8125 12.9044C11.2354 11.5182 12.6992 10.0924 14.1777 8.66666V11.949H22.3154V14.2237H14.1631Z" fill="#FFA800"/>
          </svg>
          }
          <h2 className='side-menu-details-title'>{direction === 'from' ? 'Туда' : 'Обратно'}</h2>
          <label className="side-menu-details-toggle">
            <input type="checkbox" checked={directionInChecked} onChange={() => chengeCheckbox(0)}></input>
            <span></span>
          </label>
        </div>
        <div className={directionInChecked ? 'side-menu-time-body smdb-active' : 'side-menu-time-body'}>
          <span className='side-menu-time-body-title'>Время отбытия</span>
          <RangeSlider  type='time' min={0} minValueState={minValueFirst} maxValueState={maxValueFirst} max={24} handleMinValue={handleMinValueFirst} handleMaxValue={handleMaxValueFirst}/>
          <span className='side-menu-time-body-title'>Время прибытия</span>
          <RangeSlider  type='time' min={0} max={24} minValueState={minValueSecond} maxValueState={maxValueSecond} handleMinValue={handleMinValueSecond} handleMaxValue={handleMaxValueSecond}/>
        </div>
    </div>
  )
}

export default SideMenuTime;