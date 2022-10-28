import '../../assets/css/Profile.css'
import useUser from '../../hooks/useUser'
import moment from 'moment'
import { useLocation } from 'react-router-dom'
import HeadingH2 from '../../components/Heading/HeadingH2'
import UpdateProfil from './UpdateProfil'
import AuthRequired from '../../hocs/AuthRequired'
import userActions from '../../actions/userActions'

function Profile() {
  const location = useLocation()
  const { user, dispatch } = useUser()

  const handleDelete = () => {
    if(window.confirm('You are about to delete your account ?')) {
      dispatch(userActions.deleteUser(user.id))
      dispatch(userActions.logOutUser())
    }
  }

  return (
    <>
      <section className='user-infos-container'>
        <div className='user-infos'>
          {location.pathname === '/payment' && (
            <>
              <h4>Livrer chez</h4>
              <br />
            </>
          )}
          
          { user && (
            <div className='profile'>
              <div>
                <HeadingH2>Mes Informations</HeadingH2>
                <h4>{user.firstname}</h4>
                <h4>{user.lastname}</h4>
                <h4>{user.email}</h4>
                <h4>{user.address}</h4>
                <h4>{user.zip}</h4>
                <h4>{user.city}</h4>
                <h4>Membre depuis le {moment(user.creationTimestamp).format('L')}</h4>
              </div>
            </div>
          )}

          {location.pathname === '/payment' && (
            <>
              <br />
              <h4>
                Livrer sous 72h par {' '}
                <a 
                  style={{ 
                    color: 'goldenrod', 
                    textDecoration: 'underline' 
                  }}
                  href="https://www.laposte.fr/colissimo" 
                  target={'_blank'}
                >
                  Colissimo
                </a>
              </h4>
              <br />
            </>
          )}
        </div>

        {location.pathname === '/account' && (
          <>
            <br />
            <hr />
            <UpdateProfil user={user} />

            <button 
              className='btn btn-danger'
              onClick={handleDelete}
            >
              Delete My Account
            </button>
          </>
        )}
      </section>
    </>
  )
}

export default AuthRequired(Profile)
