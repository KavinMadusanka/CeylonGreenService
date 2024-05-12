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
import Appointment4 from './pages/Appointment4';
import AppointmentDashboard from './pages/AppointmentDashboard';
import AServicePackages from './pages/AServicePackages'
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
import KApaymentdashboard from "./pages/Admin/KApaymentdashboard";
import AppointmentDashboard2 from "./pages/AppointmentDashboard2";

import EPDashboard from './pages/EmployeeDashboard';
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";

import ViewPrograms from './pages/ViewPrograms';
import AddProgram from './pages/AddProgram';
import Dashboard from './pages/Dashboard';
import Enrollments from './pages/Enrollments';
import BookAppointment from './pages/BookAppointment';


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

        {/* Navishka */}
        <Route path='/appointment1' element={<Appointment1 />} />
        <Route path='/servicepackages' element={<AServicePackages />} />
        <Route path='/appointment4' element={<Appointment4 />} />
        <Route path='/AppointmentDashboard' element={<AppointmentDashboard />} />
        <Route path='/AppointmentDashboard2' element={<AppointmentDashboard2 />} />
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
        <Route path="/KApaymentdashboard" element={<KApaymentdashboard />} />


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

        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/ContactUs" element={<ContactUs />} />
{/* Lakshan */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addPrograms" element={<AddProgram />} />
        <Route path="/viewPrograms" element={<ViewPrograms />} />
        <Route path="/enrollments" element={<Enrollments />} />
        


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
