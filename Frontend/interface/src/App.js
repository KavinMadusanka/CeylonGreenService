import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Service from './pages/Service';
import Pagenotfound from './pages/Pagenotfound';
import Profile from './pages/Profile';
import KAddcard from './pages/KAddcard';
import HomePage2 from './pages/HomePage2';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/homepage2' element={<HomePage2/>} />
      <Route path='/Service' element={<Service/>} />
      <Route path='/About' element={<About/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/kaddcard' element={<KAddcard/>} />

      <Route path='*' element={<Pagenotfound/>} />
      

    </Routes>
    
    </>
  );
}

export default App;
