import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Steps from '../Steps/Steps'
import SideBar from '../SideBar/SideBar';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';

function Tickets() {
  const location = useLocation();

  const {loadingState, errorState} = useSelector(state => state.appState);

  return (
    <React.Fragment>
      <Steps step={location.pathname} />
      <div className={loadingState ? 'main unactive' : 'main'}>
        <SideBar step={location.pathname}/>
        <Outlet />
      </div>
      {loadingState ? <Loader /> : <></>}
      {errorState ? <Error error={errorState}/> : <></>}
    </React.Fragment>
  )
}

export default Tickets;