import '../../assets/css/NavbarLeft.css'
import { NavLink } from "react-router-dom";
import { FaHome, FaListAlt, FaPhoneAlt, FaShippingFast, FaShoppingBasket, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import useUser from '../../hooks/useUser';

type Props = {
  isOpen: boolean;
  handleCloseNavbarLeft: () => void
}

export default function NavbarLeft({ isOpen, handleCloseNavbarLeft }: Props) {  
  const { user } = useUser()

  return (
    <div 
      className={`modal-navbar-left ${isOpen && 'open'}`}
      onClick={(e) => {
        const target = e.target as Element;
        target.classList.contains('modal-navbar-left') && 
        handleCloseNavbarLeft()

        target.classList.contains('modal-navbar-left') ?
        document.body.style.overflow = '' :
        document.body.style.overflow = 'hidden'
      }}
    >
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
                <NavLink to={'/account'}>Compte</NavLink>
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
    </div>
  )
}
