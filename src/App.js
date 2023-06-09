import { BrowserRouter, Link, Route, Router, Routes, useNavigate } from 'react-router-dom';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/NavBar';
import Soon from './Components/Soon';
import OrgDashboard from './Components/OrgDashBoard';
import EmpDashBoard from './Components/EmpDashBoard';
import HospitalDashboard from './Components/HospitalDashBoard';
import AgencyDashBoard from './Components/AgencyDashBoard';

import {  Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function App() {
if(2>3){
  return (
    <>
      <Soon></Soon>
      
    </>
      );
  }
      else{
        return(
          <>
       {/* <Navbar></Navbar>
       <Router>
        <Routes>
        <Navbar></Navbar>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/org' element={<Soon></Soon>}></Route>
        </Routes>
       </Router>
       {/* <Home></Home> */}
       {/* <Login></Login> */}
       {/*Footer></Footer> */}
       <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/company/dashboard' element={<OrgDashboard />} />
            <Route path='/employee/dashboard' element={<EmpDashBoard />} />
            <Route path='/agency/dashboard' element={<AgencyDashBoard />} />
            <Route path='/hospital/dashboard' element={<HospitalDashboard />} />
          </Routes>
          <Footer />
        </BrowserRouter>
          </>
          </>
        )
      }
    }


export default App;
