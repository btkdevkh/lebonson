import './assets/css/App.css';
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Basket from './pages/Basket/Basket';
import Contact from './pages/Contact/Contact';
import Products from './pages/Product/Products';
import Register from './pages/Register/Register';
import ProductDetails from './pages/Product/ProductDetails';
import NavbarLeft from './components/Navbar/NavbarLeft';
import { useState } from 'react';
import Profil from './pages/Profil/Profil';
import { ToastContainer } from 'react-toastify'
import ForgotPassword from './pages/Password/ForgotPassword';
import Payment from './pages/payment/Payment';
import Success from './pages/payment/Success';
import Orders from './pages/Order/Orders';
import ResetPassword from './pages/Password/ResetPassword';

function App() {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavbarBurger = () => setIsOpen(o => !o)
  const handleCloseNavbarLeft = () => setIsOpen(false)

  return (
    <>
    <BrowserRouter>
      <Navbar 
        isOpen={isOpen} 
        handleNavbarBurger={handleNavbarBurger} 
      />
      <NavbarLeft 
        isOpen={isOpen} 
      />
      <div className="App" 
        onClick={handleCloseNavbarLeft}
      >
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/compte' element={<Profil />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/products' element={<Products />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/product/details/:id' element={<ProductDetails />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/success' element={<Success />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/forgot/password/step_one' element={<ForgotPassword />} />
            <Route path='/forgot/password/step_two/:token' element={<ResetPassword />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
    <ToastContainer />
    </>
  );
}

export default App;
