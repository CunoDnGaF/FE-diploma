import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

function SideInfo() {
  const {seatsState, ticketState} = useSelector(state => state.seats);
  const {dateStartState, dateEndArrivalState} = useSelector(state => state.sideMenu);

  const [directionInChecked, setDirectionInChecked] = useState(false);
  const [directionOutChecked, setDirectionOutChecked] = useState(false);
  const [passengersChecked, setPassengersChecked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [adultPrice, setAdultPrice] = useState(0);
  const [childPrice, setChildPrice] = useState(0);
  const [childSeats, setChildSeats] = useState(0);
  const [adultSeats, setAdultSeats] = useState(0);

  function setPriceData() {
    let totalPrice = 0;
    let adultPrice = 0;
    let childPrice = 0;
    let childSeats = 0;
    let adultSeats = 0;

    seatsState.forEach(seat => {
      totalPrice = totalPrice + seat.totalPrice;
      adultPrice = adultPrice + seat.adultPrice;
      childPrice = childPrice + (seat.totalPrice - seat.adultPrice);
      childSeats = childSeats + seat.childSeats.length;
      adultSeats = adultSeats + seat.adultSeats.length;
    });
    setTotalPrice(totalPrice.toLocaleString());
    setAdultPrice(adultPrice.toLocaleString());
    setChildPrice(childPrice.toLocaleString());
    setChildSeats(childSeats);
    setAdultSeats(adultSeats);
  }

  useEffect(() => {
    setPriceData();
  }, [seatsState]);

  function chengeCheckbox(index) {
    if(index === 0) {
      setDirectionInChecked(!directionInChecked);
    }
    if(index === 1) {
      setDirectionOutChecked(!directionOutChecked);
    }
    if(index === 2) {
      setPassengersChecked(!passengersChecked);
    }
  }

  function getFormatedTime(date) {
    return new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function toHoursAndMinutes(seconds) {
    const totalMinutes = Math.floor(seconds / 60);
  
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return `${hours} : ${minutes}`;
  }

  return (
    <div className='side-info'>
      <h2 className='side-info-header'>ДЕТАЛИ ПОЕЗДКИ</h2>
      <div className='side-menu-divider'></div>
      { ticketState.departure
        ? <div className='side-menu-details'>
            <div className='side-menu-details-header'>
              <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5 0C2.23828 0 0 2.23859 0 5V21C0 23.7614 2.23828 26 5 26H27C29.7617 26 32 23.7614 32 21V5C32 2.23859 29.7617 0 27 0H5ZM17.8369 14.2237V17.3333C19.3447 15.8793 20.8672 14.4108 22.3164 13.0288L20.5342 11.2945C19.6396 10.4247 18.7334 9.54568 17.8223 8.66666V11.949H9.68457V14.2237H17.8369Z" fill="#FFA800"/>
              </svg>
              <h2 className='side-menu-details-title'>Туда</h2>
              <span>{dateStartState.split('-').reverse().join('.')}</span>
              <label className="side-menu-details-toggle">
                <input type="checkbox" checked={directionInChecked} onChange={() => chengeCheckbox(0)}></input>
                <span></span>
              </label>
            </div>
            <div className={directionInChecked ? 'side-menu-details-body smdb-active' : 'side-menu-details-body'}>
              <div>
                <span>№ Поезда</span>
                <span><b>{ticketState.departure.train.name}</b></span>
              </div>
              <div>
                <span>Название</span>
                <span className='side-menu-details-name'>{capitalizeFirstLetter(ticketState.departure.from.city.name)}<br></br>{capitalizeFirstLetter(ticketState.departure.to.city.name)}</span>
              </div>
              <div>
                <span><b>{getFormatedTime(ticketState.departure.from.datetime)}</b><br></br><p>{dateStartState.split('-').reverse().join('.')}</p></span>
                <span>{toHoursAndMinutes(ticketState.departure.duration)}<br></br>
                <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.3627 20C19.3627 17.8073 19.3627 15.3821 19.3627 12.8239C12.8621 12.8239 6.46582 12.8239 0 12.8239C0 11.0299 0 9.36877 0 7.57475C6.32677 7.57475 12.7231 7.57475 19.3279 7.57475C19.3279 4.91694 19.3279 2.42525 19.3279 0C22.9432 3.3887 26.5238 6.77741 30 10.0664C26.5585 13.2558 22.9432 16.6445 19.3627 20Z" fill="#FFA800"/>
                </svg>
                </span>
                <span><b>{getFormatedTime(ticketState.departure.to.datetime)}</b><br></br><p>{dateStartState.split('-').reverse().join('.')}</p></span>
              </div>
              <div>
                <span className='side-menu-details-city'>{capitalizeFirstLetter(ticketState.departure.from.city.name)}<br></br><p>{capitalizeFirstLetter(ticketState.departure.from.railway_station_name)}<br></br>вокзал</p></span>
                <span>{capitalizeFirstLetter(ticketState.departure.to.city.name)}<br></br><p>{capitalizeFirstLetter(ticketState.departure.to.railway_station_name)}<br></br>вокзал</p></span>
              </div>
            </div>
          </div>
        : <></>
      }
      <div className='side-menu-divider'></div>
      { ticketState.arrival
        ? <div className='side-menu-details'>
            <div className='side-menu-details-header'>
            <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M27 0C29.7617 0 32 2.23859 32 5V21C32 23.7614 29.7617 26 27 26H5C2.23828 26 0 23.7614 0 21V5C0 2.23859 2.23828 0 5 0H27ZM14.1631 14.2237V17.3333L14.084 17.2577C12.6025 15.8284 11.1074 14.3869 9.68359 13.0288L9.8125 12.9044C11.2354 11.5182 12.6992 10.0924 14.1777 8.66666V11.949H22.3154V14.2237H14.1631Z" fill="#FFA800"/>
            </svg>
              <h2 className='side-menu-details-title'>Обратно</h2>
              <span>{dateEndArrivalState.split('-').reverse().join('.')}</span>
              <label className="side-menu-details-toggle">
                <input type="checkbox" checked={directionOutChecked} onChange={() => chengeCheckbox(1)}></input>
                <span></span>
              </label>
            </div>
            <div className={directionOutChecked ? 'side-menu-details-body smdb-active' : 'side-menu-details-body'}>
              <div>
                <span>№ Поезда</span>
                <span><b>{ticketState.arrival.train.name}</b></span>
              </div>
              <div>
                <span>Название</span>
                <span className='side-menu-details-name'>{capitalizeFirstLetter(ticketState.arrival.from.city.name)}<br></br>{capitalizeFirstLetter(ticketState.arrival.to.city.name)}</span>
              </div>
              <div>
                <span><b>{getFormatedTime(ticketState.arrival.from.datetime)}</b><br></br><p>{dateEndArrivalState.split('-').reverse().join('.')}</p></span>
                <span>{toHoursAndMinutes(ticketState.arrival.duration)}<br></br>
                  <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6373 20C10.6373 17.8073 10.6373 15.3821 10.6373 12.8239C17.1379 12.8239 23.5342 12.8239 30 12.8239C30 11.0299 30 9.36877 30 7.57475C23.6732 7.57475 17.2769 7.57475 10.6721 7.57475C10.6721 4.91694 10.6721 2.42525 10.6721 0C7.05678 3.3887 3.47625 6.77741 1.90735e-06 10.0664C3.44148 13.2558 7.05678 16.6445 10.6373 20Z" fill="#FFA800"/>
                  </svg>
                </span>
                <span><b>{getFormatedTime(ticketState.arrival.to.datetime)}</b><br></br><p>{dateEndArrivalState.split('-').reverse().join('.')}</p></span>
              </div>
              <div>
                <span className='side-menu-details-city'>{capitalizeFirstLetter(ticketState.arrival.from.city.name)}<br></br><p>{capitalizeFirstLetter(ticketState.arrival.from.railway_station_name)}<br></br>вокзал</p></span>
                <span>{capitalizeFirstLetter(ticketState.arrival.to.city.name)}<br></br><p>{capitalizeFirstLetter(ticketState.arrival.to.railway_station_name)}<br></br>вокзал</p></span>
              </div>
            </div>
          </div>
        : <></>
      }
      <div className='side-menu-divider'></div>
      <div className='side-menu-details'>
        <div className='side-menu-details-header'>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.9721 26C17.2752 26 8.72031 26 0.165369 26C-0.219806 21.9313 -0.260351 20.3648 3.83467 18.4118C9.91638 15.5229 16.0792 15.5839 22.2014 18.4118C22.9921 18.7779 23.7219 19.2865 24.4111 19.8358C25.5058 20.7106 26.0735 21.8499 25.9924 23.2943C25.9518 24.1487 25.9721 25.0235 25.9721 26Z" fill="#FFA800"/>
          <path d="M19.4841 6.44946C19.5044 10.0503 16.6054 13.0002 13.0172 13.0206C9.42899 13.0206 6.50977 10.091 6.50977 6.51049C6.50977 2.9503 9.38844 0.0411096 12.9158 0.00042166C16.5243 -0.0402663 19.4638 2.86892 19.4841 6.44946Z" fill="#FFA800"/>
        </svg>
          <h2 className='side-menu-details-title'>Пассажиры</h2>
          <label className="side-menu-details-toggle">
            <input type="checkbox" checked={passengersChecked} onChange={() => chengeCheckbox(2)}></input>
            <span></span>
          </label>
        </div>
        <div className={passengersChecked ? 'side-menu-details-body smdb-active' : 'side-menu-details-body'}>
          {  adultSeats != 0 
           ? <div>
                <span>{adultSeats} {adultSeats > 1 ? 'Взрослых' : 'Взрослый'}</span>
                <span>
                  <b>{adultPrice} 
                    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.50039 10.2043C3.50039 10.7755 3.50039 11.3354 3.50039 11.9021C4.95655 11.9021 6.40805 11.9021 7.86655 11.9021C7.86655 12.471 7.86655 13.0332 7.86655 13.6044C6.41272 13.6044 4.95889 13.6044 3.50039 13.6044C3.50039 14.7401 3.50039 15.8666 3.50039 17C2.91466 17 2.33593 17 1.74786 17C1.74786 15.8712 1.74786 14.7423 1.74786 13.6089C1.16213 13.6089 0.585732 13.6089 0.00233359 13.6089C0.00233359 13.04 0.00233359 12.4778 0.00233359 11.9066C0.581065 11.9066 1.1598 11.9066 1.74086 11.9066C1.74086 11.3377 1.74086 10.7778 1.74086 10.2088C1.16213 10.2088 0.583399 10.2088 0 10.2088C0 9.6376 0 9.07545 0 8.50649C0.578731 8.50649 1.15746 8.50649 1.7432 8.50649C1.7432 5.67079 1.7432 2.84189 1.7432 0.00845521C1.7782 0.00618846 1.80154 0.00392171 1.8272 0.00392171C4.1608 0.00392171 6.49439 -0.00741203 8.82799 0.00845521C10.1745 0.0175222 11.3459 0.495806 12.3307 1.3889C13.1568 2.13693 13.6889 3.0527 13.8989 4.13167C14.1906 5.63452 13.8499 7.00591 12.8931 8.22088C12.2374 9.05505 11.3809 9.6308 10.3542 9.95948C9.85244 10.1204 9.33671 10.2043 8.80932 10.2043C7.07546 10.2066 5.34393 10.2043 3.61007 10.2066C3.57507 10.2043 3.54006 10.2043 3.50039 10.2043ZM3.50273 1.70398C3.50273 3.97753 3.50273 6.23975 3.50273 8.50423C3.52839 8.50423 3.5494 8.50423 3.5704 8.50423C5.3206 8.50423 7.07079 8.50876 8.82099 8.49969C9.09168 8.49743 9.36938 8.45889 9.63074 8.39316C11.4813 7.91714 12.5804 6.14908 12.1604 4.34248C11.801 2.80109 10.3868 1.70398 8.75798 1.70398C7.04279 1.70398 5.3276 1.70398 3.6124 1.70398C3.5774 1.70398 3.5424 1.70398 3.50273 1.70398Z" fill="#928F94"/>
                    </svg>
                  </b>
                </span>
              </div>
            : <></>
          }
          { childSeats != 0
            ? <div>
                <span>{childSeats} {childSeats === 1 ? 'Ребенок' : childSeats < 5 ? 'Ребенка' : 'Детей'}</span>
                <span>
                  <b>{childPrice} 
                    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.50039 10.2043C3.50039 10.7755 3.50039 11.3354 3.50039 11.9021C4.95655 11.9021 6.40805 11.9021 7.86655 11.9021C7.86655 12.471 7.86655 13.0332 7.86655 13.6044C6.41272 13.6044 4.95889 13.6044 3.50039 13.6044C3.50039 14.7401 3.50039 15.8666 3.50039 17C2.91466 17 2.33593 17 1.74786 17C1.74786 15.8712 1.74786 14.7423 1.74786 13.6089C1.16213 13.6089 0.585732 13.6089 0.00233359 13.6089C0.00233359 13.04 0.00233359 12.4778 0.00233359 11.9066C0.581065 11.9066 1.1598 11.9066 1.74086 11.9066C1.74086 11.3377 1.74086 10.7778 1.74086 10.2088C1.16213 10.2088 0.583399 10.2088 0 10.2088C0 9.6376 0 9.07545 0 8.50649C0.578731 8.50649 1.15746 8.50649 1.7432 8.50649C1.7432 5.67079 1.7432 2.84189 1.7432 0.00845521C1.7782 0.00618846 1.80154 0.00392171 1.8272 0.00392171C4.1608 0.00392171 6.49439 -0.00741203 8.82799 0.00845521C10.1745 0.0175222 11.3459 0.495806 12.3307 1.3889C13.1568 2.13693 13.6889 3.0527 13.8989 4.13167C14.1906 5.63452 13.8499 7.00591 12.8931 8.22088C12.2374 9.05505 11.3809 9.6308 10.3542 9.95948C9.85244 10.1204 9.33671 10.2043 8.80932 10.2043C7.07546 10.2066 5.34393 10.2043 3.61007 10.2066C3.57507 10.2043 3.54006 10.2043 3.50039 10.2043ZM3.50273 1.70398C3.50273 3.97753 3.50273 6.23975 3.50273 8.50423C3.52839 8.50423 3.5494 8.50423 3.5704 8.50423C5.3206 8.50423 7.07079 8.50876 8.82099 8.49969C9.09168 8.49743 9.36938 8.45889 9.63074 8.39316C11.4813 7.91714 12.5804 6.14908 12.1604 4.34248C11.801 2.80109 10.3868 1.70398 8.75798 1.70398C7.04279 1.70398 5.3276 1.70398 3.6124 1.70398C3.5774 1.70398 3.5424 1.70398 3.50273 1.70398Z" fill="#928F94"/>
                    </svg>
                  </b>
                </span>
              </div>
            : <></>
          }
        </div>
        <div className='side-menu-divider'></div>
        <div className='side-menu-amount'>
          <h2 className='side-menu-details-title'>ИТОГ</h2>
          <span className='side-menu-amount-price'>
            {totalPrice}
            <svg width="26" height="32" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.50073 19.2081C6.50073 20.2833 6.50073 21.3372 6.50073 22.4039C9.20503 22.4039 11.9007 22.4039 14.6093 22.4039C14.6093 23.4749 14.6093 24.5331 14.6093 25.6083C11.9093 25.6083 9.20936 25.6083 6.50073 25.6083C6.50073 27.746 6.50073 29.8666 6.50073 32C5.41294 32 4.33815 32 3.24603 32C3.24603 29.8751 3.24603 27.7502 3.24603 25.6168C2.15824 25.6168 1.08779 25.6168 0.00433382 25.6168C0.00433382 24.5459 0.00433382 23.4877 0.00433382 22.4125C1.07912 22.4125 2.15391 22.4125 3.23303 22.4125C3.23303 21.3415 3.23303 20.2876 3.23303 19.2166C2.15824 19.2166 1.08345 19.2166 0 19.2166C0 18.1414 0 17.0832 0 16.0122C1.07479 16.0122 2.14957 16.0122 3.23736 16.0122C3.23736 10.6744 3.23736 5.34944 3.23736 0.0159157C3.30237 0.0116489 3.34571 0.00738204 3.39338 0.00738204C7.7272 0.00738204 12.061 -0.0139521 16.3948 0.0159157C18.8954 0.032983 21.071 0.933282 22.8999 2.61441C24.4341 4.02246 25.4222 5.74625 25.8122 7.77726C26.3539 10.6062 25.7212 13.1876 23.9443 15.4746C22.7265 17.0448 21.136 18.1286 19.2292 18.7473C18.2974 19.0502 17.3396 19.2081 16.3602 19.2081C13.1401 19.2123 9.92444 19.2081 6.70442 19.2123C6.63941 19.2081 6.5744 19.2081 6.50073 19.2081ZM6.50506 3.2075C6.50506 7.48712 6.50506 11.7454 6.50506 16.008C6.55273 16.008 6.59174 16.008 6.63074 16.008C9.88111 16.008 13.1315 16.0165 16.3818 15.9994C16.8846 15.9952 17.4003 15.9226 17.8857 15.7989C21.3224 14.9029 23.3636 11.5747 22.5835 8.17408C21.9161 5.27264 19.2898 3.2075 16.2648 3.2075C13.0795 3.2075 9.89411 3.2075 6.70875 3.2075C6.64374 3.2075 6.57874 3.2075 6.50506 3.2075Z" fill="#E5E5E5"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

export default SideInfo;