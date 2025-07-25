import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>SecureLife Insurance</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#auto">Auto</a></li>
            <li><a href="#home-insurance">Home</a></li>
            <li><a href="#life">Life</a></li>
            <li><a href="#business">Business</a></li>
            <li><a href="#claims">Claims</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="btn-secondary">Login</button>
          <button className="btn-primary">Get Quote</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
