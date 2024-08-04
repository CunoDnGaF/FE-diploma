import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import PassengerCard from './PassengerCard/PassengerCard';
// import { isTotalSuccess } from '../../../redux/slice/passengersSlice';
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';

function PassengersPage() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkedNum, setCheckedNum] = useState(1);
  const [departureSeats, setDepartureSeats] = useState([]);
  const [arrivalSeats, setArrivalSeats] = useState([]);

  // const {departureSeatsState, arrivalSeatsState,  isTotalSuccessState} = useSelector(state => state.passengers);
  const {seatsState} = useSelector(state => state.seats);

  function setSeats(direction) {
    let departureSeats = [];
    let arrivalSeats = [];
    let departureSeatsFinal = [];
    let arrivalSeatsFinal = [];

    seatsState.forEach(wagon => {
      if(wagon.direction === 'departure') {
        wagon.checkedSeats.forEach(seat => {
          departureSeats.push({
            number: seat,
            coach_id: wagon.id,
          });
        })
      }
      if(wagon.direction === 'arrival') {
        wagon.checkedSeats.forEach(seat => {
          arrivalSeats.push({
            number: seat,
            coach_id: wagon.id,
          });
        })
      }
    });

    for (let i = 0; i < departureSeats.length; i++) {
      departureSeatsFinal.push({
        coach_id: departureSeats[i].coach_id,
        number: departureSeats[i].number,
        passengerNumber: i+1,
      });
    }

    for (let i = 0; i < arrivalSeats.length; i++) {
      arrivalSeatsFinal.push({
        coach_id: arrivalSeats[i].coach_id,
        number: arrivalSeats[i].number,
        passengerNumber: i+1,
      });
    }

    if (direction === 'departure') {
      return departureSeatsFinal;
    }
    if (direction === 'arrival') {
      return arrivalSeatsFinal;
    }
  }

  useEffect(() => {
    setDepartureSeats(setSeats('departure'));
    setArrivalSeats(setSeats('arrival'));
  }, [seatsState]);

  // useEffect(() => {
  //   dispatch(isTotalSuccess([departureSeatsState, arrivalSeatsState]));
  // }, [departureSeatsState, arrivalSeatsState]);

  function onNextButtonClick() {
    // if(isTotalSuccessState) {
    //   navigate('/payment');
    // }
      navigate('/payment');
  }

  return (
    <div className='passengers-page'>
      { departureSeats.length > 0
        ? 
        <div>
          <svg width="76" height="60" viewBox="0 0 76 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5 0C2.23877 0 0 2.23859 0 5V55C0 57.7614 2.23877 60 5 60H71C73.7612 60 76 57.7614 76 55V5C76 2.23859 73.7612 0 71 0H5ZM42.3628 32.8239V40C45.9434 36.6445 49.5586 33.2558 53 30.0664C49.5239 26.7774 45.9434 23.3887 42.3281 20V27.5747H23V32.8239H42.3628Z" fill="#FFA800"/>
          </svg>
          {departureSeats.map((seat) => <PassengerCard key={uuid()} coach_id={seat.coach_id} direction={'departure'} isCheckedHandle={setCheckedNum} isChecked={checkedNum === seat.passengerNumber ? true : false} seatNumber={seat.number} passengerNumber={seat.passengerNumber} isLastPassenger={seat.passengerNumber === departureSeats.length ? true : false}/>)}
          <div className="passengers-page-add-button" onClick={() => navigate(-1)}>
            <p>Добавить пассажира</p>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.94442 1.46381L7.94442 7.94493L1.46329 7.94493C0.860398 7.94493 0.408226 8.3971 0.408226 9C0.408226 9.6029 0.860398 10.0551 1.46329 10.0551L7.94442 10.0551L7.94442 16.5362C7.94442 17.1391 8.39659 17.5913 8.92412 17.5159L9.07485 17.5159C9.67774 17.5159 10.1299 17.0637 10.0546 16.5362L10.0546 10.0551L16.385 10.0551C16.9878 10.0551 17.44 9.6029 17.44 9C17.44 8.3971 16.9878 7.94493 16.385 7.94493L10.0546 7.94493L10.0546 1.46381C10.0546 0.860914 9.60238 0.408743 9.07485 0.484105L8.92412 0.484104C8.32123 0.484104 7.86906 0.936276 7.94442 1.46381Z" fill="#FFA800"/>
            </svg>
          </div>
        </div>
        : <></>
      }
      { arrivalSeats.length > 0
        ? 
        <div>
          <svg width="76" height="60" viewBox="0 0 76 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M71 0C73.7612 0 76 2.23859 76 5V55C76 57.7614 73.7612 60 71 60H5C2.23877 60 0 57.7614 0 55V5C0 2.23859 2.23877 0 5 0H71ZM33.6372 32.8239V40C30.0566 36.6445 26.4414 33.2558 23 30.0664C26.4761 26.7774 30.0566 23.3887 33.6719 20V27.5747H53V32.8239H33.6372Z" fill="#FFA800"/>
          </svg>
          {arrivalSeats.map((seat) => <PassengerCard key={uuid()} coach_id={seat.coach_id} direction={'arrival'} isCheckedHandle={setCheckedNum} isChecked={checkedNum === seat.passengerNumber ? true : false} seatNumber={seat.number} passengerNumber={seat.passengerNumber} isLastPassenger={seat.passengerNumber === departureSeats.length ? true : false} />)}
          <div className="passengers-page-add-button" onClick={() => navigate(-1)}>
            <p>Добавить пассажира</p>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.94442 1.46381L7.94442 7.94493L1.46329 7.94493C0.860398 7.94493 0.408226 8.3971 0.408226 9C0.408226 9.6029 0.860398 10.0551 1.46329 10.0551L7.94442 10.0551L7.94442 16.5362C7.94442 17.1391 8.39659 17.5913 8.92412 17.5159L9.07485 17.5159C9.67774 17.5159 10.1299 17.0637 10.0546 16.5362L10.0546 10.0551L16.385 10.0551C16.9878 10.0551 17.44 9.6029 17.44 9C17.44 8.3971 16.9878 7.94493 16.385 7.94493L10.0546 7.94493L10.0546 1.46381C10.0546 0.860914 9.60238 0.408743 9.07485 0.484105L8.92412 0.484104C8.32123 0.484104 7.86906 0.936276 7.94442 1.46381Z" fill="#FFA800"/>
            </svg>
          </div>
        </div>
        : <></>
      }
      {/* <div className={isTotalSuccessState ? 'passengers-page-next-button ppnb-atcive' : 'passengers-page-next-button'} onClick={() => onNextButtonClick()}>ДАЛЕЕ</div> */}
      <div className='passengers-page-next-button ppnb-atcive' onClick={() => onNextButtonClick()}>ДАЛЕЕ</div>
    </div>
  )
}

export default PassengersPage;