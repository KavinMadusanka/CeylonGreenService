import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Service from './pages/Service';
import Pagenotfound from './pages/Pagenotfound';
import Profile from './pages/Profile';
import KAddcard from './pages/KAddcard';
import HomePage2 from './pages/HomePage2';
import KAddaddress from './pages/KAddaddress';
import Appointment1 from './pages/Appointment1';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/homepage2' element={<HomePage2/>} />
      <Route path='/service' element={<Service/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/kaddcard' element={<KAddcard/>} />
      <Route path='/kAddaddress' element={<KAddaddress/>} />
      <Route path='/appointment1' element={<Appointment1/>}/>

      <Route path='*' element={<Pagenotfound/>} />
      

    </Routes>
    
    </>
  );
}

export default App;
