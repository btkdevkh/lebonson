import { ComponentType, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const AuthRequiredAdmin = (WrappedComponent: ComponentType) => {

  const RequireAdmin = (props: any) => {
    const navigate = useNavigate()
    const { user } = useUser()  

    useEffect(() => {
      if(user) {
        if(user.role !== "Admin") {
          navigate('/')
        }
      } else {
        navigate('/login')
      }
    }, [user, navigate])

    return (
      <Fragment>
        <WrappedComponent { ...props } />
      </Fragment>
    )
  }

  return RequireAdmin
}

export default AuthRequiredAdmin
