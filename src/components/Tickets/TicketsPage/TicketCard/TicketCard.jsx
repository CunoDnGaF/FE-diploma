import TicketSeat from './TicketSeat/TicketSeat';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setLoading, setError } from '../../../../redux/slice/appStateSlice';
import uuid from 'react-uuid';

function TicketCard({ticket, page}) {
  let seats = [];
  let options = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();


  async function fetchSeats(routeId) {
    const response = await fetch(`https://students.netoservices.ru/fe-diplom/routes/${routeId}/seats`);
    const data = await response.json();
    
    if(response.ok) {
      dispatch(setLoading(false));
      return data;
    } else {
      dispatch(setError(response.statusText));
    }
  }


  if (ticket.departure.have_wifi) options.push('./src/svg/wifi.svg');
  if (ticket.departure.is_express) options.push('./src/svg/express.svg');
  if (ticket.departure.have_air_conditioning) options.push('./src/svg/airIcon.svg');


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
  
    return `${hours} : ${minutes}`;
  }

  if (ticket.departure.available_seats_info.first) {
    seats.push({type: 'first', quantity: ticket.departure.available_seats_info.first, price: ticket.departure.price_info.first})
  }
  if (ticket.departure.available_seats_info.second) {
    seats.push({type: 'second', quantity: ticket.departure.available_seats_info.second, price: ticket.departure.price_info.second})
  }
  if (ticket.departure.available_seats_info.third) {
    seats.push({type: 'third', quantity: ticket.departure.available_seats_info.third, price: ticket.departure.price_info.third})
  }
  if (ticket.departure.available_seats_info.fourth) {
    seats.push({type: 'fourth', quantity: ticket.departure.available_seats_info.fourth, price: ticket.departure.price_info.fourth})
  }

  const onClick = async () => {
    dispatch(setLoading(true));
    let departureSeats = await fetchSeats(ticket.departure._id);
    let arrivalSeats = undefined;
    if (ticket.arrival) {
      arrivalSeats = await fetchSeats(ticket.arrival._id);
    }
    navigate('/tickets/choosing_seats', {state: {departureSeats: departureSeats, arrivalSeats: arrivalSeats, ticket: ticket}});
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <img src='./src/svg/train.svg'></img>
        <h2>{ticket.departure.train.name}</h2>
        <span className='ticket-direction'>
          {capitalizeFirstLetter(ticket.departure.from.city.name)} → <br></br >{capitalizeFirstLetter(ticket.departure.to.city.name)}
        </span>
      </div>
      <div className="ticket-body">
        { ticket.departure
          ?<div className="ticket-departure">
              <span>
                <h2>{getFormatedTime(ticket.departure.from.datetime)}</h2>
                <h3>{capitalizeFirstLetter(ticket.departure.from.city.name)}</h3>
                <p>{capitalizeFirstLetter(ticket.departure.from.railway_station_name)} вокзал</p>
              </span>
              <span>
                {toHoursAndMinutes(ticket.departure.duration)}<br></br>
                <img src='./src/svg/arrowR.svg'></img>
              </span>
              <span>
                <h2>{getFormatedTime(ticket.departure.to.datetime)}</h2>
                <h3>{capitalizeFirstLetter(ticket.departure.to.city.name)}</h3>
                <p>{capitalizeFirstLetter(ticket.departure.to.railway_station_name)} вокзал</p>
              </span>
            </div>
          : <></>
        }
        { ticket.arrival
          ?<div className="ticket-departure">
              <span>
                <h2>{getFormatedTime(ticket.arrival.from.datetime)}</h2>
                <h3>{capitalizeFirstLetter(ticket.arrival.from.city.name)}</h3>
                <p>{capitalizeFirstLetter(ticket.arrival.from.railway_station_name)} вокзал</p>
              </span>
              <span>
                {toHoursAndMinutes(ticket.arrival.duration)}<br></br>
                <img src='./src/svg/arrowL.svg'></img>
              </span>
              <span>
                <h2>{getFormatedTime(ticket.arrival.to.datetime)}</h2>
                <h3>{capitalizeFirstLetter(ticket.arrival.to.city.name)}</h3>
                <p>{capitalizeFirstLetter(ticket.arrival.to.railway_station_name)} вокзал</p>
              </span>
            </div>
          : <></>
        }
      </div>
      <div className="ticket-seats-list">
        {seats.map(seat => <TicketSeat key={uuid()} seat={seat}/>)}
        <div className="ticket-seats-footer">
          <div className='ticket-seats-options'>
            {options.map(img => <img key={img} src={img}></img>)}
          </div>
          { page === 'check'
            ? <div className='check-page-card-button' onClick={() => navigate('/tickets')}>Изменить</div>
            : <button className='ticket-seats-btn' onClick={() => onClick()}>Выбрать места</button>
          }
        </div>
      </div>
    </div>
  )
}

export default TicketCard;