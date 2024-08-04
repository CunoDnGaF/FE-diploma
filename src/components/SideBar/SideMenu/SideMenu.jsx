import Datepicker from '../../Datepicker/Datepicker';
import RangeSlider from './RangeSlider/RangeSlider';
import SideMenuTime from './SideMenuTime/SideMenuTime';
import { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { sideMenuGetOptions } from '../../../redux/slice/sideMenuSlice';

function SideMenu() {

  const dispatch = useDispatch();
  const {
    haveFirstClassState, 
    haveSecondClassState, 
    haveThirdClassState, 
    haveFourthClassState, 
    haveWifiState, 
    haveExpressState, 
    startDepartureHourFromState, 
    startDepartureHourToState, 
    startArrivalHourFromState, 
    startArrivalHourToState, 
    endDepartureHourFromState, 
    endDepartureHourToState, 
    endArrivalHourFromState, 
    endArrivalHourToState,
    minPriceState,
    maxPriceState,
    dateStartState,
    dateEndArrivalState,
  } = useSelector(state => state.sideMenu);

  const [haveFirstClass, setHaveFirstClass] = useState(haveFirstClassState);
  const [haveSecondClass, setHaveSecondClass] = useState(haveSecondClassState);
  const [haveThirdClass, setHaveThirdClass] = useState(haveThirdClassState);
  const [haveFourthClass, setHaveFourthClass] = useState(haveFourthClassState);
  const [haveWifi, setHaveWifi] = useState(haveWifiState);
  const [haveExpress, setHaveExpress] = useState(haveExpressState);
  const [startDepartureHourFrom, handleStartDepartureHourFrom] = useState(startDepartureHourFromState);
  const [startDepartureHourTo, handleStartDepartureHourTo] = useState(startDepartureHourToState);
  const [startArrivalHourFrom, handleStartArrivalHourFrom] = useState(startArrivalHourFromState);
  const [startArrivalHourTo, handleStartArrivalHourTo] = useState(startArrivalHourToState);
  const [endDepartureHourFrom, handleEndDepartureHourFrom] = useState(endDepartureHourFromState);
  const [endDepartureHourTo, handleEndDepartureHourTo] = useState(endDepartureHourToState);
  const [endArrivalHourFrom, handleEndArrivalHourFrom] = useState(endArrivalHourFromState);
  const [endArrivalHourTo, handleEndArrivalHourTo] = useState(endArrivalHourToState);
  const [minPrice, handleMinPrice] = useState(minPriceState);
  const [maxPrice, handleMaxPrice] = useState(maxPriceState);
  const [dateStart, setDateStart] = useState(dateStartState);
  const [dateEndArrival, setDateEndArrival] = useState(dateEndArrivalState);

  useEffect(() => {
    dispatch(sideMenuGetOptions({
      haveFirstClass: haveFirstClass, 
      haveSecondClass: haveSecondClass, 
      haveThirdClass: haveThirdClass, 
      haveFourthClass: haveFourthClass, 
      haveWifi: haveWifi, 
      haveExpress: haveExpress, 
      startDepartureHourFrom: startDepartureHourFrom, 
      startDepartureHourTo: startDepartureHourTo, 
      startArrivalHourFrom: startArrivalHourFrom, 
      startArrivalHourTo: startArrivalHourTo, 
      endDepartureHourFromL: endDepartureHourFrom, 
      endDepartureHourTo: endDepartureHourTo, 
      endArrivalHourFrom: endArrivalHourFrom, 
      endArrivalHourTo: endArrivalHourTo,
      minPrice: minPrice,
      maxPrice: maxPrice,
      dateStart: dateStart,
      dateEndArrival: dateEndArrival,
    }))
  }, [
    haveFirstClass, 
    haveSecondClass, 
    haveThirdClass, 
    haveFourthClass, 
    haveWifi, 
    haveExpress, 
    startDepartureHourFrom, 
    startDepartureHourTo, 
    startArrivalHourFrom, 
    startArrivalHourTo, 
    endDepartureHourFrom, 
    endDepartureHourTo, 
    endArrivalHourFrom, 
    endArrivalHourTo,
    minPrice,
    maxPrice,
    dateStart,
    dateEndArrival,
  ]);

  const onChange = (type) => {
    if(type === 'second') {
      if(haveSecondClass === '') {
        setHaveSecondClass(true);
      } else {
        setHaveSecondClass('');
      }
    }
    if(type === 'first') {
      if(haveFirstClass === '') {
        setHaveFirstClass(true);
      } else {
        setHaveFirstClass('');
      }
    }
    if(type === 'third') {
      if(haveThirdClass === '') {
        setHaveThirdClass(true);
      } else {
        setHaveThirdClass('');
      }
    }
    if(type === 'fourth') {
      if(haveFourthClass === '') {
        setHaveFourthClass(true);
      } else {
        setHaveFourthClass('');
      }
    }
    if(type === 'wifi') {
      if(haveWifi === '') {
        setHaveWifi(true);
      } else {
        setHaveWifi('');
      }
    }
    if(type === 'express') {
      if(haveExpress === '') {
        setHaveExpress(true);
      } else {
        setHaveExpress('');
      }
    }
  }
  
  return (
  <div className='side-menu'>
      <form className='side-menu-form'>
        <h2 className='side-menu-header'>Дата поездки</h2>
        <Datepicker className="side-menu-date" dateHandler={setDateStart}/>
        <h2 className='side-menu-header'>Дата возвращения</h2>
        <Datepicker className="side-menu-date" dateHandler={setDateEndArrival}/>
      </form>
      <div className='side-menu-divider'></div>
        <ul className='side-menu-checkboxes'>
          <li>
            <img src='./src/svg/coupe.svg'></img>
            <label className='side-menu-toggle'>
              <span className='side-menu-toggle-header'>Купе</span>
              <input type="checkbox" className='side-menu-checkbox' checked={haveSecondClass} onChange={() => onChange('second')}/>
              <div className="side-menu-toggle-switch"></div>
            </label>
          </li>
          <li>
            <img src='./src/svg/plc.svg'></img>
            <label className='side-menu-toggle'>
              <span className='side-menu-toggle-header'>Плацкарт</span>
              <input type="checkbox" className='side-menu-checkbox' checked={haveThirdClass} onChange={() => onChange('third')}/>
              <div className="side-menu-toggle-switch"></div>
            </label>
          </li>
          <li>
            <img src='./src/svg/sitting.svg'></img>
            <label className='side-menu-toggle'>
              <span className='side-menu-toggle-header'>Сидячий</span>
              <input type="checkbox" className='side-menu-checkbox' checked={haveFourthClass} onChange={() => onChange('fourth')}/>
              <div className="side-menu-toggle-switch"></div>
            </label>
          </li>
          <li>
            <img src='./src/svg/lux.svg'></img>
            <label className='side-menu-toggle'>
              <span className='side-menu-toggle-header'>Люкс</span>
              <input type="checkbox" className='side-menu-checkbox' checked={haveFirstClass} onChange={() => onChange('first')}/>
              <div className="side-menu-toggle-switch"></div>
            </label>
          </li>
          <li>
            <img src='./src/svg/wifi.svg'></img>
            <label className='side-menu-toggle'>
              <span className='side-menu-toggle-header'>Wi-Fi</span>
              <input type="checkbox" className='side-menu-checkbox' checked={haveWifi} onChange={() => onChange('wifi')}/>
              <div className="side-menu-toggle-switch"></div>
            </label>
          </li>
          <li>
            <img src='./src/svg/express.svg'></img>
            <label className='side-menu-toggle'>
              <span className='side-menu-toggle-header'>Экспресс</span>
              <input type="checkbox" className='side-menu-checkbox' checked={haveExpress} onChange={() => onChange('express')}/>
              <div className="side-menu-toggle-switch"></div>
            </label>
          </li>
        </ul>
      <div className='side-menu-divider'></div>
      <div className='side-menu-price'>
        <h2 className='side-menu-header'>Стоимость</h2>
        <RangeSlider type='price' minValueState={minPriceState} maxValueState={maxPriceState} min={0} max={10000} handleMinValue={handleMinPrice} handleMaxValue={handleMaxPrice}/>
      </div>
      <div className='side-menu-divider'></div>
      <SideMenuTime direction={'from'} minValueFirst={(startDepartureHourFromState + 1000)/1000} maxValueFirst={(startDepartureHourToState + 1000)/1000} minValueSecond={(startArrivalHourFromState + 1000)/1000} maxValueSecond={(startArrivalHourToState + 1000)/1000} handleMinValueFirst={handleStartDepartureHourFrom} handleMaxValueFirst={handleStartDepartureHourTo} handleMinValueSecond={handleStartArrivalHourFrom} handleMaxValueSecond={handleStartArrivalHourTo}/>
      <div className='side-menu-divider'></div>
      <SideMenuTime direction={'to'}  minValueFirst={(endDepartureHourFromState + 1000)/1000} maxValueFirst={(endDepartureHourToState + 1000)/1000} minValueSecond={(endArrivalHourFromState + 1000)/1000} maxValueSecond={(endArrivalHourToState + 1000)/1000} handleMinValueFirst={handleEndDepartureHourFrom} handleMaxValueFirst={handleEndDepartureHourTo} handleMinValueSecond={handleEndArrivalHourFrom} handleMaxValueSecond={handleEndArrivalHourTo}/>
    </div>
  )
}

export default SideMenu;