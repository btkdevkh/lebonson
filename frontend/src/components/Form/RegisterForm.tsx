import HeadingH2 from "../Heading/HeadingH2";
import SimpleLink from "../Link/SimpleLink";
import { FaUser } from 'react-icons/fa'

export default function LoginForm() {
  return (
    <>
      <form className="form-group">
        <HeadingH2>Devenir membre</HeadingH2>
        <div className="form-control">
          <input type="text" placeholder="Prénom" />
        </div>
        <div className="form-control">
          <input type="text" placeholder="Nom" />
        </div>
        <div className="form-control">
          <input type="text" placeholder="Email" />
        </div>
        <div className="form-control">
          <input type="password" placeholder="Mot de passe" />
        </div>
        <div className="form-control">
          <input type="password" placeholder="Confirmez le mot de passe" />
        </div>
        <div className="form-control">
          <textarea placeholder="Adresse" rows={3}></textarea>
        </div>
        <div className="form-control">
          <input type="number" placeholder="Code postal" />
        </div>
        <div className="form-control">
          <input type="text" placeholder="Ville" />
        </div>
        <button type="submit" className="btn btn-block mb">Valider</button>
        <div className="links-flex">
          <SimpleLink to="/login"><FaUser /> Déja membre ?</SimpleLink>
        </div>
      </form>
    </>
  )
}
