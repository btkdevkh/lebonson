import '../../assets/css/Navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import BurgerMenu from '../Burger/BurgerMenu'
import { FaCircleNotch, FaGuitar, FaShoppingBasket } from 'react-icons/fa'
import useUser from '../../hooks/useUser'
import userActions from '../../actions/userActions'
import { toast } from 'react-toastify';

type Props = {
  isOpen: boolean
  handleNavbarBurger: () => void
}

export default function Navbar({ isOpen, handleNavbarBurger }: Props) {
  const { user, dispatch } = useUser()
  const navigate = useNavigate()

  return (
    <>
      <nav className='navbar'>
        <div className="container">
          <Link to={'/'} className="logo"><FaGuitar size={19} /> lebonson</Link>
          <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}
          >

            {user && user.role === 'Admin' && (
              <li>
                <NavLink to={'/admin'} title="Administration">
                  <i className="fas fa-user-shield"></i>
                </NavLink>
              </li>
            )}

            { user && (
              <div 
                style={{ 
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onClick={() => {
                  dispatch(userActions.logOutUser())
                  toast.success('Vous êtes bien déconnecté(e)')
                  navigate('/')
                }}
              >
                <div className='offbar'></div>
                <FaCircleNotch color='#ddd' size={20} title='Déconnexion' />
              </div>
            )}
            
            <NavLink 
              to={'/basket'}
            >
              <FaShoppingBasket color='#ddd' size={25} />
            </NavLink>
            <BurgerMenu 
              isOpen={isOpen} 
              handleNavbarBurger={() => {
                handleNavbarBurger()
                document.body.style.overflow = 'hidden'
              }} 
            />
          </div>
        </div>
      </nav>
    </>
  )
}
