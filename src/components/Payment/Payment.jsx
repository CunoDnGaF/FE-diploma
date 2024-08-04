import React from 'react';
import Steps from '../Steps/Steps'
import { useLocation } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import PaymentPage from './PaymentPage/PaymentPage';

function Payment() {
  const location = useLocation();

  return (
    <React.Fragment>
      <Steps step={location.pathname} />
      <div className='main'>
        <SideBar step={location.pathname} />
        <PaymentPage />
      </div>
    </React.Fragment>
  )
}

export default Payment;