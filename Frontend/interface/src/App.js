import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Service from "./pages/Service";
import Pagenotfound from "./pages/Pagenotfound";
import Profile from "./pages/Profile";
import KAddcard from "./pages/KAddcard";
import HomePage2 from "./pages/HomePage2";
import KAddaddress from "./pages/KAddaddress";
import Appointment1 from "./pages/Appointment1";
import Register from "./pages/Register";
import UserLogin from "./pages/UserLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserManagement from "./pages/UserManagement";
import AddCategory from "./pages/AddCategory";
import Category from "./pages/Category";
import Employee from "./pages/Employee";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import SMDashboard from "./pages/SMDashboard";
import EmployeeProfile from "./pages/EmployeeProfile";
import EmployeeSalary from "./pages/EmployeeSalary";
import Paymentpage from './pages/Paymentpage';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage2" element={<HomePage2 />} />
        <Route path="/service" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/kaddcard" element={<KAddcard />} />
        <Route path="/kAddaddress" element={<KAddaddress />} />
        <Route path='/appointment1' element={<Appointment1 />} />
        <Route path='/appointment2' element={<Appointment2 />} />
        <Route path='/appointment3i' element={<Appointment3i />} />
        <Route path='/appointment3ii' element={<Appointment3ii />} />
        <Route path="/userRegister" element={<Register />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userManagement" element={<UserManagement />} />
        <Route
          path="/SMDashboard/Category/AddCategory"
          element={<AddCategory />}
        />
        <Route path="//SMDashboard/Employee" element={<Employee />} />
        <Route path="/SMDashboard/Category" element={<Category />} />
        <Route path="/SMDashboard/AddEmployee" element={<AddEmployee />} />
        <Route
          path="/SMDashboard/EdditEmployee/:id"
          element={<EditEmployee />}
        />
        <Route
          path="/SMDashboard/Profile/EmployeeProfile"
          element={<EmployeeProfile />}
        />
        <Route path="/SMDashboard" element={<SMDashboard />} />
        <Route path="/EmployeeSalary" element={<EmployeeSalary/>} />

        <Route path="*" element={<Pagenotfound />} />
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
        <Route path='/payment' element={<Paymentpage />} />

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
