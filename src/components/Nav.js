import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Nav = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    toast('Logged out');
    dispatch({ type: 'LOGIN_ERROR' });
    
  };

  return (
    <>
      <nav className="navbar container-fluid nav-back-ground navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand nav-item-color">
            Mindful Gurukul
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to='/' className="nav-link nav-item-color " aria-current="page">
                  Home
                </Link>
              </li>
              {!user ? (
                <li className="nav-item">
                  <Link to="/login" className="nav-link nav-item-color">
                    Login
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to='/login'  onClick={handleLoggedOut} className="nav-link nav-item-color">
                      Logout
                    </Link>
                  </li>
                  {/* Additional links for authenticated users */}
                  {/* Add your authenticated user links here */}
                </>
              )}
              {!user && (
                <li className="nav-item">
                  <Link to="/signup" className="nav-link nav-item-color" href="#">
                    Signup
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
