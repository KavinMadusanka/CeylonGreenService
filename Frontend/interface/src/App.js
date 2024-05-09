import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
// import Service from "./pages/Service";
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
import Appointment2 from './pages/Appointment2';
import Appointment3i from './pages/Appointment3i';
import Appointment3ii from './pages/Appointment3ii';
import Appointment4 from './pages/Appointment4';
import AppointmentDashboard from './pages/AppointmentDashboard';
import KAddressUpdate from "./components/Form/KAddressUpdate";
import KAcardUpdate from "./components/Form/KAcardUpdate";

import PrAdminDashboard from './pages/Admin/PrAdminDashboard';
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProducts from "./pages/Admin/CreateProducts";
import CreateSupplier from "./pages/Admin/CreateSupplier";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Suppliers from "./pages/Admin/Supplier";
import UpdateSupplier from './pages/Admin/UpdateSupplier';
import MyAppointments from "./pages/myAppointments";
import UpdateAppointment from "./pages/UpdateAppointment";
import KApaymentForm from "./pages/KApaymentForm";
import { KApaymentOptions } from "./pages/KApaymentOptions";
import ProductDisplayPage from "./pages/productDisplay";
import ShoppingCart from "./pages/ShoppingCart";
import KAcardpayment from "./pages/KAcardpayment";

import EPDashboard from './pages/EmployeeDashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/" element={<HomePage2 />} />
        <Route path="/homepage2" element={<HomePage2 />} />
        {/* <Route path="/service" element={<Service />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/kaddcard" element={<KAddcard />} />
        <Route path="/kAddaddress" element={<KAddaddress />} />
        <Route path='/appointment1' element={<Appointment1 />} />
        <Route path='/appointment2' element={<Appointment2 />} />
        <Route path='/appointment3i' element={<Appointment3i />} />
        <Route path='/appointment3ii' element={<Appointment3ii />} />
        <Route path='/appointment4' element={<Appointment4 />} />
        <Route path='/AppointmentDashboard' element={<AppointmentDashboard />} />
        <Route path='/updateAppointment/:id' element={<UpdateAppointment />} />
        <Route path="/myAppointments" element={<MyAppointments />} />
        <Route path="/userRegister" element={<Register />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userManagement" element={<UserManagement />} />
        <Route path="/payment" element={<Paymentpage />} />
        <Route path="/KAddressUpdate/:id" element={<KAddressUpdate />} />
        <Route path="/KAcardUpdate/:id" element={<KAcardUpdate />} />
        <Route path="/KApaymentForm" element={<KApaymentForm />} />
        <Route path="/KApaymentOption" element={<KApaymentOptions />} />
        <Route path="/KAcardpayment" element={<KAcardpayment />} />


        {/* Nethmi  */}
        <Route path="/productDisplay" element={<ProductDisplayPage />} />
        <Route path="/ShoppingCart" element={<ShoppingCart />} />

{/* piyusha */}
<Route path="/PrAdminDashboard" element={<PrAdminDashboard/>}/>
        <Route path="/dashboard/admin/create-category" element={<CreateCategory/>}/>
        <Route path="/dashboard/admin/create-product" element={<CreateProducts/>}/>
        <Route path="/dashboard/admin/product/:slug" element={<UpdateProduct/>}/>
        <Route path="/dashboard/admin/product" element={<Products/>}/>
        <Route path="/dashboard/admin/create-supplier" element={<CreateSupplier/>}/>
        <Route path="/dashboard/admin/suppliers" element={<Suppliers/>}/>
        <Route path="/dashboard/admin/update-supplier/:id" element={<UpdateSupplier/>}/> {/* Add :id parameter */}


        <Route path="*" element={<Pagenotfound />} />
        <Route
          path="/AddCategory"
          element={<AddCategory />}
        />
        <Route path="/SMDashboard/Employee" element={<Employee />} />
        <Route path="/Employeeprofile" element={<EmployeeProfile />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/SMDashboard/AddEmployee" element={<AddEmployee />} />
        <Route path="/EdditEmployee" element={<EditEmployee />}
        />
        <Route
          path="/EmployeeProfile"
          element={<EmployeeProfile />}
        />
        <Route path="/SMDashboard" element={<SMDashboard />} />
        <Route path="/EmployeeSalary" element={<EmployeeSalary/>} />
        <Route path="/EPDashboard" element={<EPDashboard/>} />
      </Routes>
      <ToastContainer
        position="top-right"
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
