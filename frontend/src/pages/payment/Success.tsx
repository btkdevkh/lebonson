import { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import basketActions from "../../actions/basketActions";
import { validateOrderAfterSuccess } from "../../api/orderServiceApi";
import HeadingH2 from "../../components/Heading/HeadingH2";
import SimpleLink from "../../components/Link/SimpleLink";
import useBasket from "../../hooks/useBasket";

export default function Success() {
  const navigate = useNavigate()
  const search = window.location.search;
  const o_id = new URLSearchParams(search).get('o_id');

  const { dispatch } = useBasket()

  useEffect(() => {
    if(o_id) {
      let data = { order_id: o_id, status: "Paid" }
      validateOrderAfterSuccess(data).then(res => { console.log(res) }).catch(err => { console.log(err) })
      dispatch(basketActions.removeFromBasketAfterPaid())
    } else {
      navigate('/')
    }
  }, [o_id, navigate, dispatch])
  
  return (
    <div style={{
      textAlign: 'center'
    }}>
      <HeadingH2>Paiement avec success</HeadingH2>
      <SimpleLink to="/"><FaHome /> Retour</SimpleLink>
    </div>
  )
}
