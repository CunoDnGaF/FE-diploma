import { HashLink } from "react-router-hash-link";
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <div className="header-navigation">
      <NavLink to='/'>
        <div className="navigation-logo">Лого</div>
      </NavLink>
      <div className="header-menu">
        <span className="header-menu-item"><HashLink smooth to ='./#about'>О нас</HashLink></span>
        <span className="header-menu-item"><HashLink smooth to ='./#howItWorks'>Как это работает</HashLink></span>
        <span className="header-menu-item"><HashLink smooth to ='./#reviews'>Отзывы</HashLink></span>
        <span className="header-menu-item"><HashLink smooth to ='./#contacts'>Контакты</HashLink></span>
      </div>
    </div>
  )
}

export default Navigation;