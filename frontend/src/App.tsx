import './assets/css/App.css';
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify'

import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Basket from './pages/Basket/Basket';
import Contact from './pages/Contact/Contact';
import Register from './pages/Register/Register';
import NavbarLeft from './components/Navbar/NavbarLeft';
import Payment from './pages/Payment/Payment';
import Success from './pages/Payment/Success';
import Orders from './pages/Order/Orders';
import Profile from './pages/Profile/Profile';
import ProductRoutes from './routes/ProductRoutes';
import PasswordRoutes from './routes/PasswordRoutes';
import AdminRoutes from './routes/AdminRoutes';

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
          handleCloseNavbarLeft={handleCloseNavbarLeft}
        />
        <div className="App">
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              
              <Route path='/account' element={<Profile />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />

              <Route path='/products/*' element={<ProductRoutes />} />
              <Route path='/forgot/*' element={<PasswordRoutes />} />
              <Route path='/admin/*' element={<AdminRoutes />} />

              <Route path='/orders' element={<Orders />} />
              <Route path='/basket' element={<Basket />} />
              <Route path='/payment' element={<Payment />} />
              <Route path='/success' element={<Success />} />
              <Route path='/contact' element={<Contact />} />
              
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
