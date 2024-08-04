import { useNavigate } from "react-router-dom";

function LastTicketsCard({ticket}) {
  let options = [];
  const navigate = useNavigate();

  async function fetchSeats(routeId) {
    try {
      const response = await fetch(`https://students.netoservices.ru/fe-diplom/routes/${routeId}/seats`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  if (ticket.departure.have_wifi) options.push('./src/svg/wifi.svg');
  if (ticket.departure.is_express) options.push('./src/svg/express.svg');
  if (ticket.departure.have_air_conditioning) options.push('./src/svg/airIcon.svg');

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const onClick = async () => {
    let departureSeats = await fetchSeats(ticket.departure._id);
    let arrivalSeats = undefined;
    if (ticket.arrival) {
      arrivalSeats = await fetchSeats(ticket.arrival._id);
    }
    navigate('/tickets/choosing_seats', {state: {departureSeats: departureSeats, arrivalSeats: arrivalSeats, ticket: ticket}});
  };
  
  return (
  <div className='last-tickets-card' onClick={() => onClick()}>
    <div className='last-tickets-card-header'>
      <span className='last-tickets-city'>
        <h3>{capitalizeFirstLetter(ticket.departure.from.city.name)}</h3>
        <p>{capitalizeFirstLetter(ticket.departure.from.railway_station_name)}<br></br>Вокзал</p>
      </span>
      <span className='last-tickets-city'>
        <h3>{capitalizeFirstLetter(ticket.departure.to.city.name)}</h3>
        <p>{capitalizeFirstLetter(ticket.departure.to.railway_station_name)}<br></br>Вокзал</p>
      </span>
    </div>
    <div className='last-tickets-card-footer'>
      <div className='last-tickets-options'>
        {options.map(img => <img key={img} src={img}></img>)}
      </div>
      <div className='last-tickets-price'>
      <span>
        от <b>{ticket.departure.min_price}</b>
      </span>
      <img src='./src/svg/rub.svg'></img>
      </div>
    </div>
  </div>
  )
}

export default LastTicketsCard;