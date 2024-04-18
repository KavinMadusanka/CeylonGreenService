import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Service from './pages/Service';
import Pagenotfound from './pages/Pagenotfound';
import Profile from './pages/Profile';
import KAddcard from './pages/KAddcard';
import HomePage2 from './pages/HomePage2';
import KAddaddress from './pages/KAddaddress';
import Appointment1 from './pages/Appointment1';
import Register from './pages/Register';
import UserLogin from './pages/UserLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserManagement from './pages/UserManagement';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/homepage2' element={<HomePage2 />} />
        <Route path='/service' element={<Service />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/kaddcard' element={<KAddcard />} />
        <Route path='/kAddaddress' element={<KAddaddress />} />
        <Route path='/appointment1' element={<Appointment1 />} />
        <Route path='/userRegister' element={<Register />} />
        <Route path='/userLogin' element={<UserLogin />} />
        <Route path='/userManagement' element={<UserManagement />} />

        <Route path='*' element={<Pagenotfound />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </>
  );
}

export default App;
