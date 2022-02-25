import { ComponentType, Fragment, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import useUsers from "../hooks/useUsers"

const AuthRequired = (WrappedComponent: ComponentType) => {
  const AuthRequireData = (props: any) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useUsers()

    useEffect(() => {
      if(user == null) {
        navigate('/')
      } else {
        navigate('/')
      }
    }, [user, dispatch, navigate])

    return (
      <Fragment>
        <WrappedComponent {...props} />
      </Fragment>
    )
  }
  
  return AuthRequireData
}

export default AuthRequired
