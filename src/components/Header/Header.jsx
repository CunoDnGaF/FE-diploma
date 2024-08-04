import { useLocation } from 'react-router-dom';
import Navigation from './Navigation/Navigation'
import TicketWidget from './TicketWidget/TicketWidget'

function Header() {
  const location = useLocation();
  let bannerSrc;
  let className;
  let header;
  
  if(location.pathname == '/') {
    bannerSrc = './src/img/banner-main.png';
    className = 'header h-main';
    header = <span className="banner-header">Вся жизнь -<b> путешествие!</b></span>
  } else if(location.pathname == '/success') {
    bannerSrc = './src/img/banner-success.png';
    className = 'header h-main';
  } else {
    bannerSrc = './src/img/banner.png';
    className = 'header';
  }

  return (
    <header className={className}>
      <img src={bannerSrc} className="banner_img" alt=""></img>
      <Navigation />
      {header}
      {location.pathname == '/success' ? <></> : <TicketWidget location={location.pathname} />}
    </header>
  )
}

export default Header;