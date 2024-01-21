import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { API_BASE_URL } from '../config';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [gender, setGender] = useState('male');
  const [sources, setSources] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = { name, email, password, phone, city, state, gender, sources };

    try {
      const result = await axios.post(`${API_BASE_URL}/signup`, requestData);
      if (result.status === 201) {
        setLoading(false);
        toast("Signup Success");
        navigate('/login');
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast("An error occurred during signup.");
    }
  };

  const stateOptions = [
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Karnataka', label: 'Karnataka' },
  ];

  const sourceOptions = [
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'Friends', label: 'Friends' },
    { value: 'JobPortals', label: 'JobPortals' },
    { value: 'Others', label: 'Others' },
  ];

  return (
    <>
      {loading ? (
        <div className="loader-overlay">
          <div className="loader">
            <HashLoader color="#36d7b7" />
          </div>
        </div>
      ) : null}

      <div className="container main mt-5 mb-5">
        <div className="row lgc">
          {/* <div className='col'></div> */}
          <div className="col-9">
            <div className="card d-block">
              <div className="card-body">
                <h2 className="card-title text-center login-heading">Signup</h2>
                <hr className="hr" />
                <form onSubmit={handleSignup}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="form-control lgup"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
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
                  <div className="mb-3">
                    <label className="form-label" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className="form-control lgup"
                      type="text"
                      name="phone"
                      placeholder="Enter your phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="city">
                      City
                    </label>
                    <select
                      className="form-select lgup"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">Select City</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Pune">Pune</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="state">
                      State
                    </label>
                    <Select className='form-label-2'
                      options={stateOptions}
                      value={stateOptions.find(option => option.value === state)}
                      onChange={(selectedOption) => setState(selectedOption.value)}
                    />
                  </div>

                  <fieldset className="row mb-3">
                    <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
                    <div className="col-sm-10">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="gridRadios1"
                          value="male"
                          checked={gender === 'male'}
                          onChange={() => setGender('male')}
                        />
                        <label className="form-check-label" htmlFor="gridRadios1">
                          Male
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="gridRadios2"
                          value="female"
                          checked={gender === 'female'}
                          onChange={() => setGender('female')}
                        />
                        <label className="form-check-label" htmlFor="gridRadios2">
                          Female
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  <div className="row mb-3">
                    <legend className="col-form-label col-sm-4 pt-0">How did you hear about this?</legend>
                    <div className="col-sm-10 offset-sm-2">
                      {sourceOptions.map((option) => (
                        <div key={option.value} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`gridCheck${option.value}`}
                            checked={sources.includes(option.value)}
                            onChange={() =>
                              setSources((prevSources) =>
                                prevSources.includes(option.value)
                                  ? prevSources.filter((source) => source !== option.value)
                                  : [...prevSources, option.value]
                              )
                            }
                          />
                          <label className="form-check-label" htmlFor={`gridCheck${option.value}`}>
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="signuplink">
                    <Link className='form-label' to="/login">Already have an account? Click here to Login</Link>
                  </div>

                  <button className="btn btn-primary mt-2" type="submit">
                    Save
                  </button>
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

export default Signup;
