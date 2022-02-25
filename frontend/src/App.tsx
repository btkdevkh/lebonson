import './assets/css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Basket from './pages/Basket/Basket';
import Contact from './pages/Contact/Contact';
import Product from './pages/Product/Product';
import Register from './pages/Register/Register';
import Password from './pages/Password/Password';
import ProductDetails from './components/Product/ProductDetails';
import NavbarLeft from './components/Navbar/NavbarLeft';
import { useState } from 'react';
import ProfilScreen from './pages/Profil/ProfilScreen';

function App() {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavbarBurger = () => setIsOpen(o => !o)
  const handleCloseNavbarLeft = () => setIsOpen(false)

  return (
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
            <Route path='/compte' element={<ProfilScreen />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/products' element={<Product />} />
            <Route path='/product/details/:id' element={<ProductDetails />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/reset/password_init_step' element={<Password />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
