import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/style.css'

const Navigation = () => (
  <nav className='navbar  bg-light'>
    <ul>
      <li><Link to="/">Student List</Link></li>
      <li><Link to="/register">Register Student</Link></li>
    </ul>
  </nav>
);

export default Navigation;
