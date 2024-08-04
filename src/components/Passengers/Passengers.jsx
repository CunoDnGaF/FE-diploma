import React from 'react';
import Steps from '../Steps/Steps'
import { useLocation } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import PassengersPage from '../Passengers/PassengersPage/PassengersPage'

function Passengers() {
  const location = useLocation();

  return (
    <React.Fragment>
      <Steps step={location.pathname} />
      <div className='main'>
        <SideBar step={location.pathname} />
        <PassengersPage />
      </div>
    </React.Fragment>
  )
}

export default Passengers;