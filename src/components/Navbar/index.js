import {useState} from 'react'
import {Link, useLocation, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const NavBar = () => {
  const location = useLocation()
  const history = useHistory()
  const [isHambergerOpen, setIsHambergerOpen] = useState(false)

  const selectedHomeLink = {
    fontWeight: location.pathname === '/' ? 'bold' : '',
  }

  const selectedBooksLink = {
    fontWeight: location.pathname === '/shelf' ? 'bold' : '',
  }

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <div className="nav-bg-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dlafvsqxz/image/upload/v1686312164/Group_7731_kozlt5.png"
            alt="website logo"
            className="logo"
          />
        </Link>
        <button
          type="button"
          className="button-hamberger"
          onClick={() => setIsHambergerOpen(true)}
        >
          <img
            src="https://res.cloudinary.com/dlafvsqxz/image/upload/v1686324754/icon_zxcljm.png"
            alt="hamberger"
            className="hamberger"
          />
        </button>

        <ul className="nav-bg-icons-container">
          <li className="li-nav-list-text">
            <Link to="/" className="nv-link-text" style={selectedHomeLink}>
              <p>Home</p>
            </Link>
          </li>
          <li className="li-nav-list-text">
            <Link
              to="/shelf"
              className="nv-link-text"
              style={selectedBooksLink}
            >
              <p>Bookshelves</p>
            </Link>
          </li>
          <button type="button" className="log-out-button" onClick={onLogout}>
            Logout
          </button>
        </ul>
      </div>
      {isHambergerOpen && (
        <ul className="nav-sm-icons-container">
          <li className="li-nav-list-text">
            <Link to="/" className="nv-link-text" style={selectedHomeLink}>
              <p>Home</p>
            </Link>
          </li>
          <li className="li-nav-list-text">
            <Link
              to="/shelf"
              className="nv-link-text"
              style={selectedBooksLink}
            >
              <p>Bookshelves</p>
            </Link>
          </li>
          <button type="button" className="log-out-button" onClick={onLogout}>
            Logout
          </button>
          <button
            type="button"
            className="cross-button"
            onClick={() => setIsHambergerOpen(false)}
          >
            <img
              src="https://res.cloudinary.com/dlafvsqxz/image/upload/v1686503507/Shape_wcvngh.png"
              alt="cross-logo"
              className="cross-icon"
            />
          </button>
        </ul>
      )}
    </>
  )
}

export default NavBar
