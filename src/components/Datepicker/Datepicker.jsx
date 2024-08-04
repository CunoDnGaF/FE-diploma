import Calendar from 'react-calendar';
import { useState } from 'react';
import './Calendar.css';

function Datepicker({className, dateHandler}) {
  const [startDate, setStartDate] = useState(new Date());
  const [dateValue, setDateValue] = useState('ДД/ММ/ГГ');
  const [isActive, setIsActive] = useState(false);
  let calendarClassName = '';
  let arrowClassName = 'colendar-arrow';

  const onDateClick = (event) => {
    event.preventDefault()
    setIsActive(!isActive);
  }

  const onDateChange = (e) => {
    setStartDate(e);
    setDateValue(e.toLocaleDateString());
    dateHandler(e.toLocaleDateString('en-CA'));
    setIsActive(false);
  }

  if(className === 'side-menu-date') {
    calendarClassName = 'calendar-side-menu';
    arrowClassName = 'colendar-arrow arrow-side-menu';
  }

  return (
    <div className={dateValue === 'ДД/ММ/ГГ' ? `${className} twi-unactive` : className}>
      {dateValue}
      <Calendar className={isActive ? `${calendarClassName} active` : calendarClassName} 
        onChange={(e) => onDateChange(e)} 
        value={startDate} 
        nextLabel='▸'
        prevLabel='◂'
        navigationLabel={({ date }) => date.toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() + date.toLocaleString('default', { month: 'long' }).slice(1)}
      />
      <div className={isActive ? `${arrowClassName} active` : arrowClassName}></div>
      <button className='calendar-button' onClick={(event) => onDateClick(event)}></button>
    </div>
  )
}

export default Datepicker;