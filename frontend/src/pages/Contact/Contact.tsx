import { FaHome } from "react-icons/fa";
import HeadingH2 from "../../components/Heading/HeadingH2";
import SimpleLink from "../../components/Link/SimpleLink";

export default function Contact() {
  return (
    <>
      <form className="form-group">
        <SimpleLink to='/' className={'mb'}><FaHome /> Retour</SimpleLink>

        <HeadingH2>Contactez-nous</HeadingH2>
        <div className="form-control">
          <input type="text" placeholder="Prénom" />
        </div>
        <div className="form-control">
          <input type="text" placeholder="Nom" />
        </div>
        <div className="form-control">
          <input type="email" placeholder="Email" />
        </div>
        <div className="form-control">
          <textarea rows={3} placeholder="Message"></textarea>
        </div>
        <button type="submit" className="btn btn-block mb">Envoyer</button>
      </form>      
    </>
  )
}
