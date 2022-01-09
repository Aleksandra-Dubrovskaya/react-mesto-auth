import React from 'react';
import mestoLogo from '../images/mesto_logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img src={mestoLogo} alt="логотип Место" className="header__logo" />
      <nav className="header__navigation">
        <p className="header__mail">{props.isLoggedIn ? props.headerEmail : ''}</p>
        <p className="header__link">{props.headerLinkTextChange()}</p>
      </nav>
    </header>
  )
}

export default Header;
