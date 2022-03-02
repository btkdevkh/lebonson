import axios from "axios";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HeadingH2 from "../../components/Heading/HeadingH2";
import SimpleLink from "../../components/Link/SimpleLink";
import { config } from "../../config";

export default function ResetPassword() {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [myClassName, setMyClassName] = useState('error')

  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userId = window.localStorage.getItem('user_id')
    axios.get(config.API_URL + '/api/v1/user/' + Number(userId))
      .then(res => {
        if(res.data.status === 200) {          
          axios.put(config.API_URL + '/api/v1/user/forgot/password/step_two/' + Number(userId), {password, confirmPassword})
            .then(res => {              
              if(res.data.status === 200) {
                setMyClassName('success')
                setMsg(res.data.message)
                
                setTimeout(() => {
                  setMsg('')
                  window.localStorage.removeItem('user_id')
                  window.localStorage.removeItem('password_token')
                  navigate('/login')
                }, 3000)
              }
            })
            .catch(err => {
              console.log(err.response.data);
              setMsg(err.response.data.message)
            })  
        }
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data.message);
      })
  }

  useEffect(() => {
    if(!window.localStorage.getItem('password_token') || !window.localStorage.getItem('user_id')) {
      navigate('/forgot/password/step_one')
      return
    }
  }, [])

  return (
    <>
      <form className="form-group" onSubmit={onSubmit}>
        <SimpleLink to="/" className="mb"><FaHome /> Retour</SimpleLink>
        <HeadingH2>Réinitialiser le mot de passe</HeadingH2>
        <div className="form-control">
          <input 
            type="password" 
            placeholder="Nouveau mout de passe" 
            value={password}
            onChange={(e) => setPassword(e.target.value) }
          />
        </div>
        <div className="form-control">
          <input 
            type="password" 
            placeholder="Confirmer le nouveau mot de passe" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value) }
          />
        </div>
        <button type="submit" className="btn btn-block mb">Valider</button>

        <div className={myClassName}>{msg}</div>
      </form>
    </>
  )
}
