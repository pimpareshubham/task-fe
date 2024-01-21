import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from '../../src/config'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HashLoader from "react-spinners/HashLoader";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const requestData = { email, password };

    try {
      const result = await axios.post(`${API_BASE_URL}/login`, requestData);
      if (result.status === 200) {
        setLoading(false);
        toast("Login Success");
        localStorage.setItem("token", result.data.result.token);
        localStorage.setItem('user', JSON.stringify(result.data.result.user));
        dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });
        navigate('/dashboard');

      }

   
  
    } catch (error) {
      setLoading(false)
      console.error(error);
      toast("An error occurred during login.");
    }
  };

  return (
    <>
      {loading ? (
        <div className="loader-overlay">
          <div className="loader">
            <HashLoader color="#36d7b7" />
          </div>
        </div>
      ) : null}

      <div className="container main ">

        <div className="row lgc">
          {/* <div className='col'></div> */}
          <div className="col-6">
            <div className="card d-block">
              <div className="card-body">
                <h2 className="card-title text-center login-heading">Login</h2>
                <hr className="hr" />
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="form-control lgup"
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="form-control lgup"
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="signuplink">
                    <Link className='form-label' to="/signup">Don't have an account? Click here to Signup</Link>
                  </div>

                  {user ? (
                    ""
                  ) : (
                    <button className="btn btn-primary mt-2" type="submit">
                      Login
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
          {/* <div className='col'></div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
