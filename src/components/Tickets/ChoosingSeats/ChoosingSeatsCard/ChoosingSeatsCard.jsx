import { useState } from 'react';
import Wagon from '../Wagon/Wagon';
import { useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux';
import uuid from 'react-uuid';

function ChoosingSeatsCard({allSeats, ticket, direction}) {

  const [checkedType, setCheckedType] = useState('');
  const [checkedWagons, setCheckedWagon] = useState([0]);
  const [checkedPassengerType, setCheckedPassengerType] = useState('adult');
  const [childWithoutSeatCount, setChildWithoutSeatCount] = useState(0);
  // const [adultSeatsCount, setAdultSeatsCount] = useState(0);
  // const [childSeatsCount, setChildSeatsCount] = useState(0);
  // const [allSeatsCount, setAllSeatsCount] = useState(0);
  const navigate = useNavigate();

  const adultSeatsCount = 10;
  const childSeatsCount = 10;
  const allSeatsCount = 10;

  // const {seatsState} = useSelector(state => state.seats);

  // useEffect(() => {
  //   let adultCount = 0;
  //   let childCount = 0;
  //   let allSeatsCount = 0;
  //   seatsState.forEach((wagon) => {
  //     if(wagon.direction === direction) {
  //       adultCount = adultCount + wagon.adultSeats.length;
  //       childCount = childCount + wagon.childSeats.length;
  //     }
  //   })
  //   allSeats.forEach((seat) => {
  //     allSeatsCount = allSeatsCount + seat.coach.available_seats;
  //   })
  //   setAdultSeatsCount(adultCount);
  //   setChildSeatsCount(childCount);
  //   setAllSeatsCount(allSeatsCount-adultCount-childCount);
  // }, [seatsState]);

  const handleAddWagons = (wagon) => {
    if (checkedWagons.includes(wagon)) {
      setCheckedWagon(checkedWagons.filter(el => el !== wagon));
    } else {
      setCheckedWagon((prevWagons) => [
        ...prevWagons,
        wagon,
    ]);
    }
  };

  const handleTypeChange = (type) => {
    setCheckedType(type);
    let coaches = [];
    allSeats.forEach(seat => {
      if (seat.coach.class_type === type) {
        coaches.push(allSeats.indexOf(seat));
      }
    });
    setCheckedWagon([coaches[0]]);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getFormatedTime(date) {
    return new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  function toHoursAndMinutes(seconds) {
    const totalMinutes = Math.floor(seconds / 60);
  
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return {hours: hours, minutes: minutes};
  }

  return (
      <div className={direction === 'arrival' ? 'choosing-seats cs-arrival' : 'choosing-seats'}>
        <div className='choosing-seats-header'>
          <div><img src={direction === 'arrival' ? '../src/svg/arrowL_white.svg' : '../src/svg/arrowR_white.svg'}></img></div>
          <button onClick={() => navigate(-1)}>Выбрать другой поезд</button>
        </div>
        { direction === 'departure'
            ?<div className='choosing-seats-info'>
              <div className='choosing-seats-info-train'>
                <img src='../src/svg/train_orange.svg'></img>
                <div>
                <h2>{ticket.departure.train.name}</h2>
                  <span className='ticket-direction'>
                  {capitalizeFirstLetter(ticket.departure.from.city.name)} → <br></br >{capitalizeFirstLetter(ticket.departure.to.city.name)}
                  </span>
                </div>
              </div>
              <div className='choosing-seats-info-departure'>
                <span>
                  <h2>{getFormatedTime(ticket.departure.from.datetime)}</h2>
                  <h3>{capitalizeFirstLetter(ticket.departure.from.city.name)}</h3>
                  <p>{capitalizeFirstLetter(ticket.departure.from.railway_station_name)} вокзал</p>
                </span>
                <img src='../src/svg/arrowR.svg'></img>
                <span>
                  <h2>{getFormatedTime(ticket.departure.to.datetime)}</h2>
                  <h3>{capitalizeFirstLetter(ticket.departure.to.city.name)}</h3>
                  <p>{capitalizeFirstLetter(ticket.departure.to.railway_station_name)} вокзал</p>
                </span>
              </div>
              <div className='choosing-seats-info-duration'>
                <img src='../src/svg/clock.svg'></img>
                <span>{toHoursAndMinutes(ticket.departure.duration).hours} часов<br></br>{toHoursAndMinutes(ticket.departure.duration).minutes} минуты</span>
              </div>
            </div>
          : <></>
        }
        { direction === 'arrival'
            ?<div className='choosing-seats-info'>
              <div className='choosing-seats-info-train'>
                <img src='../src/svg/train_orange.svg'></img>
                <div>
                <h2>{ticket.arrival.train.name}</h2>
                  <span className='ticket-direction'>
                  {capitalizeFirstLetter(ticket.arrival.from.city.name)} → <br></br >{capitalizeFirstLetter(ticket.arrival.to.city.name)}
                  </span>
                </div>
              </div>
              <div className='choosing-seats-info-departure'>
                <span>
                  <h2>{getFormatedTime(ticket.arrival.to.datetime)}</h2>
                  <h3>{capitalizeFirstLetter(ticket.arrival.to.city.name)}</h3>
                  <p>{capitalizeFirstLetter(ticket.arrival.to.railway_station_name)} вокзал</p>
                </span>
                <img src='../src/svg/arrowL.svg'></img>
                <span>
                  <h2>{getFormatedTime(ticket.arrival.from.datetime)}</h2>
                  <h3>{capitalizeFirstLetter(ticket.arrival.from.city.name)}</h3>
                  <p>{capitalizeFirstLetter(ticket.arrival.from.railway_station_name)} вокзал</p>
                </span>
              </div>
              <div className='choosing-seats-info-duration'>
                <img src='../src/svg/clock.svg'></img>
                <span>{toHoursAndMinutes(ticket.arrival.duration).hours} часов<br></br>{toHoursAndMinutes(ticket.arrival.duration).minutes} минуты</span>
              </div>
            </div>
          : <></>
        }
        <h2 className='choosing-seats-title'>Количество билетов</h2>
        <div className='choosing-seats-passangers'>
          <div className={checkedPassengerType === 'adult' ? 'passenger-type-body pt-active' : 'passenger-type-body'} onClick={() => setCheckedPassengerType('adult')}>
            <div className='passenger-type-display'>Взрослых — {adultSeatsCount}</div>
            <p>Можно добавить еще<br></br>{allSeatsCount} пассажиров </p>
          </div>
          <div className={checkedPassengerType === 'child' ? 'passenger-type-body pt-active' : 'passenger-type-body'} onClick={() => setCheckedPassengerType('child')}>
            <div className='passenger-type-display'>Детских — {childSeatsCount}</div>
            <p>Можно добавить еще {allSeatsCount} детей до 10 лет.Свое место в вагоне, как у взрослых, но дешевлев среднем на 50-65% </p>
          </div>
          <div className={checkedPassengerType === 'childWithoutSeat' ? 'passenger-type-body pt-active' : 'passenger-type-body'} onClick={() => setCheckedPassengerType('childWithoutSeat')}>
            <div className='passenger-type-display'>Детских «без места» — {childWithoutSeatCount}</div>
            <div className={checkedPassengerType === 'childWithoutSeat' ? 'child-without-seat-buttons cwsb-active' : 'child-without-seat-buttons'}>
              <button onClick={() => childWithoutSeatCount > 0 ? setChildWithoutSeatCount(childWithoutSeatCount-1) : setChildWithoutSeatCount(childWithoutSeatCount)}>-</button>
              <button onClick={() => setChildWithoutSeatCount(childWithoutSeatCount+1)}>+</button>
            </div>
          </div>
        </div>
        <div className='choosing-seats-divider'></div>
        <h2 className='choosing-seats-title'>Тип вагона</h2>
        <div className='choosing-seats-types'>
          <div onClick={() => handleTypeChange('fourth')} className={checkedType === 'fourth' ? 'choosing-seats-type cst-checked' : 'choosing-seats-type'}>
          <svg viewBox="0 0 14 23" fill="none" xmlns="http://www.w3.org/2000/svg" className={checkedType === 'fourth' ? 'cst-checked' : ''}>
            <path d="M0 8.75326C0.141674 8.57335 0.25759 8.35002 0.437903 8.21975C1.03036 7.7979 1.79669 8.08947 1.97056 8.80288C2.12512 9.44806 2.25391 10.0994 2.38914 10.7508C2.62741 11.8737 2.85925 13.0027 3.10396 14.1256C3.42594 15.5834 4.41122 16.3527 5.9632 16.3589C7.07084 16.3651 8.17203 16.3527 9.27967 16.3651C9.93008 16.3713 10.2971 16.6566 10.4002 17.2025C10.5032 17.7919 10.0846 18.3378 9.46642 18.344C8.03036 18.3564 6.5943 18.3936 5.15823 18.3316C3.39374 18.2572 1.75161 16.8551 1.29439 15.0809C0.99816 13.9208 0.779209 12.7422 0.521619 11.5759C0.354186 10.8004 0.173873 10.0312 0 9.25575C0 9.08825 0 8.92075 0 8.75326Z"/>
            <path d="M4.53991 0C5.04865 0.105461 5.51875 0.266754 5.92445 0.601748C6.76806 1.29655 7.02565 2.56829 6.49759 3.51123C5.92445 4.54103 4.72022 5.04972 3.61902 4.73334C2.52427 4.41696 1.86741 3.65392 1.7837 2.50625C1.7193 1.62534 2.20872 0.694802 3.2262 0.235737C3.45803 0.130275 3.71562 0.0806467 3.96677 0C4.15352 0 4.34671 0 4.53991 0Z"/>
            <path d="M11.3469 15.875C11.1924 15.875 11.0829 15.875 10.9799 15.875C9.33128 15.875 7.68271 15.8812 6.02769 15.875C4.7655 15.8688 3.91546 15.1988 3.67075 14.0077C3.24572 11.9853 2.82714 9.96296 2.40212 7.94058C1.97065 5.8872 3.88326 4.89462 5.25492 5.32267C6.13073 5.59563 6.58151 6.22839 6.76182 7.05347C7.12245 8.70983 7.46375 10.3662 7.79862 12.0225C7.85658 12.3203 7.95317 12.432 8.28804 12.4258C9.62751 12.4134 10.967 12.4134 12.3064 12.4568C13.2144 12.4816 13.9164 13.1888 13.9808 14.0635C13.9937 14.2124 14.0001 14.3613 14.0001 14.5102C14.0001 16.8117 14.0001 19.1071 14.0001 21.4086C14.0001 21.6133 14.0001 21.8242 13.955 22.0227C13.8133 22.6493 13.2466 23.0401 12.5833 22.9967C11.9329 22.9533 11.4242 22.4756 11.3598 21.8428C11.3469 21.6939 11.3469 21.5451 11.3469 21.3962C11.3469 19.6778 11.3469 17.9532 11.3469 16.2348C11.3469 16.1293 11.3469 16.0177 11.3469 15.875Z"/>
          </svg>
            <p>Сидячий</p>
          </div>
          <div onClick={() => handleTypeChange('third')} className={checkedType === 'third' ? 'choosing-seats-type cst-checked' : 'choosing-seats-type'}>
          <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className={checkedType === 'third' ? 'cst-checked' : ''}>
            <path fillRule="evenodd" clipRule="evenodd" d="M15.4651 0H1.53491C0.690674 0 0 0.689941 0 1.53326V15.4667C0 16.3101 0.690674 17 1.53491 17H6H7H15.4651C16.3093 17 17 16.3101 17 15.4667V1.53326C17 0.689941 16.3093 0 15.4651 0ZM7 16.0417H11.9536C12.3757 16.0417 12.7212 15.6967 12.7212 15.2751H12.7021V13.8951C12.7021 13.4735 12.3567 13.1285 11.9346 13.1285H7V16.0417ZM6 13.1285H5.04639C4.62427 13.1285 4.27881 13.4735 4.27881 13.8951V15.2751C4.27881 15.6967 4.62427 16.0417 5.04639 16.0417H6V13.1285ZM2.24487 9.88953C1.9187 9.88953 1.65015 9.62122 1.65015 9.29535V4H4.56665V9.29535C4.56665 9.62122 4.29785 9.88953 3.97168 9.88953H2.24487ZM1.65015 2.06989V3H4.56665V2.06989C4.56665 1.74408 4.29785 1.47577 3.97168 1.47577H2.24487C1.9187 1.47577 1.65015 1.74408 1.65015 2.06989ZM12.2415 9.27618V4H15.1772V9.27618C15.1772 9.62122 14.8894 9.90869 14.5439 9.90869H12.8748C12.5293 9.90869 12.2415 9.62122 12.2415 9.27618ZM12.2415 3H15.1772V2.08905C15.1772 1.74408 14.8894 1.4566 14.5439 1.4566H12.8748C12.5293 1.4566 12.2415 1.74408 12.2415 2.08905V3Z"/>
          </svg>
            <p>Плацкарт</p>
          </div>
          <div onClick={() => handleTypeChange('second')} className={checkedType === 'second' ? 'choosing-seats-type cst-checked' : 'choosing-seats-type'}>
          <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className={checkedType === 'second' ? 'cst-checked' : ''}>
            <path fillRule="evenodd" clipRule="evenodd" d="M1.53491 0H15.4651C16.3093 0 17 0.695465 17 1.54544V15.4546C17 16.3045 16.3093 17 15.4651 17H1.53491C0.690674 17 0 16.3045 0 15.4546V1.54544C0 0.695465 0.690674 0 1.53491 0ZM13.1243 2.125C12.7021 2.125 12.3567 2.47272 12.3567 2.89774V4H15.2922V2.89774C15.2922 2.47272 14.947 2.125 14.5249 2.125H13.1243ZM15.2922 5H12.3567V10.0454C12.3567 10.4705 12.7021 10.8182 13.1243 10.8182H14.5249C14.947 10.8182 15.2922 10.4705 15.2922 10.0454V5ZM4.54736 4V2.97501C4.54736 2.51135 4.16357 2.125 3.70312 2.125H2.45605C1.99561 2.125 1.61182 2.51135 1.61182 2.97501V4H4.54736ZM1.61182 5H4.54736V9.98749C4.54736 10.4511 4.16357 10.8375 3.70312 10.8375H2.45605C1.99561 10.8375 1.61182 10.4511 1.61182 9.98749V5ZM15.2349 16.7296C16.0405 16.7296 16.7122 16.0727 16.7122 15.242V12.4796H0.287842V15.242C0.287842 16.0534 0.940186 16.7296 1.76514 16.7296H15.2349Z"/>
          </svg>
            <p>Купе</p>
          </div>
          <div onClick={() => handleTypeChange('first')} className={checkedType === 'first' ? 'choosing-seats-type cst-checked' : 'choosing-seats-type'}>
            <svg viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={checkedType === 'first' ? 'cst-checked' : ''}>
              <path d="M11 0L13.5857 7.63103H22L15.2072 12.369L17.7928 20L11 15.304L4.20717 20L6.79283 12.369L0 7.63103H8.41434L11 0Z"/>
            </svg>
            <p>Люкс</p>
          </div>
        </div>
        <div className={checkedType === '' ? 'choosing-wagons' : 'choosing-wagons cw-active'}>
          <span>Вагоны</span>
          {allSeats.map((seat) => {
            if(seat.coach.class_type === checkedType) {
             return <b key={uuid()} className={checkedWagons.includes(allSeats.indexOf(seat)) ? 'cwb-active' : ''} onClick={() => handleAddWagons(allSeats.indexOf(seat))}>{allSeats.indexOf(seat)+1}</b>
            }
          })}
          <span>Нумерация вагонов начинается с головы поезда</span>
        </div>
        {
          allSeats.map((seat) => {
            if(seat.coach.class_type === checkedType) {
              return <Wagon key={uuid()} childWithoutSeatCount={childWithoutSeatCount} checkedPassengerType={checkedPassengerType} ticket={ticket} direction={direction} type={checkedType} number={allSeats.indexOf(seat)+1} seats={seat.seats} wagon={seat.coach} active={checkedWagons.includes(allSeats.indexOf(seat)) ? 'active' : 'unactive'}></Wagon>
            }
          })
        }
      </div>
  )
}

export default ChoosingSeatsCard;