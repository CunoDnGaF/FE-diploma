import { useState, useEffect } from 'react';
import uuid from 'react-uuid';

function WagonMap({type, number, seats, handleSeats, handleAdultSeats, handleChildSeats, checkedPassengerType, checkedSeatsState, childSeatsState, adultSeatsState}) {

  const seatsApi = seats;

  const [checkedSeats, setCheckedSeats] = useState(checkedSeatsState);
  const [adultSeats, setAdultSeats] = useState([]);
  const [childSeats, setChildSeats] = useState([]);

  useEffect(() => {
    setCheckedSeats(checkedSeatsState);
    setAdultSeats(adultSeatsState);
    setChildSeats(childSeatsState);
  }, [checkedSeatsState, adultSeatsState, childSeatsState])

  useEffect(() => {
    handleSeats(checkedSeats);
    handleAdultSeats(adultSeats);
    handleChildSeats(childSeats);
  }, [checkedSeats, childSeats, adultSeats])

  let onSeatClick = (seat) => {
    if (seat.available) {
      if (checkedSeats.includes(seat.index)) {
        setCheckedSeats(checkedSeats.filter(el => el !== seat.index));
        setAdultSeats(adultSeats.filter(el => el !== seat.index));
        setChildSeats(childSeats.filter(el => el !== seat.index));
      } else {
        setCheckedSeats((prevWagons) => [
          ...prevWagons,
          seat.index,
      ]);
        if(checkedPassengerType === 'adult'){
          setAdultSeats((prevWagons) => [
            ...prevWagons,
            seat.index,
        ]);
        }
        if(checkedPassengerType === 'child'){
          setChildSeats((prevWagons) => [
            ...prevWagons,
            seat.index,
        ]);
        }
      }
    }
  }

  if(type === 'second') {
    let seats = seatsApi;
  
    if (seats.length < 32) {
      for (let i = seats.length + 1; i < 33; i++) {
        seats.push({
          index: i,
          available: false,
        })
      }
    }

    let seatsSorted = function(seats) {
      let arrSorted = [];
      
      seats.forEach(elem => {
        if(elem.index%2==0)
          arrSorted.push(elem)
      })

      seats.forEach(elem => {
        if(elem.index%2!=0)
          arrSorted.push(elem)
      })
      
      return arrSorted;
    }

    return (
      <div className='wagon-map'>
        <img className='wagon-map-img' src='../src/img/coupeWagon.png'></img>
        <div className='wagon-map-number'>{number}</div>
        <div className='wagon-map-coupes'>
          {seatsSorted(seats).map((seat) => <div key={uuid()} className={seat.available  ? 'wagon-map-seat wms-aviable' : 'wagon-map-seat'}><div onClick={() => onSeatClick(seat)} className={checkedSeats.includes(seat.index) ? 'wms-active' : ''}>{seat.index}</div></div>)}
        </div>
      </div>
    )
  }

  if(type === 'third') {
    let Allseats = seatsApi;
    let coupeSeats = [];
    let sideSeats = [];
  
    if (Allseats.length < 48) {
      for (let i = Allseats.length + 1; i < 49; i++) {
        Allseats.push({
          index: i,
          available: false,
        })
      }
    }

    Allseats.forEach(elem => {
      if(elem.index < 33) {
        coupeSeats.push(elem)
      }
      if(elem.index > 32) {
        sideSeats.push(elem)
      }
    })

    let seatsSorted = function(coupeSeats) {
      let arrSorted = [];
      
      coupeSeats.forEach(elem => {
        if(elem.index%2==0)
          arrSorted.push(elem)
      })

      coupeSeats.forEach(elem => {
        if(elem.index%2!=0)
          arrSorted.push(elem)
      })
      
      return arrSorted;
    }

    return (
      <div className='wagon-map'>
        <img className='wagon-map-img' src='../src/img/plcWagon.png'></img>
        <div className='wagon-map-number'>{number}</div>
        <div className='wagon-map-coupes wmc-plc'>
          {seatsSorted(coupeSeats).map((seat) => <div key={uuid()} className={seat.available  ? 'wagon-map-seat wms-aviable' : 'wagon-map-seat'}><div onClick={() => onSeatClick(seat)} className={checkedSeats.includes(seat.index) ? 'wms-active' : ''}>{seat.index}</div></div>)}
        </div>
        <div className='wagon-map-side-seats'>
          {sideSeats.map((seat) => <div key={uuid()} className={seat.available  ? 'wagon-map-seat wms-plc wms-aviable' : 'wagon-map-seat wms-plc'}><div onClick={() => onSeatClick(seat)} className={checkedSeats.includes(seat.index) ? 'wms-active' : ''}>{seat.index}</div></div>)}
        </div>
      </div>
    )
  }

  if(type === 'first') {
    let seats = seatsApi;
  
    if (seats.length < 16) {
      for (let i = seats.length + 1; i < 17; i++) {
        seats.push({
          index: i,
          available: false,
        })
      }
    }

    return (
      <div className='wagon-map'>
        <img className='wagon-map-img' src='../src/img/coupeWagon.png'></img>
        <div className='wagon-map-number'>{number}</div>
        <div className='wagon-map-coupes'>
          {seats.map((seat) => <div key={uuid()} className={seat.available  ? 'wagon-map-seat wms-lux wms-aviable' : 'wagon-map-seat wms-lux'}><div onClick={() => onSeatClick(seat)} className={checkedSeats.includes(seat.index) ? 'wms-active' : ''}>{seat.index}</div></div>)}
        </div>
      </div>
    )
  }

  if(type === 'fourth') {
    let Allseats = seatsApi;
    let leftSeats = [];
    let rightSeats = [
      {
        index: '',
        available: false,
      },
    ];
  
    if (Allseats.length < 62) {
      for (let i = Allseats.length + 1; i < 63; i++) {
        Allseats.push({
          index: i,
          available: false,
        })
      }
    }

    Allseats.forEach(elem => {
      if(elem.index < 33) {
        leftSeats.push(elem)
      }
      if(elem.index > 32) {
        rightSeats.push(elem);
      }
    })

    let seatsSorted = function(seats) {
      let arrSorted = [];
      
      seats.forEach(elem => {
        if(elem.index%2==0 && elem.index != 62)
          arrSorted.push(elem)
      })

      if(seats === rightSeats) {
        arrSorted.push({
          index: '',
          available: false,
        })
      }

      seats.forEach(elem => {
        if(elem.index%2!=0 || elem.index == 62)
          arrSorted.push(elem)
      })
      
      return arrSorted;
    }

    return (
      <div className='wagon-map'>
        <img className='wagon-map-img' src='../src/img/plcWagon.png'></img>
        <div className='wagon-map-number'>{number}</div>
        <div className='wagon-map-patch'></div>
        <div className='wagon-map-sitting'>
          <div className='wagon-map-sitting-line'>{seatsSorted(leftSeats).map((seat) => <div key={uuid()} className={seat.available  ? 'wagon-map-seat-sitting wms-aviable' : 'wagon-map-seat-sitting'}><div onClick={() => onSeatClick(seat)} className={checkedSeats.includes(seat.index) ? 'wmss-active' : ''}>{seat.index}</div></div>)}</div>
          <div className='wagon-map-sitting-line'>{seatsSorted(rightSeats).map((seat) => <div key={uuid()} className={seat.index == '' ? 'wagon-map-seat-sitting wmss-patch' : seat.available  ? 'wagon-map-seat-sitting wms-aviable' : 'wagon-map-seat-sitting'}>{seat.index == '' ? <></> : <div onClick={() => onSeatClick(seat)} className={checkedSeats.includes(seat.index) ? 'wmss-active' : ''}>{seat.index}</div>}</div>)}</div>
        </div>
      </div>
    )
  }
}

export default WagonMap;