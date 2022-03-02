import '../../assets/css/NavbarLeft.css'
import { NavLink } from "react-router-dom";
import { FaHome, FaListAlt, FaPhoneAlt, FaShippingFast, FaShoppingBasket, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import useUser from '../../hooks/useUser';

type Props = {
  isOpen: boolean
}

export default function NavbarLeft({ isOpen }: Props) {  
  const { user } = useUser()

  return (
    <nav className={`navbar-left ${isOpen && 'open'}`}>
      <ul>
        <div className='fa-flex'>
          <div><FaHome color='#ddd' /></div>
          { user ? (
            <>
              <div><FaUserAlt color='#ddd' /></div>
              <div><FaShippingFast color='#ddd' /></div>
            </>
          ) : (
            <div><FaSignInAlt color='#ddd' /></div>
          )}
          <div><FaListAlt color='#ddd' /></div>
          <div><FaShoppingBasket color='#ddd' /></div>
          <div><FaPhoneAlt color='#ddd' /></div>
        </div>
        <div className='li-flex'>
          <li>
            <NavLink to={'/'}>Accueil</NavLink>
          </li>
          { user ? (
            <>
            <li>
              <NavLink to={'/compte'}>Compte</NavLink>
            </li>
            <li>
              <NavLink to={'/orders'}>Commandes</NavLink>
            </li>
            </>
          ) : (
            <li>
              <NavLink to={'/login'}>S'identifier</NavLink>
            </li>
          ) }
          <li>
            <NavLink to={'/products'}>Produits</NavLink>
          </li>
          <li>
            <NavLink to={'/basket'}>Panier</NavLink>
          </li>
          <li>
            <NavLink to={'/contact'}>Contact</NavLink>
          </li>
        </div>
      </ul>
    </nav>
  )
}
