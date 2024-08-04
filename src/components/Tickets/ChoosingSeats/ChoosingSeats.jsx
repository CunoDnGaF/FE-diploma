import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux'
import ChoosingSeatsCard from './ChoosingSeatsCard/ChoosingSeatsCard';

function ChoosingSeats() {
  const navigate = useNavigate();
  const {state} = useLocation();
  // const {seatsState} = useSelector(state => state.seats);

  const {departureSeats, arrivalSeats, ticket} = state;

  function onClick() {
    // if (seatsState.length > 0) {
    //   navigate('/passengers');
    // }
    navigate('/passengers');
  }

  return (
    <div className='choosing-seats-page'>
      <h1>ВЫБОР МЕСТ</h1>
      {departureSeats
      ? <ChoosingSeatsCard allSeats={departureSeats} ticket={ticket} direction={'departure'}/>
      : <></>
      }
      {arrivalSeats
      ? <ChoosingSeatsCard allSeats={arrivalSeats} ticket={ticket} direction={'arrival'}/>
      : <></>
      }
      {/* <div onClick={() => onClick()} className={seatsState.length === 0 ? 'choosing-seats-button' : 'choosing-seats-button csb-active'}>ДАЛЕE</div> */}
      <div onClick={() => onClick()} className='choosing-seats-button csb-active'>ДАЛЕE</div>
    </div>
  )
}

export default ChoosingSeats;