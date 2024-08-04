import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Error from './Error/Error';

function Body() {
  const {errorState} = useSelector(state => state.appState);

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      {errorState ? <Error error={errorState}/> : <></>}
      <Footer />
    </div>
  )
}

export default Body;