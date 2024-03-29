import { useState } from "react";
import userActions from "../../actions/userActions";
import { toast } from 'react-toastify';
import { IUser } from '../../models/lebonson/User';
import useUser from "../../hooks/useUser";
import Spinner from "../../components/Spinner/Spinner";

type Props = {
  user: IUser
}

export default function UpdateProfil({ user }: Props) {    
  const { isLoading, dispatch } = useUser()
  
  const [formData, setFormData] = useState({
    firstname: user ? user.firstname : '',
    lastname: user ? user.lastname : '',
    email: user ? user.email : '',
    address: user ? user.address : '',
    zip: user ? user.zip : '',
    city: user ? user.city : ''
  })

  const { firstname, lastname, email, address, zip, city } = formData

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

    const userData = { firstname, lastname, email, address, zip, city }
    
    dispatch(userActions.updateUser(userData, user.id as number))
    
    toast.success("Informations mis à jour")
  }

  if(isLoading) return <Spinner />

  return (
    <>
      <form className="mt" onSubmit={onSubmit}>
        <div className="form-control">
          <input 
            type="text" 
            placeholder="Prénom" 
            name="firstname"
            value={firstname}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <input 
            type="text" 
            placeholder="Nom"
            name="lastname"
            value={lastname}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <input 
            type="text" 
            placeholder="Email" 
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <textarea 
            placeholder="Adresse" 
            rows={3}
            name="address"
            value={address}
            onChange={onChange}
          >
          </textarea>
        </div>
        <div className="form-control">
          <input 
            type="number" 
            placeholder="Code postal" 
            name="zip"
            value={zip}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <input 
            type="text" 
            placeholder="Ville" 
            name="city"
            value={city}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-block mb">Modifier</button>
      </form>
    </>
  )
}
