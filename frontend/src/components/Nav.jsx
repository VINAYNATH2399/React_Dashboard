import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Nav() {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate()
  function logout() {
    localStorage.clear()
    navigate('/signup')
  }
  return (
    <div>
      <img className='logo' src="https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?size=626&ext=jpg&ga=GA1.1.362248.1707411035&semt=ais" alt="logo" />
      {auth ?
        <ul className="nav-ul">
          <li><Link to="/">Products</Link></li>
          <li><Link to="/add">Add Products</Link></li>
          <li><Link to="/update"> Update Products</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li> <Link onClick={logout} to="/signup">Logout({JSON.parse(auth).name}) </Link></li>
        </ul>
        :
        <ul className="nav-ul nav-right">
          <li> <Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      }
    </div>
  )
}

export default Nav;