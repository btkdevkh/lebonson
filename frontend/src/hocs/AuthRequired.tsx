import { ComponentType, Fragment, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useUser from "../hooks/useUser"

const AuthRequired = (WrappedComponent: ComponentType) => {
  const AuthRequireData = (props: any) => {
    const navigate = useNavigate()
    const { user } = useUser()

    useEffect(() => {
      if(!user) {
        navigate('/login')
      }
    }, [user, navigate])

    return (
      <Fragment>
        <WrappedComponent {...props} />
      </Fragment>
    )
  }
  
  return AuthRequireData
}

export default AuthRequired
