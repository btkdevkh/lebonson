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
            alignItems: 'center'
          }}>

            { user && (
              <div 
                style={{ 
                  marginRight: '20px',
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
              style={{ marginRight: '20px'}} 
              to={'/basket'}
            >
              <FaShoppingBasket color='#ddd' size={25} />
            </NavLink>
            <BurgerMenu 
              isOpen={isOpen} 
              handleNavbarBurger={handleNavbarBurger} 
            />
          </div>
        </div>
      </nav>
    </>
  )
}
