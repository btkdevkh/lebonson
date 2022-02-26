import { useEffect, useState } from "react";
import { FaKey, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import userActions from "../../actions/userActions";
import HeadingH2 from "../../components/Heading/HeadingH2";
import SimpleLink from "../../components/Link/SimpleLink";
import Spinner from "../../components/Spinner/Spinner";
import useUsers from "../../hooks/useUsers";

export default function Login() {
  const navigate = useNavigate()
  const { user } = useUsers()

  const dispatch = useDispatch()
  const { isLoading, isError, isSuccess, message } = useUsers()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((oldState) => {
      return {
        ...oldState,
        [e.target.name]: e.target.value
      }
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const authData = {
      email: formData.email,
      password: formData.password
    }

    dispatch(userActions.loginUser(authData))
  }

  useEffect(() => {
    if(user) navigate('/')
  }, [user, navigate])

  if(isLoading) return <Spinner />

  return (
    <>
      <form className="form-group" onSubmit={onSubmit}>
        <HeadingH2>S'identifier</HeadingH2>
        <div className="form-control">
          <input 
            type="text" 
            name="email"
            placeholder="Email" 
            value={formData.email}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <input 
            type="password" 
            name="password"
            placeholder="Mot de passe" 
            value={formData.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-block mb">Valider</button>

        <div className="error mb">{isError && message}</div>

        <SimpleLink to="/register"><FaUser /> Pas encore membre ?</SimpleLink>
        <SimpleLink to="/forgot/password/step_one"><FaKey /> Mot de passe oublié ?</SimpleLink>
      </form>
    </>
  )
}
