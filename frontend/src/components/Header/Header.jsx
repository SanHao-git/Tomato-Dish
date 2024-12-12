import React from 'react';
import './Header.css'

const Header = () => {
  return (
    <div className='header' id='header'>
      <div className="header-content">
        <h2>Order your favorite food here</h2>
        <p>With attractive and diverse dishes, our store will surely satisfy customers. For us, the customer experience is the top priority.</p>
        <button><a href="#explore-menu">Display menu</a></button>
      </div>
    </div>
  );
}

export default Header;
