import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sideData } from './sideData';
import './Navbar.css';


function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () =>{
    setSidebar(!sidebar);
  }

  return (
    <div>
    <div className='navbar' onClick={showSidebar}>
    <i id='i' class="fa-solid fa-bars"></i>
    </div>
    <nav className={sidebar ? 'nav-menu active':'nav-menu'}>
      <ul>
        <li>pomodoro</li>
        <li>52-17</li>
        <li>Rhythm</li>
        <li>Customize</li>
      </ul>
    </nav>
    </div>
  );
}

export default Navbar;