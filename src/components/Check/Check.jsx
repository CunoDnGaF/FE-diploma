import React from 'react';
import Steps from '../Steps/Steps'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
import SideBar from '../SideBar/SideBar';
import CheckPage from './CheckPage/CheckPage';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';

function Check() {
  const location = useLocation();

  const {loadingState, errorState} = useSelector(state => state.appState);

  return (
    <React.Fragment>
      <Steps step={location.pathname} />
      <div className={loadingState ? 'main unactive' : 'main'}>
        <SideBar step={location.pathname} />
        <CheckPage />
      </div>
      {loadingState ? <Loader /> : <></>}
      {errorState ? <Error error={errorState}/> : <></>}
    </React.Fragment>
  )
}

export default Check;