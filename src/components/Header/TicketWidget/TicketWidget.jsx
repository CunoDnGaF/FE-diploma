import { useState, useEffect } from 'react';
import Datepicker from '../../Datepicker/Datepicker';
import CityDropdown from './CityDropdown/CityDropdown';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { routesLoading } from '../../../redux/slice/routesSlice';
import { setLoading, setError } from '../../../redux/slice/appStateSlice';

function TicketWidget({location}) {

  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [formError, setFormError] = useState(null);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const navigate = useNavigate();

  let twClassName;
  let twcClassName;
  let twbClassName;

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

  const {
    sortingState,
    offsetState,
    pageCountState,
    loading,
    error,
  } = useSelector(state => state.routes);

  let have_first_class = '';
  let have_second_class = '';
  let have_third_class = '';
  let have_fourth_class = '';
  let have_wifi = '';
  let have_express = '';

  if(haveFirstClassState !== '') {
    have_first_class = `&have_first_class=${haveFirstClassState}`;
  }
  if(haveSecondClassState !== '') {
    have_second_class = `&have_second_class=${haveSecondClassState}`;
  }
  if(haveThirdClassState !== '') {
    have_third_class = `&have_third_class=${haveThirdClassState}`;
  }
  if(haveFourthClassState !== '') {
    have_fourth_class = `&have_fourth_class=${haveFourthClassState}`;
  }
  if(haveWifiState !== '') {
    have_wifi = `&have_wifi=${haveWifiState}`;
  }
  if(haveExpressState !== '') {
    have_express = `&have_express=${haveExpressState}`;
  }

  const dispatch = useDispatch();
  const path = `routes?from_city_id=${fromCity}&to_city_id=${toCity}&date_start=${dateStart}&date_end=${dateEnd}&date_end_arrival=${dateEndArrivalState}${have_first_class}${have_second_class}${have_third_class}${have_fourth_class}${have_wifi}${have_express}&price_from=${minPriceState}&price_to=${maxPriceState}&start_departure_hour_from=${startDepartureHourFromState}&start_departure_hour_to=${startDepartureHourToState}&start_arrival_hour_from=${startArrivalHourFromState}&start_arrival_hour_to=${startArrivalHourToState}&end_departure_hour_from=${endDepartureHourFromState}&end_departure_hour_to=${endDepartureHourToState}&end_arrival_hour_from=${endArrivalHourFromState}&end_arrival_hour_to=${endArrivalHourToState}&limit=${pageCountState}&offset=${offsetState}&sort=${sortingState}`

  useEffect(() => {
    dispatch(routesLoading(path))
  }, [
    fromCity,
    toCity,
    dateStart,
    dateEnd, 
    haveFirstClassState, 
    haveSecondClassState, 
    haveThirdClassState,
    haveFourthClassState, 
    haveWifiState, 
    haveExpressState, 
    minPriceState,
    maxPriceState, 
    startDepartureHourFromState, 
    startDepartureHourToState, 
    startArrivalHourFromState, 
    startArrivalHourToState, 
    endDepartureHourFromState, 
    endDepartureHourToState, 
    endArrivalHourFromState, 
    endArrivalHourToState,
    sortingState,
    offsetState,
    pageCountState,
    dateEndArrivalState,
  ])

  useEffect(() => {
    setDateStart(dateStartState);
  }, [dateStartState])

  useEffect(() => {
    dispatch(setLoading(loading));
    dispatch(setError(error));
  }, [loading, error]);

  const onClick = () => {
    if(formError) {
      dispatch(setError(formError));
    } else {
      dispatch(setLoading(loading));
      dispatch(setError(error));
      navigate('/tickets');
    } 
  };

  if(location == '/') {
    twClassName = 'ticket-widget twmain';
    twcClassName = '';
    twbClassName = 'ticket-widget-btn twbmain';
  } else {
    twClassName = 'ticket-widget';
    twcClassName = 'ticket-widget-container';
    twbClassName = 'ticket-widget-btn';
  }

  return (
    <div className={twClassName}>
      <div className={twcClassName}>
        <h2 className="ticket-widget-title">Направление</h2>
        <form className="ticket-widget-form">
          <CityDropdown formErrorHendler={setFormError} toCityHandler={setToCity} fromCityHandler={setFromCity}/>
        </form>
      </div>
      <div className={twcClassName}>
        <h2 className="ticket-widget-title">Дата</h2>
        <form className="ticket-widget-form">
          <Datepicker className={'ticket-widget-input'} dateHandler={setDateStart}/>
          <Datepicker className={'ticket-widget-input'} dateHandler={setDateEnd}/>
        </form>
      </div>
      <button className={twbClassName} onClick={() => onClick()}>НАЙТИ БИЛЕТЫ</button>
    </div>
  )
}

export default TicketWidget;