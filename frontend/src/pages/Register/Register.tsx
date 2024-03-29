import { FaUser } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import userActions from "../../actions/userActions";
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import HeadingH2 from '../../components/Heading/HeadingH2';
import SimpleLink from '../../components/Link/SimpleLink';

export default function Register() {
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message, dispatch } = useUser()
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    zip: '',
    city: ''
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setFormData((oldState) => {
      return {
        ...oldState,
        [e.target.name]: e.target.value
      }
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      address: formData.address,
      zip: formData.zip,
      city: formData.city
    }
    
    dispatch(userActions.registerUser(userData))
  }

  useEffect(() => {
    if(user) navigate('/')
    if(isSuccess) {
      toast.success(message)
      navigate('/')
    }
  }, [user, isSuccess])

  if(isLoading) return <Spinner />

  return (
    <>
      <form className="form-group" onSubmit={onSubmit}>
        <HeadingH2>Devenir membre</HeadingH2>
        <div className="form-control">
          <input 
            type="text" 
            placeholder="Prénom" 
            name="firstname"
            value={formData.firstname}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <input 
            type="text" 
            placeholder="Nom"
            name="lastname"
            value={formData.lastname}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <input 
            type="text" 
            placeholder="Email" 
            name="email"
            value={formData.email}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <input 
            type="password" 
            placeholder="Mot de passe" 
            name="password"
            value={formData.password}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <input 
            type="password" 
            placeholder="Confirmez le mot de passe" 
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <textarea 
            placeholder="Adresse" 
            rows={3}
            name="address"
            value={formData.address}
            onChange={onChange}
          >
          </textarea>
        </div>
        <div className="form-control">
          <input 
            type="number" 
            placeholder="Code postal" 
            name="zip"
            value={formData.zip}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <input 
            type="text" 
            placeholder="Ville" 
            name="city"
            value={formData.city}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-block mb">Valider</button>

        <div className="error mb">{isError && message}</div>

        <div className="links-flex">
          <SimpleLink to="/login"><FaUser /> Déja membre ?</SimpleLink>
        </div>
      </form>
    </>
  )
}
