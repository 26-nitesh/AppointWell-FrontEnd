import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/NavBar';
import Soon from './Components/Soon';
import OrgDashboard from './Components/OrgDashBoard';

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
            <Route path='/employee/dashboard' element={<Soon />} />
            <Route path='/agency/dashboard' element={<Soon />} />
            <Route path='/hospital/dashboard' element={<Soon />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </>
          </>
        )
      }
}


export default App;
