import axios from "axios";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HeadingH2 from "../../components/Heading/HeadingH2";
import SimpleLink from "../../components/Link/SimpleLink";
import { config } from "../../config";

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [myClassName, setMyClassName] = useState('error')

  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios.post(config.API_URL + '/api/v1/user/forgot/password/step_one', {email})
      .then(res => {
        if(res.data.status === 200) {
          window.localStorage.setItem('password_token', res.data.token)
          window.localStorage.setItem('user_id', res.data.userId)

          setMyClassName('success')
          setMsg(res.data.message)
          setEmail('')
          
          setTimeout(() => {
            setMsg('')
            navigate('/')
          }, 3000)
        }
      })
      .catch(err => {
        console.log(err.response.data);
        setMsg(err.response.data.message)
      })    
  }

  return (
    <>
      <form className="form-group" onSubmit={onSubmit}>
        <SimpleLink to="/" className="mb"><FaHome /> Retour</SimpleLink>
        <HeadingH2>Mot de passe oublié</HeadingH2>
        <div className="form-control">
          <input 
            type="text" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value) }
          />
        </div>
        <button type="submit" className="btn btn-block mb">Valider</button>

        <div className={myClassName}>{msg}</div>
      </form>
    </>
  )
}
