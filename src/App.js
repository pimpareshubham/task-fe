import React from 'react';
import './pages/Login.css'
import './App.css'
import './pages/Dashboard.css'
import './components/Nav.css'
import './pages/NotFound.css'
import './pages/Details.css'
import './pages/Home.css'

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Nav from './components/Nav';
import Details from './pages/Details';




import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'react-multi-carousel/lib/styles.css';






import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


function App() {

  function DynamicRouting() {
    const dispatch = useDispatch();
   

   
    

    useEffect(() => {

      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {//when user has a login active session
        dispatch({ type: "LOGIN_SUCCESS", payload: userData});
        
      }
    
    },);

    return (
      
      <Routes>
    
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/dashboard" element={<Dashboard />}></Route>
        <Route exact path="/details/:id" element={<Details />}></Route>
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    )
  }


  return (
    <div className='app-bg'>
      <Router>
      <ToastContainer autoClose={800}/>
        <Nav></Nav>
        <DynamicRouting />
        {/* <Footer></Footer> */}
      </Router>
    </div>
  );
}

export default App;

