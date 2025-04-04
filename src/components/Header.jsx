import React from 'react';
import { Navbar } from './index';

const Header = ({ isAuthenticated, onAuthenticate }) => {
  return (
    <header className="relative z-20">
      <Navbar isAuthenticated={isAuthenticated} onAuthenticate={onAuthenticate} />
    </header>
  );
};

export default Header; 