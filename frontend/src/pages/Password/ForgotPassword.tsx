import HeadingH2 from "../../components/Heading/HeadingH2";

export default function ForgotPassword() {
  return (
    <>
      <form className="form-group">
        <HeadingH2>Mot de passe oublié</HeadingH2>
        <div className="form-control">
          <input type="text" placeholder="Email" />
        </div>
        <button type="submit" className="btn btn-block mb">Valider</button>
      </form>
    </>
  )
}
