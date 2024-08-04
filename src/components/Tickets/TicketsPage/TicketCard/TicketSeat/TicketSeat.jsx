// import { useState } from 'react';

function TicketSeat({seat}) {

  // const [moduleClassName, setModuleClassName] = useState('ticket-seat-price-options');
  
  let type = '';
  const sortedPrice = Object.fromEntries(Object.entries(seat.price).sort((a, b) => a[1] - b[1]));
  const minPrice = (sortedPrice, index = 0) => Object.values(sortedPrice)[index];

  if (seat.type === 'first') {
    type = 'Люкс'
  }
  if (seat.type === 'second') {
    type = 'Купе'
  }
  if (seat.type === 'third') {
    type = 'Плацкарт'
  }
  if (seat.type === 'fourth') {
    type = 'Сидячий'
  }

  // onMouseEnter={() => setModuleClassName('ticket-seat-price-options tspo-active')}  onMouseLeave={() => setModuleClassName('ticket-seat-price-options')}

  return (
    <div className='ticket-seat'>
      <span className='ticket-seat-type'>{type}</span>
      <span className='ticket-seat-quantity'>{seat.quantity}</span>
      <span className='ticket-seat-price'>
        от <b>{minPrice(sortedPrice)}</b>
        {/* {option 
          ? 
          <div className={moduleClassName}>
            <div></div>
            {option.map(option => 
              <div className='ticket-seat-price-option'>
                <span className='ticket-seat-type'>{option.type}</span>
                <span className='ticket-seat-quantity'>{option.quantity}</span>
                <span className='ticket-seat-price'><b>{option.price}</b><img src='./src/svg/rub.svg'></img></span>
              </div>
            )}
          </div>
          : <></>}  */}
        <img src='./src/svg/rub.svg'></img>
      </span>
    </div>
  )
}

export default TicketSeat;