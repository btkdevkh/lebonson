import Profil from '../../components/Profil/Profil'
import AuthRequired from '../../hocs/AuthRequired'

function ProfilScreen() {
  return (
    <>
      <Profil />
    </>
  )
}

export default AuthRequired(ProfilScreen)
