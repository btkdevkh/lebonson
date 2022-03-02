import axios from "axios";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import HeadingH2 from "../../components/Heading/HeadingH2";
import SimpleLink from "../../components/Link/SimpleLink";
import { config } from "../../config";

export default function Contact() {
  const [msg, setMsg] = useState('')
  const [className, setClassName] = useState('error')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })

  const { firstName, lastName, email, message } = formData

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userData = {
      firstName,
      lastName,
      email,
      message
    }

    axios.post(config.API_URL + '/api/v1/contact', userData)
      .then(res => {
        if(res.data.status === 200) {
          setMsg('Votre message a bien été envoyé !')
          setClassName('success')
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            message: '',
          })
  
          setTimeout(() => setMsg(''), 3000)
        }  
      })   
      .catch(err => {
        console.log(err);
        setMsg(err.response.data.message)
      }) 
  }

  return (
    <>
      <form className="form-group" onSubmit={onSubmit}>
        <SimpleLink to='/' className={'mb'}><FaHome /> Retour</SimpleLink>

        <HeadingH2>Contactez-nous</HeadingH2>
        <div className="form-control">
          <input 
            type="text" 
            placeholder="Prénom" 
            name="firstName"
            value={firstName}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <input 
            type="text" 
            placeholder="Nom" 
            name="lastName"
            value={lastName}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <input 
            type="email" 
            placeholder="Email" 
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-control">
          <textarea 
            rows={3} 
            placeholder="Message"
            name="message"
            value={message}
            onChange={onChange}
          ></textarea>
        </div>        
        <button type="submit" className="btn btn-block mb">Envoyer</button>

        <div className={`${className} mt`}>{msg}</div>
      </form>      
    </>
  )
}
