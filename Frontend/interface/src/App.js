import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Service from './pages/Service';
import Pagenotfound from './pages/Pagenotfound';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/Service' element={<Service/>} />
      <Route path='/About' element={<About/>} />
      <Route path='*' element={<Pagenotfound/>} />
      

    </Routes>
    
    </>
  );
}

export default App;
