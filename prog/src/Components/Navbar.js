import React, { useState } from 'react';
import './Navbar.css';
import {Outlet,Link} from 'react-router-dom';


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
        <li><Link class="link" to="/">Pomodoro</Link></li>
        <li><Link class="link" to="/method2">52-17</Link></li>
        <li><Link class="link" to="/rhythm">Rhythm</Link></li>
        <li><Link class="link" to="/wish">Customize</Link></li>
      </ul>
    </nav>
    <Outlet/>
    </div>
  );
}

export default Navbar;