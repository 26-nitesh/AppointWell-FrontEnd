import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/NavBar';
import Soon from './Components/Soon';

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
       <Navbar></Navbar>
       <Home></Home>
       {/* <Login></Login> */}
       <Footer></Footer>
          </>
        )
      }
}


export default App;
