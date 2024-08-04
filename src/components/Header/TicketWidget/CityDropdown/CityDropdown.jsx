import React from 'react';
import { useState, useEffect } from 'react';
import { setError } from '../../../../redux/slice/appStateSlice';
import { useDispatch } from 'react-redux';

function CityDropdown({formErrorHendler, fromCityHandler, toCityHandler}) {
  const dispatch = useDispatch();
  const [fromCityValue, setFromCityValue] = useState('');
  const [fromCityId, setFromCityId] = useState('');
  const [toCityValue, setToCityValue] = useState('');
  const [toCityId, setToCityId] = useState('');
  const [fromCityActive, setFromCityActive] = useState(false);
  const [toCityActive, setToCityActive] = useState(false);
  const [fromCityList, setFromCityList] = useState([]);
  const [toCityList, setToCityList] = useState([]);

  useEffect(() => {
    fromCityHandler(fromCityId);
    toCityHandler(toCityId);
  }, [fromCityId, toCityId]);

  useEffect(() => {
    if (fromCityValue === '' || toCityValue === '') {
      formErrorHendler('Заполните поля направления')
    }
    if (fromCityValue !== '' && toCityValue !== '') {
      formErrorHendler(null)
    }
  }, [fromCityValue, toCityValue]);

  async function fetchCityList(value) {
    try {
      const response = await fetch(`https://students.netoservices.ru/fe-diplom/routes/cities?name=${value}`);
      const data = await response.json();
      return data;
    } catch (error) {
      dispatch(setError(error));
    }
  }

  const onChangeFrom = async (e, direction) => {
    if (direction === "from") {
      setFromCityValue(e.target.value);
      let cityList = await fetchCityList(e.target.value);
      if (!cityList.error) {
        setFromCityList(cityList);
      }
    }
    if (direction === "to") {
      setToCityValue(e.target.value);
      let cityList = await fetchCityList(e.target.value);
      if (!cityList.error) {
        setToCityList(cityList);
      }
    }
  }

  const onClickCity = (city, direction) => {
    if (direction === "from") {
      setFromCityValue(city.name);
      setFromCityId(city._id);
    }
    if (direction === "to") {
      setToCityValue(city.name);
      setToCityId(city._id);
    }
  }

  const onInputBlur = async (direction) => {
    if (direction === "from") {
      let cityList = await fetchCityList(fromCityValue);
     if (cityList[0]) {
      setFromCityValue(cityList[0].name);
      setFromCityId(cityList[0]._id);
     } else {
      dispatch(setError('Город отправления не найден'));
      }
      setTimeout(() => {
        setFromCityActive(false);
      }, 100)
    }
    if (direction === "to") {
      let cityList = await fetchCityList(toCityValue);
     if (cityList[0]) {
      setToCityValue(cityList[0].name);
      setToCityId(cityList[0]._id);
     } else {
      dispatch(setError('Город прибытия не найден'));
      }
      setTimeout(() => {
        setToCityActive(false);
      }, 100)
    }
  }

  const onSwap = (event) => {
    event.preventDefault();
    setFromCityValue(toCityValue);
    setToCityValue(fromCityValue);
    setFromCityId(toCityId);
    setToCityId(fromCityId);
  };

  return (
    <React.Fragment>
      <div className='city-dropdown'>
        <input className="ticket-widget-input cdi" type = "text" placeholder='Откуда' value={fromCityValue} onChange={(e) => onChangeFrom(e, 'from')} onFocus={() => setFromCityActive(true)} onBlur={() => onInputBlur('from')}></input>
        <div className={fromCityActive ? 'city-dropdown-list cdl-active' : 'city-dropdown-list'}>{fromCityList.map((city) => <div key={city._id} className='city-dropdown-element' onClick={() => setTimeout(() => onClickCity(city, 'from') , 100)}>{city.name}</div>)}</div>
      </div>
      <button className="swap-btn" onClick={(e) => onSwap(e)}></button>
      <div className='city-dropdown'>
        <input className="ticket-widget-input cdi" type = "text" placeholder='Куда' value={toCityValue} onChange={(e) => onChangeFrom(e, 'to')} onFocus={() => setToCityActive(true)} onBlur={() => onInputBlur('to')}></input>
        <div className={toCityActive ? 'city-dropdown-list cdl-active' : 'city-dropdown-list'}>{toCityList.map((city) => <div key={city._id} className='city-dropdown-element' onClick={() => setTimeout(() => onClickCity(city, 'to') , 100)}>{city.name}</div>)}</div>
      </div> 
    </React.Fragment>   
  )
}

export default CityDropdown;